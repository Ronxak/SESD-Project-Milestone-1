/* ================================================================
   Study Planner — Frontend Logic
   No authentication required. Talks directly to the backend API.
   ================================================================ */

// ─── DOM References ─────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const DOM = {
    subjectList:    $('#subject-list'),
    sidebarEmpty:   $('#sidebar-empty'),
    headerTitle:    $('#header-title'),
    headerSubtitle: $('#header-subtitle'),
    sessionArea:    $('#session-area'),
    btnStartSess:   $('#btn-start-session'),
    liveSession:    $('#live-session'),
    timer:          $('#timer'),
    btnEndSess:     $('#btn-end-session'),
    btnAddSubject:  $('#btn-add-subject'),
    btnAddTask:     $('#btn-add-task'),
    taskList:       $('#task-list'),
    tasksEmpty:     $('#tasks-empty'),
    modalSubject:   $('#modal-subject'),
    modalTask:      $('#modal-task'),
    formSubject:    $('#form-subject'),
    formTask:       $('#form-task'),
};

// ─── State ──────────────────────────────────────────────────────
let subjects      = [];
let tasks         = [];
let activeSubject = null;   // currently selected subject object
let activeSession = null;   // the running session doc
let tickInterval  = null;

// ─── API Helper ─────────────────────────────────────────────────
async function api(path, opts = {}) {
    const res = await fetch('/api' + path, {
        headers: { 'Content-Type': 'application/json' },
        ...opts,
    });
    // DELETE sometimes returns empty body
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = {}; }
    if (!res.ok) throw new Error(data.message || `Error ${res.status}`);
    return data;
}

// ─── Toast ──────────────────────────────────────────────────────
function toast(msg, type = 'ok') {
    const el = document.createElement('div');
    el.className = 'toast ' + type;
    const icon = type === 'ok' ? 'ri-check-line' : 'ri-error-warning-line';
    el.innerHTML = `<i class="${icon}"></i> ${msg}`;
    $('#toast-container').appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); }, 3000);
}

// ─── Modal Helpers ──────────────────────────────────────────────
function openModal(id) { $(`#${id}`).classList.add('open'); }
function closeModal(id) { $(`#${id}`).classList.remove('open'); }

// ─── Subjects ───────────────────────────────────────────────────
async function loadSubjects() {
    try {
        subjects = await api('/subjects');
    } catch (e) {
        toast(e.message, 'err');
        subjects = [];
    }
    renderSubjects();
}

function renderSubjects() {
    if (subjects.length === 0) {
        DOM.subjectList.innerHTML = '';
        DOM.sidebarEmpty.style.display = 'flex';
        return;
    }
    DOM.sidebarEmpty.style.display = 'none';
    DOM.subjectList.innerHTML = subjects.map(s => `
        <li class="subj-item ${activeSubject && activeSubject._id === s._id ? 'active' : ''}" data-id="${s._id}">
            <span class="name">${esc(s.name)}</span>
            <button class="icon-btn text-danger del-btn" data-del="${s._id}" title="Delete">
                <i class="ri-delete-bin-6-line"></i>
            </button>
        </li>
    `).join('');

    // Click to select
    DOM.subjectList.querySelectorAll('.subj-item').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target.closest('.del-btn')) return;
            selectSubject(el.dataset.id);
        });
    });

    // Delete buttons
    DOM.subjectList.querySelectorAll('.del-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteSubject(btn.dataset.del);
        });
    });
}

async function createSubject(e) {
    e.preventDefault();
    const nameInput = $('#inp-subject-name');
    const name = nameInput.value.trim();
    if (!name) return;
    try {
        const created = await api('/subjects', {
            method: 'POST',
            body: JSON.stringify({ name }),
        });
        subjects.push(created);
        renderSubjects();
        closeModal('modal-subject');
        nameInput.value = '';
        toast('Subject created');
        // auto-select if first
        if (subjects.length === 1) selectSubject(created._id);
    } catch (e) { toast(e.message, 'err'); }
}

