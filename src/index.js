
const DEMO_PASSWORD_HASH = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92";
const APP_NAME = "Absensi SD";

const CLASS_CODES = [
  "1A", "1B",
  "2A", "2B",
  "3A", "3B",
  "4A", "4B",
  "5A", "5B",
  "6A", "6B",
];

const HTML = `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Absensi SD</title>
  <style>
    :root {
      --bg:#f4f7fb;
      --card:#ffffff;
      --text:#0f172a;
      --muted:#64748b;
      --line:#e2e8f0;
      --blue:#2563eb;
      --blue2:#1d4ed8;
      --green:#16a34a;
      --amber:#d97706;
      --rose:#e11d48;
      --shadow:0 10px 30px rgba(15,23,42,.06);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      background: linear-gradient(180deg, #f8fbff 0%, var(--bg) 100%);
      color: var(--text);
    }
    button, input, textarea, select { font: inherit; }
    .wrap { max-width: 980px; margin: 0 auto; padding: 14px 12px 92px; }
    .card {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 24px;
      box-shadow: var(--shadow);
      padding: 16px;
      margin-bottom: 12px;
    }
    .top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }
    h1 { margin: 0; font-size: 28px; line-height: 1.1; }
    h2 { margin: 0; font-size: 20px; }
    .sub { margin: 8px 0 0; color: var(--muted); line-height: 1.5; font-size: 14px; }
    .small { font-size: 12px; color: var(--muted); line-height: 1.5; }
    .error { color: var(--rose); font-weight: 700; }
    .btn, .iconbtn, .tab, .choice, .sheetbtn {
      border: 1px solid var(--line);
      background: #fff;
      border-radius: 16px;
      padding: 12px 14px;
      font-weight: 700;
      cursor: pointer;
    }
    .btn.primary, .tab.active, .sheetbtn.primary {
      background: var(--blue);
      border-color: var(--blue);
      color: #fff;
    }
    .btn.ghost {
      background: #f8fafc;
    }
    .iconbtn { width: 44px; height: 44px; padding: 0; display: inline-flex; align-items: center; justify-content: center; }
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid var(--line);
      background: #fff;
      font-size: 13px;
      font-weight: 700;
      color: #334155;
    }
    .muted-box {
      border: 1px solid var(--line);
      border-radius: 18px;
      background: #fafcff;
      padding: 12px;
    }
    .login-wrap {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 20px;
    }
    .login-card {
      width: min(460px, 100%);
      background: #fff;
      border: 1px solid var(--line);
      border-radius: 28px;
      box-shadow: var(--shadow);
      padding: 20px;
    }
    .field { margin-top: 12px; }
    .field label {
      display: block;
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .field input, .field textarea, .field select {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 16px;
      padding: 13px 14px;
      outline: none;
      background: #fff;
    }
    .toolbar { display: flex; gap: 8px; flex-wrap: wrap; }
    .tabs { display: flex; gap: 8px; flex-wrap: wrap; margin: 0 0 12px; }
    .tab { border-radius: 999px; padding: 10px 14px; }
    .row {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 10px;
      align-items: center;
    }
    .datebox {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 14px;
      border-radius: 16px;
      background: #eff6ff;
      color: var(--blue2);
      font-weight: 700;
    }
    .week {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;
      margin-top: 12px;
    }
    .day {
      border: 1px solid var(--line);
      background: #fff;
      border-radius: 16px;
      padding: 10px 6px;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
    }
    .day.active {
      background: #eff6ff;
      border-color: #93c5fd;
      color: var(--blue2);
    }
    .day .n { font-size: 18px; font-weight: 800; margin-top: 4px; }
    .stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-top: 12px;
    }
    .stat {
      border: 1px solid var(--line);
      border-radius: 16px;
      padding: 12px 10px;
      text-align: center;
    }
    .stat .num { font-size: 22px; font-weight: 900; }
    .stat .lab { font-size: 12px; font-weight: 700; margin-top: 2px; }
    .s-H { background: #ecfdf5; color: #047857; border-color: #bbf7d0; }
    .s-S { background: #fffbeb; color: #b45309; border-color: #fde68a; }
    .s-I { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
    .s-A { background: #fff1f2; color: #be123c; border-color: #fecdd3; }
    .search {
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--line);
      border-radius: 16px;
      background: #fff;
      padding: 12px 14px;
    }
    .search input {
      border: none;
      outline: none;
      width: 100%;
      padding: 0;
      background: transparent;
    }
    .student {
      border: 1px solid var(--line);
      border-radius: 20px;
      background: #f8fafc;
      padding: 12px;
      margin-top: 10px;
    }
    .head {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: flex-start;
    }
    .name { font-size: 15px; font-weight: 800; line-height: 1.25; }
    .meta { color: var(--muted); font-size: 12px; margin-top: 4px; }
    .badge {
      border-radius: 999px;
      background: #fff;
      border: 1px solid var(--line);
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 800;
      min-width: 84px;
      text-align: center;
    }
    .choices {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-top: 10px;
    }
    .choice {
      padding: 10px 8px;
      border-radius: 14px;
      font-size: 13px;
    }
    .choice.active.H { background: #ecfdf5; color: #047857; border-color: #86efac; }
    .choice.active.S { background: #fffbeb; color: #b45309; border-color: #fcd34d; }
    .choice.active.I { background: #eff6ff; color: #1d4ed8; border-color: #93c5fd; }
    .choice.active.A { background: #fff1f2; color: #be123c; border-color: #fda4af; }

    .bottom {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255,255,255,.97);
      border-top: 1px solid var(--line);
      backdrop-filter: blur(12px);
      z-index: 20;
    }
    .bottom .in {
      max-width: 980px;
      margin: 0 auto;
      padding: 10px 12px;
      display: flex;
      gap: 10px;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(15,23,42,.45);
      display: none;
      align-items: flex-end;
      justify-content: center;
      z-index: 40;
    }
    .sheet {
      width: min(980px, 100%);
      background: #fff;
      border-radius: 26px 26px 0 0;
      box-shadow: 0 -20px 40px rgba(0,0,0,.18);
      padding: 14px;
      max-height: 92vh;
      overflow: auto;
    }
    .sheetbar {
      width: 56px;
      height: 5px;
      border-radius: 999px;
      background: #cbd5e1;
      margin: 0 auto 12px;
    }
    .sheetgrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .full { grid-column: 1 / -1; }

    .kpi { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .kpi .box {
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 14px;
      text-align: center;
      background: #fafcff;
    }
    .kpi .n { font-size: 24px; font-weight: 900; }
    .kpi .t { font-size: 12px; color: var(--muted); font-weight: 700; }

    @media (max-width: 720px) {
      h1 { font-size: 24px; }
      .row { grid-template-columns: 1fr auto 1fr; }
      .week, .stats, .choices, .sheetgrid, .kpi { gap: 6px; }
      .choice { font-size: 12px; padding: 9px 6px; }
      .sheet { border-radius: 22px 22px 0 0; }
    }
  </style>
</head>
<body>
  <div id="app"></div>

  <script>
    const APP = document.getElementById('app');
    const TOKEN_KEY = 'absensi_token_v2';

    const STATE = {
      user: null,
      token: localStorage.getItem(TOKEN_KEY) || '',
      students: [],
      attendance: {},
      query: '',
      tab: 'absensi',
      selectedDate: new Date(),
      loading: true,
      error: '',
      sheetOpen: false
    };

    const STATUSS = [
      { k: 'H', l: 'Hadir' },
      { k: 'S', l: 'Sakit' },
      { k: 'I', l: 'Izin' },
      { k: 'A', l: 'Alpha' }
    ];

    function escapeHtml(s) {
      return String(s)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
    }

    function toISODate(d) {
      return d.toISOString().slice(0, 10);
    }

    function formatLongDate(d) {
      return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(d);
    }

    function formatShortDate(d) {
      return new Intl.DateTimeFormat('id-ID', {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
      }).format(d);
    }

    function startOfWeek(d) {
      const x = new Date(d);
      const day = (x.getDay() + 6) % 7;
      x.setDate(x.getDate() - day);
      x.setHours(0, 0, 0, 0);
      return x;
    }

    async function api(path, options, noAuth) {
      const opts = options || {};
      const headers = {};
      if (!noAuth && STATE.token) {
        headers['Authorization'] = 'Bearer ' + STATE.token;
      }
      if (opts.body && !(opts.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
      }
      const res = await fetch(path, {
        credentials: 'include',
        ...opts,
        headers: Object.assign(headers, opts.headers || {})
      });
      const text = await res.text();
      let data = null;
      try {
        data = JSON.parse(text);
      } catch (e) {
        data = { error: text };
      }
      if (!res.ok) {
        throw new Error((data && (data.error || data.message)) || text || ('HTTP ' + res.status));
      }
      return data;
    }

    function renderLogin(message) {
      APP.innerHTML =
        '<div class="login-wrap">' +
          '<div class="login-card">' +
            '<p class="small" style="text-transform:uppercase;letter-spacing:.18em;font-weight:800;margin:0">Login Wali Kelas</p>' +
            '<h1 style="margin-top:8px">' + APP_NAME + '</h1>' +
            '<p class="sub">Masuk untuk kelas 1A sampai 6B.</p>' +
            '<div class="field"><label>Username</label><input id="username" autocomplete="username" placeholder="Contoh: 1a"></div>' +
            '<div class="field"><label>Password</label><input id="password" type="password" autocomplete="current-password" placeholder="Contoh: 123456"></div>' +
            '<div class="toolbar" style="margin-top:12px">' +
              '<button class="btn primary" id="loginBtn">Masuk</button>' +
              '<button class="btn ghost" id="checkBtn" type="button">Cek Server</button>' +
            '</div>' +
            '<div class="small" style="margin-top:12px">Demo login: <b>1a</b> sampai <b>6b</b> / password <b>123456</b>.</div>' +
            '<div id="loginMsg" class="small error" style="margin-top:8px"></div>' +
          '</div>' +
        '</div>';

      document.getElementById('loginBtn').onclick = doLogin;
      document.getElementById('checkBtn').onclick = checkServer;
      document.getElementById('password').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') doLogin();
      });
      document.getElementById('username').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') doLogin();
      });
      document.getElementById('loginMsg').textContent = message || '';
    }

    function renderTabs() {
      return '' +
        '<div class="tabs">' +
          '<button class="tab ' + (STATE.tab === 'absensi' ? 'active' : '') + '" data-tab="absensi">Absensi</button>' +
          '<button class="tab ' + (STATE.tab === 'siswa' ? 'active' : '') + '" data-tab="siswa">Siswa</button>' +
          '<button class="tab ' + (STATE.tab === 'rekap' ? 'active' : '') + '" data-tab="rekap">Rekap</button>' +
        '</div>';
    }

    function attendanceLabelByStudentId(studentId) {
      const st = STATE.attendance[String(studentId)];
      if (!st) return 'Belum';
      const found = STATUSS.find(function (x) { return x.k === st; });
      return found ? found.l : st;
    }

    function renderStudentList() {
      const q = STATE.query.trim().toLowerCase();
      const filtered = STATE.students.filter(function (s) {
        return !q || String(s.name).toLowerCase().includes(q) || String(s.nisn).includes(q);
      });

      if (!filtered.length) {
        return '<div class="muted-box small" style="margin-top:12px">Belum ada siswa. Tempel CSV siswa di tab <b>Siswa</b>.</div>';
      }

      return filtered.map(function (s, index) {
        const current = STATE.attendance[String(s.id)] || '';
        const badge = attendanceLabelByStudentId(s.id);
        const buttons = STATUSS.map(function (st) {
          const active = current === st.k ? ('active ' + st.k) : '';
          return '<button class="choice ' + active + '" data-id="' + s.id + '" data-status="' + st.k + '">' + st.l + '</button>';
        }).join('');

        return '' +
          '<div class="student">' +
            '<div class="head">' +
              '<div>' +
                '<div class="meta">' + String(index + 1).padStart(2, '0') + ' • NISN ' + escapeHtml(s.nisn) + (s.number ? ' • No ' + escapeHtml(s.number) : '') + '</div>' +
                '<div class="name">' + escapeHtml(s.name) + '</div>' +
              '</div>' +
              '<div class="badge">' + escapeHtml(badge) + '</div>' +
            '</div>' +
            '<div class="choices">' + buttons + '</div>' +
          '</div>';
      }).join('');
    }

    function renderDashboard() {
      const dateISO = toISODate(STATE.selectedDate);
      const weekStart = startOfWeek(STATE.selectedDate);
      const weekDays = [];

      for (let i = 0; i < 7; i++) {
        const d = new Date(weekStart);
        d.setDate(d.getDate() + i);
        const active = toISODate(d) === dateISO ? ' active' : '';
        weekDays.push(
          '<button class="day' + active + '" data-date="' + toISODate(d) + '">' +
            '<div>' + escapeHtml(formatShortDate(d).split(',')[0]) + '</div>' +
            '<div class="n">' + d.getDate() + '</div>' +
          '</button>'
        );
      }

      const counts = { H: 0, S: 0, I: 0, A: 0 };
      Object.keys(STATE.attendance).forEach(function (k) {
        const st = STATE.attendance[k];
        if (counts[st] !== undefined) counts[st]++;
      });

      const filteredStudents = STATE.students.filter(function (s) {
        const q = STATE.query.trim().toLowerCase();
        return !q || String(s.name).toLowerCase().includes(q) || String(s.nisn).includes(q);
      });

      let body = '';
      if (STATE.tab === 'absensi') {
        body =
          '<div class="card">' +
            '<div class="row">' +
              '<button class="iconbtn" id="prevDay">←</button>' +
              '<div class="datebox">📅 <span>' + escapeHtml(formatLongDate(STATE.selectedDate)) + '</span></div>' +
              '<button class="iconbtn" id="nextDay">→</button>' +
            '</div>' +
            '<div class="week">' + weekDays.join('') + '</div>' +
            '<div class="stats">' +
              '<div class="stat s-H"><div class="num">' + counts.H + '</div><div class="lab">Hadir</div></div>' +
              '<div class="stat s-S"><div class="num">' + counts.S + '</div><div class="lab">Sakit</div></div>' +
              '<div class="stat s-I"><div class="num">' + counts.I + '</div><div class="lab">Izin</div></div>' +
              '<div class="stat s-A"><div class="num">' + counts.A + '</div><div class="lab">Alpha</div></div>' +
            '</div>' +
          '</div>' +
          '<div class="card">' +
            '<div class="search"><span>🔎</span><input id="searchBox" value="' + escapeHtml(STATE.query) + '" placeholder="Cari nama / NISN"></div>' +
            '<div id="studentList">' + renderStudentList() + '</div>' +
          '</div>';
      } else if (STATE.tab === 'siswa') {
        const studentTable = filteredStudents.length ? filteredStudents.map(function (s) {
          return '<tr><td>' + escapeHtml(s.nisn) + '</td><td>' + escapeHtml(s.name) + '</td><td>' + escapeHtml(s.number || '-') + '</td></tr>';
        }).join('') : '<tr><td colspan="3" class="small">Belum ada data siswa.</td></tr>';

        body =
          '<div class="card">' +
            '<div class="top">' +
              '<div>' +
                '<h2>' + escapeHtml(STATE.user.full_name) + '</h2>' +
                '<div class="sub">Kelas ' + escapeHtml(STATE.user.class_code) + '</div>' +
              '</div>' +
              '<button class="iconbtn" id="openSheet">⚙</button>' +
            '</div>' +
            '<div class="toolbar" style="margin-top:12px">' +
              '<button class="btn primary" id="saveCsvBtn">Simpan Siswa</button>' +
              '<button class="btn ghost" id="templateBtn">Contoh CSV</button>' +
            '</div>' +
            '<div class="field">' +
              '<label>Tempel CSV siswa</label>' +
              '<textarea id="csvArea" rows="8" placeholder="nisn,nama,nomor&#10;3136899923,REVAL RESTU MAULANA,1"></textarea>' +
            '</div>' +
            '<div class="small">Format: <b>nisn,nama,nomor</b>. Baris header boleh ada atau tidak.</div>' +
          '</div>' +
          '<div class="card">' +
            '<div class="search"><span>🔎</span><input id="searchBox" value="' + escapeHtml(STATE.query) + '" placeholder="Cari siswa"></div>' +
            '<table class="table">' +
              '<thead><tr><th>NISN</th><th>Nama</th><th>No</th></tr></thead>' +
              '<tbody>' + studentTable + '</tbody>' +
            '</table>' +
          '</div>';
      } else if (STATE.tab === 'rekap') {
        body =
          '<div class="card">' +
            '<div class="kpi">' +
              '<div class="box"><div class="n">' + STATE.students.length + '</div><div class="t">Jumlah siswa</div></div>' +
              '<div class="box"><div class="n">' + counts.H + '</div><div class="t">Hadir</div></div>' +
              '<div class="box"><div class="n">' + (counts.S + counts.I + counts.A) + '</div><div class="t">Tidak hadir</div></div>' +
              '<div class="box"><div class="n">' + escapeHtml(dateISO) + '</div><div class="t">Tanggal</div></div>' +
            '</div>' +
          '</div>' +
          '<div class="card">' +
            '<h2>Ringkasan</h2>' +
            '<div class="small" style="margin-top:10px">Data tersimpan di D1 Database. Login menggunakan akun wali kelas dan status absensi tersimpan per tanggal.</div>' +
            '<div class="muted-box small" style="margin-top:12px">Kalau Anda belum import siswa, buka tab <b>Siswa</b> lalu tempel CSV atau daftar siswa dari Excel.</div>' +
          '</div>';
      }

      const overlay = STATE.sheetOpen ? '' +
        '<div class="overlay" id="sheetOverlay" style="display:flex">' +
          '<div class="sheet">' +
            '<div class="sheetbar"></div>' +
            '<div class="top">' +
              '<div>' +
                '<h2>Options</h2>' +
                '<div class="small">Aksi cepat untuk kelas ' + escapeHtml(STATE.user.class_code) + '.</div>' +
              '</div>' +
              '<button class="iconbtn" id="closeSheet">✕</button>' +
            '</div>' +
            '<div class="sheetgrid" style="margin-top:12px">' +
              '<button class="sheetbtn" id="allH">Semua Hadir</button>' +
              '<button class="sheetbtn" id="allS">Semua Sakit</button>' +
              '<button class="sheetbtn" id="allI">Semua Izin</button>' +
              '<button class="sheetbtn" id="allA">Semua Alpha</button>' +
              '<button class="sheetbtn full" id="clearDay">Hapus Absensi Hari Ini</button>' +
              '<button class="sheetbtn primary full" id="exportBtn">Export CSV</button>' +
            '</div>' +
            '<div class="small" style="margin-top:12px">Data tersimpan otomatis di browser dan di database. Jika data login lama bermasalah, project ini akan memperbaiki akun demo saat boot.</div>' +
          '</div>' +
        '</div>' : '';

      APP.innerHTML =
        '<div class="wrap">' +
          '<div class="card">' +
            '<div class="top">' +
              '<div>' +
                '<p class="small" style="text-transform:uppercase;letter-spacing:.18em;font-weight:800;margin:0">Absensi Wali Kelas</p>' +
                '<h1 style="margin-top:6px">' + APP_NAME + '</h1>' +
                '<p class="sub">Login sebagai <b>' + escapeHtml(STATE.user.full_name) + '</b> • Kelas <b>' + escapeHtml(STATE.user.class_code) + '</b></p>' +
              '</div>' +
              '<div class="toolbar">' +
                '<button class="iconbtn" id="logoutBtn">⎋</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
          renderTabs() +
          body +
        '</div>' +
        '<div class="bottom">' +
          '<div class="in">' +
            '<button class="btn" id="optionsBtn" style="flex:1">Options</button>' +
            '<button class="btn primary" id="exportBtnMain" style="flex:1">Simpan / Export</button>' +
          '</div>' +
        '</div>' +
        overlay;

      // bind tabs
      document.querySelectorAll('[data-tab]').forEach(function (btn) {
        btn.onclick = function () {
          STATE.tab = btn.getAttribute('data-tab');
          STATE.query = '';
          renderDashboard();
          bindDashboardEvents();
        };
      });

      bindDashboardEvents();
    }

    function bindDashboardEvents() {
      const prev = document.getElementById('prevDay');
      const next = document.getElementById('nextDay');
      const searchBox = document.getElementById('searchBox');
      const logoutBtn = document.getElementById('logoutBtn');
      const optionsBtn = document.getElementById('optionsBtn');
      const exportBtnMain = document.getElementById('exportBtnMain');
      const openSheet = document.getElementById('openSheet');
      const closeSheet = document.getElementById('closeSheet');
      const sheetOverlay = document.getElementById('sheetOverlay');
      const saveCsvBtn = document.getElementById('saveCsvBtn');
      const templateBtn = document.getElementById('templateBtn');
      const csvArea = document.getElementById('csvArea');

      if (prev) prev.onclick = function () {
        STATE.selectedDate.setDate(STATE.selectedDate.getDate() - 1);
        loadAttendanceAndRender();
      };
      if (next) next.onclick = function () {
        STATE.selectedDate.setDate(STATE.selectedDate.getDate() + 1);
        loadAttendanceAndRender();
      };
      if (searchBox) searchBox.oninput = function (e) {
        STATE.query = e.target.value || '';
        renderDashboard();
        bindDashboardEvents();
      };
      if (logoutBtn) logoutBtn.onclick = doLogout;
      if (optionsBtn) optionsBtn.onclick = function () {
        STATE.sheetOpen = true;
        renderDashboard();
        bindDashboardEvents();
      };
      if (openSheet) openSheet.onclick = function () {
        STATE.sheetOpen = true;
        renderDashboard();
        bindDashboardEvents();
      };
      if (closeSheet) closeSheet.onclick = function () {
        STATE.sheetOpen = false;
        renderDashboard();
        bindDashboardEvents();
      };
      if (sheetOverlay) {
        sheetOverlay.onclick = function (e) {
          if (e.target === sheetOverlay) {
            STATE.sheetOpen = false;
            renderDashboard();
            bindDashboardEvents();
          }
        };
      }
      if (exportBtnMain) exportBtnMain.onclick = exportCsv;
      if (saveCsvBtn) saveCsvBtn.onclick = importCsv;
      if (templateBtn) templateBtn.onclick = function () {
        if (csvArea) {
          csvArea.value = 'nisn,nama,nomor\\n' +
            '3136899923,Contoh Siswa 1,1\\n' +
            '3141104224,Contoh Siswa 2,2\\n' +
            '3143211259,Contoh Siswa 3,3';
        }
      };

      if (csvArea) {
        csvArea.addEventListener('keydown', function (e) {
          if (e.key === 'Tab') {
            e.preventDefault();
            const start = csvArea.selectionStart;
            const end = csvArea.selectionEnd;
            const value = csvArea.value;
            csvArea.value = value.substring(0, start) + '\\t' + value.substring(end);
            csvArea.selectionStart = csvArea.selectionEnd = start + 1;
          }
        });
      }

      document.querySelectorAll('.day[data-date]').forEach(function (btn) {
        btn.onclick = function () {
          STATE.selectedDate = new Date(btn.getAttribute('data-date') + 'T00:00:00');
          loadAttendanceAndRender();
        };
      });

      document.querySelectorAll('.choice').forEach(function (btn) {
        btn.onclick = function () {
          const id = btn.getAttribute('data-id');
          const status = btn.getAttribute('data-status');
          saveAttendance(id, status);
        };
      });

      const allH = document.getElementById('allH');
      const allS = document.getElementById('allS');
      const allI = document.getElementById('allI');
      const allA = document.getElementById('allA');
      const clearDay = document.getElementById('clearDay');
      const exportBtn = document.getElementById('exportBtn');

      if (allH) allH.onclick = function () { setAllAttendance('H'); };
      if (allS) allS.onclick = function () { setAllAttendance('S'); };
      if (allI) allI.onclick = function () { setAllAttendance('I'); };
      if (allA) allA.onclick = function () { setAllAttendance('A'); };
      if (clearDay) clearDay.onclick = clearAttendanceDay;
      if (exportBtn) exportBtn.onclick = exportCsv;
    }

    async function checkServer() {
      const msg = document.getElementById('loginMsg');
      msg.textContent = 'Memeriksa...';
      try {
        const data = await api('/api/test', { method: 'GET' }, true);
        msg.textContent = 'Server OK • users=' + data.users + ' • students=' + data.students;
      } catch (e) {
        msg.textContent = e.message;
      }
    }

    async function doLogin() {
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      const msg = document.getElementById('loginMsg');
      msg.textContent = 'Memproses...';
      try {
        const data = await api('/api/login', {
          method: 'POST',
          body: JSON.stringify({ username, password })
        }, true);

        STATE.token = data.token;
        localStorage.setItem(TOKEN_KEY, data.token);
        STATE.user = data.user;
        STATE.error = '';
        await loadStudents();
        await loadAttendance();
        STATE.loading = false;
        renderDashboard();
      } catch (e) {
        msg.textContent = e.message;
      }
    }

    async function doLogout() {
      try {
        await api('/api/logout', { method: 'POST' });
      } catch (e) {}
      localStorage.removeItem(TOKEN_KEY);
      STATE.token = '';
      STATE.user = null;
      STATE.students = [];
      STATE.attendance = {};
      STATE.tab = 'absensi';
      STATE.query = '';
      renderLogin('');
    }

    async function loadMe() {
      if (!STATE.token) {
        STATE.user = null;
        return;
      }
      try {
        const data = await api('/api/me', { method: 'GET' });
        STATE.user = data.user;
        if (!STATE.user) {
          localStorage.removeItem(TOKEN_KEY);
          STATE.token = '';
        }
      } catch (e) {
        localStorage.removeItem(TOKEN_KEY);
        STATE.token = '';
        STATE.user = null;
      }
    }

    async function loadStudents() {
      if (!STATE.user) return;
      const data = await api('/api/students?classCode=' + encodeURIComponent(STATE.user.class_code), { method: 'GET' });
      STATE.students = data.students || [];
    }

    async function loadAttendance() {
      if (!STATE.user) return;
      const data = await api('/api/attendance?classCode=' + encodeURIComponent(STATE.user.class_code) + '&date=' + toISODate(STATE.selectedDate), { method: 'GET' });
      STATE.attendance = data.attendance || {};
    }

    async function loadAttendanceAndRender() {
      await loadAttendance();
      renderDashboard();
    }

    async function saveAttendance(studentId, status) {
      try {
        await api('/api/attendance', {
          method: 'POST',
          body: JSON.stringify({
            classCode: STATE.user.class_code,
            date: toISODate(STATE.selectedDate),
            studentId: Number(studentId),
            status: status
          })
        });
        await loadAttendance();
        renderDashboard();
      } catch (e) {
        alert(e.message);
      }
    }

    async function setAllAttendance(status) {
      try {
        for (let i = 0; i < STATE.students.length; i++) {
          const s = STATE.students[i];
          await api('/api/attendance', {
            method: 'POST',
            body: JSON.stringify({
              classCode: STATE.user.class_code,
              date: toISODate(STATE.selectedDate),
              studentId: Number(s.id),
              status: status
            })
          });
        }
        await loadAttendance();
        STATE.sheetOpen = false;
        renderDashboard();
      } catch (e) {
        alert(e.message);
      }
    }

    async function clearAttendanceDay() {
      try {
        await api('/api/attendance', {
          method: 'DELETE',
          body: JSON.stringify({
            classCode: STATE.user.class_code,
            date: toISODate(STATE.selectedDate)
          })
        });
        await loadAttendance();
        STATE.sheetOpen = false;
        renderDashboard();
      } catch (e) {
        alert(e.message);
      }
    }

    async function exportCsv() {
      const rows = [];
      rows.push(['Tanggal', toISODate(STATE.selectedDate)]);
      rows.push(['No', 'NISN', 'Nama', 'Status']);
      for (let i = 0; i < STATE.students.length; i++) {
        const s = STATE.students[i];
        rows.push([
          String(i + 1),
          String(s.nisn),
          String(s.name),
          STATE.attendance[String(s.id)] || ''
        ]);
      }
      const csv = rows.map(function (r) {
        return r.map(function (v) {
          return '"' + String(v).replaceAll('"', '""') + '"';
        }).join(',');
      }).join('\\n');

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'absensi-' + STATE.user.class_code + '-' + toISODate(STATE.selectedDate) + '.csv';
      a.click();
      URL.revokeObjectURL(url);
    }

    async function importCsv() {
      const area = document.getElementById('csvArea');
      if (!area || !area.value.trim()) {
        alert('Tempel CSV siswa dulu.');
        return;
      }

      const lines = area.value.split(/\\r?\\n/).map(function (s) { return s.trim(); }).filter(Boolean);
      const students = [];

      for (let i = 0; i < lines.length; i++) {
        const parts = lines[i].split(',').map(function (s) { return s.trim(); });
        if (!parts[0] || /nisn/i.test(parts[0])) continue;
        students.push({
          nisn: parts[0],
          name: parts[1] || '',
          number: parts[2] ? Number(parts[2]) : null
        });
      }

      if (!students.length) {
        alert('Format CSV belum terbaca.');
        return;
      }

      try {
        await api('/api/students', {
          method: 'POST',
          body: JSON.stringify({
            classCode: STATE.user.class_code,
            students: students
          })
        });

        await loadStudents();
        STATE.tab = 'siswa';
        renderDashboard();
      } catch (e) {
        alert(e.message);
      }
    }

    async function boot() {
      STATE.loading = true;
      if (!STATE.token) {
        STATE.user = null;
        STATE.loading = false;
        renderLogin('');
        return;
      }

      await loadMe();

      if (!STATE.user) {
        STATE.loading = false;
        renderLogin('Sesi login sudah habis. Silakan login lagi.');
        return;
      }

      await loadStudents();
      await loadAttendance();
      STATE.loading = false;
      renderDashboard();
    }

    // Student list clicks are delegated here after render
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.choice');
      if (btn) {
        e.preventDefault();
        saveAttendance(btn.getAttribute('data-id'), btn.getAttribute('data-status'));
      }
    });

    boot();
  </script>
</body>
</html>`;

