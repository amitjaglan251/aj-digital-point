import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const port = 19000 + Math.floor(Math.random() * 1000);
const base = `http://127.0.0.1:${port}`;
let child;

async function waitForServer() {
  const deadline = Date.now() + 8000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${base}/health`);
      if (response.ok) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error("Backend did not become ready within 8 seconds");
}

test("backend safe-default smoke checks", async t => {
  child = spawn(process.execPath, ["server.js"], {
    cwd: new URL("..", import.meta.url),
    env: { ...process.env, PORT: String(port), NODE_ENV: "test", PAN_PROVIDER_ENABLED: "false", ALLOWED_ORIGIN: "https://amitjaglan251.github.io" },
    stdio: "ignore"
  });
  t.after(() => {
    if (child && !child.killed) child.kill("SIGTERM");
  });

  await waitForServer();

  const health = await fetch(`${base}/health`);
  assert.equal(health.status, 200);
  assert.equal((await health.json()).integration, "disabled");
  assert.equal(health.headers.get("cache-control"), "no-store");

  const provider = await fetch(`${base}/api/provider/status`);
  const providerJson = await provider.json();
  assert.equal(provider.status, 200);
  assert.equal(providerJson.configured, false);
  assert.equal(providerJson.provider, "not configured");

  const pan = await fetch(`${base}/api/pan/status`);
  assert.equal(pan.status, 503);
  assert.equal((await pan.json()).error, "PAN integration is not enabled.");

  const wrongOrigin = await fetch(`${base}/health`, { headers: { Origin: "https://example.com" } });
  assert.equal(wrongOrigin.status, 403);

  const missing = await fetch(`${base}/not-a-route`);
  assert.equal(missing.status, 404);
});
