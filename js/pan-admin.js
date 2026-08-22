import { collection, getDocs, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js';
import { db, auth } from './firebase-config.js';

const byId = id => document.getElementById(id);
let requests = [];
let selected = null;

function normalize(value) {
  const v = String(value || 'Pending').toLowerCase();
  if (v === 'processing' || v === 'in progress') return 'Processing';
  if (v === 'approved' || v === 'completed' || v === 'complete') return 'Approved';
  if (v === 'rejected' || v === 'cancelled' || v === 'canceled') return 'Rejected';
  return 'Pending';
}

byId('adminLoginForm')?.addEventListener('submit', async event => {
  event.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, byId('adminEmail').value.trim(), byId('adminPassword').value);
    byId('loginError')?.classList.add('hidden');
  } catch (error) {
    byId('loginError').textContent = 'Email या Password गलत है।';
    byId('loginError').classList.remove('hidden');
  }
});

byId('logoutButton')?.addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, user => {
  byId('loginSection')?.classList.toggle('hidden', !!user);
  byId('adminDashboard')?.classList.toggle('hidden', !user);
  if (user) loadRequests();
});

async function loadRequests() {
  byId('loading')?.classList.remove('hidden');
  try {
    const snapshot = await getDocs(collection(db, 'serviceRequests'));
    requests = snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    render();
  } catch (error) {
    console.error(error);
    byId('emptyState')?.classList.remove('hidden');
  } finally {
    byId('loading')?.classList.add('hidden');
  }
}

function render() {
  const search = (byId('searchInput')?.value || '').trim().toLowerCase();
  const filter = byId('statusFilter')?.value || 'all';
  const list = requests.filter(item => {
    const text = `${item.requestId || ''} ${item.service || ''} ${item.applicantName || item.name || item.customerName || ''} ${item.mobile || ''}`.toLowerCase();
    return (!search || text.includes(search)) && (filter === 'all' || normalize(item.status) === filter);
  });

  let pending = 0, processing = 0, approved = 0, rejected = 0;
  requests.forEach(item => {
    const s = normalize(item.status);
    if (s === 'Pending') pending++;
    if (s === 'Processing') processing++;
    if (s === 'Approved') approved++;
    if (s === 'Rejected') rejected++;
  });
  byId('totalCount').textContent = requests.length;
  byId('pendingCount').textContent = pending;
  byId('processingCount').textContent = processing;
  byId('approvedCount').textContent = approved;
  byId('rejectedCount').textContent = rejected;
  byId('requestCount').textContent = `${list.length} requests`;

  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
  byId('requestList').innerHTML = list.map(item => `<div class="request-card"><div class="request-card-header"><strong>${escape(item.requestId || '-')}</strong><span class="status-badge">${escape(normalize(item.status))}</span></div><div class="request-card-body"><div class="request-info"><span>Service</span><strong>${escape(item.service || 'PAN')}</strong></div><div class="request-info"><span>Customer</span><strong>${escape(item.applicantName || item.name || item.customerName || '-')}</strong></div><div class="request-info"><span>Mobile</span><strong>${escape(item.mobile || '-')}</strong></div></div><div class="request-card-actions"><button class="view-btn" data-id="${escape(item.id)}">View / Change Status</button></div></div>`).join('');
  byId('emptyState')?.classList.toggle('hidden', list.length !== 0);
  document.querySelectorAll('.view-btn').forEach(button => button.addEventListener('click', () => openRequest(button.dataset.id)));
}

function openRequest(id) {
  selected = requests.find(item => item.id === id);
  if (!selected) return;
  byId('modalStatus').value = normalize(selected.status);
  byId('detailsContent').innerHTML = `<p><b>Request ID:</b> ${selected.requestId || '-'}</p><p><b>Service:</b> ${selected.service || 'PAN'}</p><p><b>Customer:</b> ${selected.applicantName || selected.name || selected.customerName || '-'}</p><p><b>Mobile:</b> ${selected.mobile || '-'}</p><p><b>Current Status:</b> ${normalize(selected.status)}</p>`;
  byId('detailsModal').classList.remove('hidden');
}

byId('updateStatusButton')?.addEventListener('click', async () => {
  if (!selected) return;
  try {
    const newStatus = byId('modalStatus').value;
    await updateDoc(doc(db, 'serviceRequests', selected.id), { status: newStatus, updatedAt: new Date() });
    selected.status = newStatus;
    render();
    byId('modalMessage').textContent = `Status updated: ${newStatus}`;
    byId('modalMessage').classList.remove('hidden');
  } catch (error) {
    console.error(error);
    byId('modalMessage').textContent = 'Status update नहीं हो पाया।';
    byId('modalMessage').classList.remove('hidden');
  }
});

byId('closeModalButton')?.addEventListener('click', () => byId('detailsModal').classList.add('hidden'));
byId('searchInput')?.addEventListener('input', render);
byId('statusFilter')?.addEventListener('change', render);
byId('refreshButton')?.addEventListener('click', loadRequests);