let bootstrapPromise = null;

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function getCookie(request, name) {
  const raw = request.headers.get("Cookie") || "";
  const parts = raw.split(";").map((p) => p.trim());
  for (const part of parts) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx);
    const value = part.slice(idx + 1);
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

function bearerToken(request) {
  const auth = request.headers.get("Authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  return m ? m[1] : null;
}

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function bootstrap(env) {
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS classes (
      code TEXT PRIMARY KEY,
      grade INTEGER NOT NULL,
      section TEXT NOT NULL,
      name TEXT NOT NULL
    )
  `).run();

  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      class_code TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'wali_kelas'
    )
  `).run();

  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_code TEXT NOT NULL,
      nisn TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      number INTEGER
    )
  `).run();

  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      expires_at TEXT NOT NULL
    )
  `).run();

  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_code TEXT NOT NULL,
      attendance_date TEXT NOT NULL,
      student_id INTEGER NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('H','S','I','A')),
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(class_code, attendance_date, student_id)
    )
  `).run();

  for (const code of CLASS_CODES) {
    await env.DB.prepare(`
      INSERT INTO classes (code, grade, section, name)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(code) DO UPDATE SET
        grade = excluded.grade,
        section = excluded.section,
        name = excluded.name
    `).bind(code, Number(code[0]), code[1], `Kelas ${code}`).run();
  }

  const passwordHash = DEMO_PASSWORD_HASH;
  for (const code of CLASS_CODES) {
    await env.DB.prepare(`
      INSERT INTO users (username, password_hash, full_name, class_code, role)
      VALUES (?, ?, ?, ?, 'wali_kelas')
      ON CONFLICT(username) DO UPDATE SET
        password_hash = excluded.password_hash,
        full_name = excluded.full_name,
        class_code = excluded.class_code,
        role = excluded.role
    `).bind(code.toLowerCase(), passwordHash, `Wali Kelas ${code}`, code).run();
  }
}

async function ensureBootstrap(env) {
  if (!bootstrapPromise) {
    bootstrapPromise = bootstrap(env).catch((err) => {
      bootstrapPromise = null;
      throw err;
    });
  }
  return bootstrapPromise;
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

async function getUserFromRequest(request, env) {
  const token = bearerToken(request) || getCookie(request, "absensi_token_v2");
  if (!token) return null;

  const row = await env.DB.prepare(`
    SELECT u.id, u.username, u.full_name, u.class_code, u.role, s.expires_at
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token = ?
  `).bind(token).first();

  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    await env.DB.prepare(`DELETE FROM sessions WHERE token = ?`).bind(token).run();
    return null;
  }
  return row;
}

async function requireUser(request, env) {
  const user = await getUserFromRequest(request, env);
  if (!user) return null;
  return user;
}

async function handleApi(request, env, pathname) {
  await ensureBootstrap(env);

  if (pathname === "/api/test" && request.method === "GET") {
    const users = await env.DB.prepare(`SELECT COUNT(*) AS total FROM users`).first();
    const students = await env.DB.prepare(`SELECT COUNT(*) AS total FROM students`).first();
    const attendance = await env.DB.prepare(`SELECT COUNT(*) AS total FROM attendance`).first();
    return json({
      ok: true,
      users: users ? users.total : 0,
      students: students ? students.total : 0,
      attendance: attendance ? attendance.total : 0,
    });
  }

  if (pathname === "/api/login" && request.method === "POST") {
    const body = await readJson(request);
    const username = String(body && body.username ? body.username : "").trim().toLowerCase();
    const password = String(body && body.password ? body.password : "");

    if (!username || !password) {
      return json({ error: "Username dan password wajib diisi." }, 400);
    }

    const user = await env.DB.prepare(`
      SELECT id, username, password_hash, full_name, class_code, role
      FROM users
      WHERE username = ?
    `).bind(username).first();

    if (!user) {
      return json({ error: "User tidak ditemukan." }, 401);
    }

    const inputHash = await sha256(password);
    if (inputHash !== user.password_hash) {
      return json({ error: "Password salah." }, 401);
    }

    const token = crypto.randomUUID().replace(/-/g, "");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    await env.DB.prepare(`
      INSERT INTO sessions (token, user_id, expires_at)
      VALUES (?, ?, ?)
    `).bind(token, user.id, expiresAt).run();

    const cookie = `absensi_token_v2=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${7 * 24 * 60 * 60}`;

    return json({
      ok: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        class_code: user.class_code,
        role: user.role,
      },
    }, 200, {
      "Set-Cookie": cookie,
    });
  }

  if (pathname === "/api/me" && request.method === "GET") {
    const user = await getUserFromRequest(request, env);
    return json({ user });
  }

  if (pathname === "/api/logout" && request.method === "POST") {
    const token = bearerToken(request) || getCookie(request, "absensi_token_v2");
    if (token) {
      await env.DB.prepare(`DELETE FROM sessions WHERE token = ?`).bind(token).run();
    }
    return json({ ok: true }, 200, {
      "Set-Cookie": "absensi_token_v2=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0",
    });
  }

  if (pathname === "/api/students" && request.method === "GET") {
    const user = await requireUser(request, env);
    if (!user) return json({ error: "Unauthorized" }, 401);

    const url = new URL(request.url);
    const requestedClass = String(url.searchParams.get("classCode") || user.class_code).toUpperCase();
    const classCode = requestedClass;

    const rows = await env.DB.prepare(`
      SELECT id, class_code, nisn, name, number
      FROM students
      WHERE class_code = ?
      ORDER BY COALESCE(number, 99999), name
    `).bind(classCode).all();

    return json({ students: rows.results || [] });
  }

  if (pathname === "/api/students" && request.method === "POST") {
    const user = await requireUser(request, env);
    if (!user) return json({ error: "Unauthorized" }, 401);

    const body = await readJson(request);
    const students = Array.isArray(body && body.students) ? body.students : [];
    const classCode = String((body && body.classCode) || user.class_code).toUpperCase();

    if (!students.length) {
      return json({ error: "Tidak ada data siswa." }, 400);
    }

    for (const s of students) {
      const nisn = String(s && s.nisn ? s.nisn : "").trim();
      const name = String(s && s.name ? s.name : "").trim();
      const number = s && s.number !== undefined && s.number !== null && String(s.number).trim() !== "" ? Number(s.number) : null;
      if (!nisn || !name) continue;

      await env.DB.prepare(`
        INSERT INTO students (class_code, nisn, name, number)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(nisn) DO UPDATE SET
          class_code = excluded.class_code,
          name = excluded.name,
          number = excluded.number
      `).bind(classCode, nisn, name, number).run();
    }

    return json({ ok: true });
  }

  if (pathname === "/api/attendance" && request.method === "GET") {
    const user = await requireUser(request, env);
    if (!user) return json({ error: "Unauthorized" }, 401);

    const url = new URL(request.url);
    const date = String(url.searchParams.get("date") || "").trim();
    const classCode = String(url.searchParams.get("classCode") || user.class_code).toUpperCase();

    if (!date) return json({ error: "Tanggal wajib diisi." }, 400);

    const rows = await env.DB.prepare(`
      SELECT student_id, status
      FROM attendance
      WHERE class_code = ? AND attendance_date = ?
    `).bind(classCode, date).all();

    const map = {};
    for (const row of rows.results || []) {
      map[String(row.student_id)] = row.status;
    }

    return json({ attendance: map });
  }

  if (pathname === "/api/attendance" && request.method === "POST") {
    const user = await requireUser(request, env);
    if (!user) return json({ error: "Unauthorized" }, 401);

    const body = await readJson(request);
    const classCode = String((body && body.classCode) || user.class_code).toUpperCase();
    const date = String(body && body.date ? body.date : "").trim();
    const studentId = Number(body && body.studentId);
    const status = String(body && body.status ? body.status : "").trim().toUpperCase();

    if (!date || !studentId || !["H", "S", "I", "A"].includes(status)) {
      return json({ error: "Data absensi tidak valid." }, 400);
    }

    await env.DB.prepare(`
      INSERT INTO attendance (class_code, attendance_date, student_id, status)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(class_code, attendance_date, student_id) DO UPDATE SET
        status = excluded.status,
        updated_at = CURRENT_TIMESTAMP
    `).bind(classCode, date, studentId, status).run();

    return json({ ok: true });
  }

  if (pathname === "/api/attendance" && request.method === "DELETE") {
    const user = await requireUser(request, env);
    if (!user) return json({ error: "Unauthorized" }, 401);

    const body = await readJson(request);
    const classCode = String((body && body.classCode) || user.class_code).toUpperCase();
    const date = String(body && body.date ? body.date : "").trim();

    if (!date) return json({ error: "Tanggal wajib diisi." }, 400);

    await env.DB.prepare(`
      DELETE FROM attendance
      WHERE class_code = ? AND attendance_date = ?
    `).bind(classCode, date).run();

    return json({ ok: true });
  }

  return null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      const res = await handleApi(request, env, url.pathname);
      return res || json({ error: "Not found" }, 404);
    }
    return new Response(HTML, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  },
};
