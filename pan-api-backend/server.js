import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();
const port = Number(process.env.PORT || 8080);
const allowedOrigin = process.env.ALLOWED_ORIGIN;
const providerEnabled = process.env.PAN_PROVIDER_ENABLED === "true";
const providerName = process.env.PAN_PROVIDER_NAME || "unconfigured";

if (process.env.NODE_ENV === "production" && !allowedOrigin) {
  throw new Error("ALLOWED_ORIGIN must be configured in production.");
}

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    // No Origin is permitted for health checks/server-to-server calls.
    if (!origin || origin === allowedOrigin) return callback(null, true);
    return callback(new Error("Origin not allowed"));
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
}));
app.use(express.json({ limit: "16kb", strict: true }));
app.use(rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." }
}));

app.get("/health", (_req, res) => {
  res.set("Cache-Control", "no-store");
  res.status(200).json({ status: "ok", service: "aj-pan-backend", integration: "disabled" });
});

app.get("/api/provider/status", (_req, res) => {
  res.set("Cache-Control", "no-store");
  res.status(200).json({
    configured: providerEnabled,
    provider: providerEnabled ? providerName : "not configured",
    message: providerEnabled
      ? "Provider flag enabled; this does not prove credentials or approval are valid."
      : "Provider API is disabled pending written authorization, approved credentials, and security review."
  });
});

// Deliberately no PAN lookup, application submission, OTP, document upload,
// payment, or identity-verification endpoint until provider authorization,
// provider documentation, approved workflow, authentication, and security testing exist.
app.all("/api/pan/*", (_req, res) => {
  res.set("Cache-Control", "no-store");
  return res.status(503).json({
    error: "PAN integration is not enabled.",
    message: "Use the official provider portal until an authorized integration is approved."
  });
});

app.use((_req, res) => {
  res.set("Cache-Control", "no-store");
  res.status(404).json({ error: "Not found" });
});

app.use((err, _req, res, _next) => {
  // Avoid logging request bodies, tokens, PAN/Aadhaar numbers, or provider responses.
  if (err?.message === "Origin not allowed") {
    return res.status(403).json({ error: "Origin not allowed" });
  }
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  return res.status(500).json({ error: "Internal server error" });
});

app.listen(port, "0.0.0.0", () => {
  // No secrets or request/customer data in logs.
  console.log(`AJ PAN backend scaffold listening on port ${port}; provider integration disabled=${!providerEnabled}`);
});