async function deleteSubject(id) {
    if (!confirm('Delete this subject and lose all its tasks?')) return;
    try {
        await api('/subjects/' + id, { method: 'DELETE' });
        subjects = subjects.filter(s => s._id !== id);
        if (activeSubject && activeSubject._id === id) {
            activeSubject = null;
            tasks = [];
            renderHeader();
            renderTasks();
        }
        renderSubjects();
        toast('Subject deleted');
    } catch (e) { toast(e.message, 'err'); }
}

function selectSubject(id) {
    activeSubject = subjects.find(s => s._id === id) || null;
    renderSubjects();
    renderHeader();
    loadTasks();
}

// ─── Header / Session Area ──────────────────────────────────────
function renderHeader() {
    if (!activeSubject) {
        DOM.headerTitle.textContent = 'Welcome to Study Planner';
        DOM.headerSubtitle.textContent = 'Select or create a subject to get started.';
        DOM.sessionArea.style.display = 'none';
        DOM.btnAddTask.disabled = true;
        return;
    }
    DOM.headerTitle.textContent = activeSubject.name;
    DOM.headerSubtitle.textContent = 'Manage tasks and study sessions for this subject.';
    DOM.sessionArea.style.display = 'flex';
    DOM.btnAddTask.disabled = false;
}

// ─── Tasks ──────────────────────────────────────────────────────
async function loadTasks() {
    if (!activeSubject) { tasks = []; renderTasks(); return; }
    try {
        const all = await api('/tasks');
        // Filter tasks that belong to the selected subject
        tasks = all.filter(t => t.subjectId === activeSubject._id);
        renderTasks();
    } catch (e) { toast(e.message, 'err'); tasks = []; renderTasks(); }
}

function renderTasks() {
    if (!activeSubject || tasks.length === 0) {
        DOM.taskList.innerHTML = `
            <div class="empty-state">
                <i class="ri-clipboard-line"></i>
                <p>${activeSubject ? 'No tasks yet. Click <strong>New Task</strong> to add one.' : 'Select a subject to see its tasks.'}</p>
            </div>`;
        return;
    }
    DOM.taskList.innerHTML = tasks.map(t => {
        const isDone = t.status === 'completed';
        const deadlineStr = t.deadline ? new Date(t.deadline).toLocaleDateString() : '';
        return `
        <div class="task-item ${isDone ? 'done' : ''}" data-id="${t._id}">
            <div class="check-circle ${isDone ? 'checked' : ''}" data-toggle="${t._id}"></div>
            <div class="task-body">
                <div class="task-title">${esc(t.title)}</div>
                ${t.description ? `<div class="task-desc">${esc(t.description)}</div>` : ''}
                ${deadlineStr ? `<div class="task-meta"><i class="ri-calendar-line"></i> ${deadlineStr}</div>` : ''}
            </div>
            <button class="icon-btn text-danger" data-del-task="${t._id}" title="Delete task">
                <i class="ri-delete-bin-6-line"></i>
            </button>
        </div>`;
    }).join('');

    // Toggle completion
    DOM.taskList.querySelectorAll('.check-circle').forEach(el => {
        el.addEventListener('click', () => toggleTask(el.dataset.toggle));
    });

    // Delete task
    DOM.taskList.querySelectorAll('[data-del-task]').forEach(btn => {
        btn.addEventListener('click', () => deleteTask(btn.dataset.delTask));
    });
}

async function createTask(e) {
    e.preventDefault();
    if (!activeSubject) return;
    const title    = $('#inp-task-title').value.trim();
    const desc     = $('#inp-task-desc').value.trim();
    const deadline = $('#inp-task-deadline').value;
    if (!title) return;

    const body = { title, subjectId: activeSubject._id };
    if (desc) body.description = desc;
    if (deadline) body.deadline = new Date(deadline).toISOString();

    try {
        const created = await api('/tasks', { method: 'POST', body: JSON.stringify(body) });
        tasks.push(created);
        renderTasks();
        closeModal('modal-task');
        DOM.formTask.reset();
        toast('Task created');
    } catch (e) { toast(e.message, 'err'); }
}

