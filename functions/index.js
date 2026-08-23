const {onCall,HttpsError}=require('firebase-functions/v2/https');
const {onDocumentCreated}=require('firebase-functions/v2/firestore');
const {defineSecret}=require('firebase-functions/params');
const admin=require('firebase-admin');
admin.initializeApp();

const ADMIN_EMAIL=defineSecret('ADMIN_EMAIL');
const db=admin.firestore();

function requireAuth(req){
  if(!req.auth) throw new HttpsError('unauthenticated','Sign in required.');
}
function requireAdmin(req){
  requireAuth(req);
  if(req.auth.token.admin!==true) throw new HttpsError('permission-denied','Admin access required.');
}

exports.bootstrapAdmin=onCall({secrets:[ADMIN_EMAIL]},async(req)=>{
  requireAuth(req);
  const allowed=(ADMIN_EMAIL.value()||'').trim().toLowerCase();
  const email=(req.auth.token.email||'').trim().toLowerCase();
  if(!allowed||email!==allowed) throw new HttpsError('permission-denied','This account is not the configured admin.');
  await admin.auth().setCustomUserClaims(req.auth.uid,{...(req.auth.token||{}),admin:true});
  return {ok:true,message:'Admin claim set. Please sign out and sign in again.'};
});

exports.updateRequestStatus=onCall(async(req)=>{
  requireAdmin(req);
  const requestId=String(req.data?.requestId||'').trim().toUpperCase();
  const status=String(req.data?.status||'').trim();
  const allowed=['Payment Pending','Processing','Completed','Rejected'];
  if(!/^AJPAN-\d{4}-[A-Z0-9]{6,20}$/.test(requestId)) throw new HttpsError('invalid-argument','Invalid request ID.');
  if(!allowed.includes(status)) throw new HttpsError('invalid-argument','Invalid status.');
  await db.collection('serviceRequests').doc(requestId).update({status,statusUpdatedAt:admin.firestore.FieldValue.serverTimestamp(),statusUpdatedBy:req.auth.uid});
  return {ok:true};
});

exports.adminListRequests=onCall(async(req)=>{
  requireAdmin(req);
  const limit=Math.min(Math.max(Number(req.data?.limit)||50,1),100);
  const snap=await db.collection('serviceRequests').orderBy('createdAt','desc').limit(limit).get();
  return snap.docs.map(d=>{const x=d.data();return {requestId:d.id,service:x.service||'',name:x.name||'',mobile:x.mobile||'',email:x.email||'',status:x.status||'Payment Pending',createdAt:x.createdAt?.toDate?.().toISOString?.()||null};});
});

// Audit marker for new requests. This function does not process PAN/Aadhaar data.
exports.onRequestCreated=onDocumentCreated('serviceRequests/{requestId}',async(event)=>{
  const data=event.data?.data()||{};
  await db.collection('serviceRequestAudit').doc(event.params.requestId).set({requestId:event.params.requestId,event:'created',status:data.status||'Payment Pending',createdAt:admin.firestore.FieldValue.serverTimestamp()},{merge:true});
});