async function toggleTask(id) {
    const t = tasks.find(x => x._id === id);
    if (!t) return;
    const newStatus = t.status === 'completed' ? 'pending' : 'completed';
    try {
        const updated = await api('/tasks/' + id, {
            method: 'PUT',
            body: JSON.stringify({ status: newStatus }),
        });
        const idx = tasks.findIndex(x => x._id === id);
        tasks[idx] = updated;
        renderTasks();
    } catch (e) { toast(e.message, 'err'); }
}

async function deleteTask(id) {
    if (!confirm('Delete this task?')) return;
    try {
        await api('/tasks/' + id, { method: 'DELETE' });
        tasks = tasks.filter(t => t._id !== id);
        renderTasks();
        toast('Task deleted');
    } catch (e) { toast(e.message, 'err'); }
}

// ─── Study Sessions ─────────────────────────────────────────────
async function startSession() {
    if (!activeSubject) return;
    try {
        const session = await api('/sessions/start', {
            method: 'POST',
            body: JSON.stringify({ subjectId: activeSubject._id }),
        });
        activeSession = session;
        showTimer(new Date(session.startTime));
        toast('Study session started');
    } catch (e) { toast(e.message, 'err'); }
}

async function endSession() {
    if (!activeSession) return;
    try {
        const result = await api('/sessions/' + activeSession._id + '/end', { method: 'PUT' });
        clearInterval(tickInterval);
        activeSession = null;
        DOM.liveSession.style.display = 'none';
        DOM.btnStartSess.style.display = 'inline-flex';
        const mins = Math.round((result.duration || 0) / 60);
        toast(`Session ended — ${mins} min studied`);
    } catch (e) { toast(e.message, 'err'); }
}

function showTimer(startDate) {
    DOM.btnStartSess.style.display = 'none';
    DOM.liveSession.style.display = 'flex';

    const tick = () => {
        const diff = Math.floor((Date.now() - startDate.getTime()) / 1000);
        const h = String(Math.floor(diff / 3600)).padStart(2, '0');
        const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
        const s = String(diff % 60).padStart(2, '0');
        DOM.timer.textContent = `${h}:${m}:${s}`;
    };
    tick();
    tickInterval = setInterval(tick, 1000);
}

// Check for existing active session on load
async function checkActiveSession() {
    try {
        const sessions = await api('/sessions');
        const running = sessions.find(s => !s.endTime);
        if (running) {
            activeSession = running;
            // If the session belongs to a subject we have, select it
            const matchSub = subjects.find(s => s._id === running.subjectId);
            if (matchSub) selectSubject(matchSub._id);
            showTimer(new Date(running.startTime));
        }
    } catch { /* ignore */ }
}

// ─── Utilities ──────────────────────────────────────────────────
function esc(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

// ─── Event Wiring ───────────────────────────────────────────────
function wireEvents() {
    DOM.btnAddSubject.addEventListener('click', () => openModal('modal-subject'));
    DOM.btnAddTask.addEventListener('click', () => {
        if (!activeSubject) return;
        openModal('modal-task');
    });
    DOM.formSubject.addEventListener('submit', createSubject);
    DOM.formTask.addEventListener('submit', createTask);
    DOM.btnStartSess.addEventListener('click', startSession);
    DOM.btnEndSess.addEventListener('click', endSession);

    // Close modal buttons
    $$('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => btn.closest('.modal-overlay').classList.remove('open'));
    });
    // Click outside modal
    $$('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('open');
        });
    });
}

// ─── Init ───────────────────────────────────────────────────────
async function init() {
    wireEvents();
    await loadSubjects();
    await checkActiveSession();
    // auto-select first subject if available
    if (subjects.length > 0 && !activeSubject) {
        selectSubject(subjects[0]._id);
    }
}

document.addEventListener('DOMContentLoaded', init);
