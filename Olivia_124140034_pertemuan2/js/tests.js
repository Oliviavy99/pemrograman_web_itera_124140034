import { TaskItem, STORAGE_KEY, localDate, isValidDate, escapeHtml } from './models.js';

const results = [];
const output = document.querySelector('#test-results');

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const test = (name, run) => {
  try {
    run();
    results.push(`PASS ${name}`);
  } catch (error) {
    results.push(`FAIL ${name}: ${error.message}`);
  }

  output.textContent = results.join('\n');
};

const fixture = {
  id: 'tugas-1',
  title: 'Tugas PAW',
  course: 'Pengembangan Aplikasi Web',
  deadline: localDate(),
  priority: 'sedang',
};

test('Validasi tanggal', () => {
  assert(isValidDate('2024-02-29') && !isValidDate('2026-02-29'), 'Tahun kabisat salah');
});

test('Validasi judul kosong', () => {
  let rejected = false;

  try {
    new TaskItem({ ...fixture, title: '   ' });
  } catch {
    rejected = true;
  }

  assert(rejected, 'Judul kosong diterima');
});

test('Edit menghasilkan objek baru dengan ID tetap', () => {
  const task = new TaskItem(fixture);
  const edited = task.withChanges({ title: 'Revisi', id: 'lain' });

  assert(task.title === 'Tugas PAW' && edited.title === 'Revisi', 'Objek lama berubah');
  assert(edited.id === task.id, 'ID ikut berubah');
});

test('Input HTML diubah menjadi teks aman', () => {
  assert(escapeHtml('<img>') === '&lt;img&gt;', 'HTML tidak di-escape');
});

// Tes antarmuka dijalankan pada iframe, bukan pada data aplikasi utama.
const frame = document.createElement('iframe');
frame.title = 'Dashboard yang diuji';
frame.style.cssText = 'width:100%;height:800px;border:1px solid #ccc';
document.querySelector('#test-frame').append(frame);

let navigation = 0;
let storage;
let backup;
let win;
let doc;

const openFrame = () => new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('Halaman gagal dimuat')), 8000);

  frame.onload = () => {
    clearTimeout(timer);
    win = frame.contentWindow;
    doc = frame.contentDocument;
    storage = win.localStorage;
    win.confirm = () => true;
    resolve();
  };

  navigation += 1;
  frame.src = `./index.html?test=${navigation}`;
});

const q = (selector) => doc.querySelector(selector);

const submit = (values = {}) => {
  const form = q('#task-form');

  Object.entries({ ...fixture, ...values }).forEach(([key, value]) => {
    if (key !== 'id') {
      form.elements[key].value = value;
    }
  });

  form.dispatchEvent(new win.Event('submit', { bubbles: true, cancelable: true }));
};

const waitForApi = async () => {
  for (let attempt = 0; attempt < 600; attempt += 1) {
    if (!q('#load-samples').disabled) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 20));
  }

  throw new Error('Batas waktu pengujian API terlampaui');
};

try {
  await openFrame();
  backup = storage.getItem(STORAGE_KEY);
  storage.removeItem(STORAGE_KEY);
  await openFrame();

  test('Daftar awal kosong', () => {
    assert(q('#task-list').children.length === 0 && !q('#empty-state').hidden, 'State awal salah');
  });

  test('Tambah tugas dan simpan ke localStorage', () => {
    submit();
    assert(q('#task-list').children.length === 1, 'Tugas tidak tampil');
    assert(JSON.parse(storage.getItem(STORAGE_KEY)).length === 1, 'Tugas tidak tersimpan');
  });

  test('Input spasi ditolak', () => {
    submit({ title: '   ' });
    assert(q('#task-list').children.length === 1 && q('#message').textContent.includes('wajib'), 'Validasi gagal');
  });

  test('Batal edit tidak mengubah data', () => {
    q('[data-action="edit"]').click();
    q('#task-form').elements.title.value = 'Batal';
    q('#cancel-edit').click();
    assert(q('.task-title').textContent === 'Tugas PAW', 'Data berubah saat batal');
  });

  test('Edit tugas tanpa duplikasi', () => {
    q('[data-action="edit"]').click();
    submit({ title: 'Hasil revisi' });
    assert(q('.task-title').textContent === 'Hasil revisi' && q('#task-list').children.length === 1, 'Edit gagal');
  });

  test('Tandai selesai', () => {
    q('[data-action="toggle"]').click();
    assert(q('.task-completed') && q('#task-count').textContent.includes('1 sudah selesai'), 'Status tidak berubah');
  });

  await openFrame();

  test('Data dan status tetap ada setelah reload', () => {
    assert(q('.task-title').textContent === 'Hasil revisi' && q('.task-completed'), 'Data hilang');
  });

  test('Batal hapus dan konfirmasi hapus', () => {
    win.confirm = () => false;
    q('[data-action="delete"]').click();
    assert(q('#task-list').children.length === 1, 'Batal hapus diabaikan');

    win.confirm = () => true;
    q('[data-action="delete"]').click();
    assert(q('#task-list').children.length === 0, 'Hapus gagal');
  });

  test('Judul HTML tidak dijalankan browser', () => {
    submit({ title: '<img src=x onerror=alert(1)>' });
    assert(!q('#task-list img') && q('.task-title').textContent.startsWith('<img'), 'Injeksi HTML');
  });

  const samples = [1, 2, 3, 4, 5].map((id) => ({
    id,
    title: `Contoh tugas ${id}`,
    completed: id === 2,
  }));

  let requestedUrl;
  win.fetch = async (url) => {
    requestedUrl = url;
    return { ok: true, json: async () => samples };
  };

  q('#load-samples').click();

  test('Tombol terkunci saat loading', () => {
    assert(q('#load-samples').disabled, 'Loading tidak aktif');
  });

  await waitForApi();

  test('JSONPlaceholder menambah 5 contoh tanpa menghapus tugas pribadi', () => {
    assert(requestedUrl === 'https://jsonplaceholder.typicode.com/todos?_limit=5', 'URL salah');
    assert(q('#task-list').children.length === 6, 'Jumlah tugas salah');
    assert(JSON.parse(storage.getItem(STORAGE_KEY)).find((task) => task.id === 'jsonplaceholder-2').completed, 'Status API hilang');
  });

  const editSample = [...doc.querySelectorAll('[data-action="edit"]')]
    .find((button) => button.dataset.id === 'jsonplaceholder-1');

  editSample.click();
  submit({ title: 'Contoh yang sudah diedit' });
  q('#load-samples').click();
  await waitForApi();

  test('Muat ulang tidak menggandakan atau menimpa hasil edit', () => {
    const saved = JSON.parse(storage.getItem(STORAGE_KEY));
    assert(saved.length === 6, 'Ada duplikasi');
    assert(saved.find((task) => task.id === 'jsonplaceholder-1').title === 'Contoh yang sudah diedit', 'Edit ditimpa');
  });

  win.fetch = async () => { throw new Error('Offline'); };
  q('#load-samples').click();
  await waitForApi();

  test('Kegagalan API tidak merusak tugas', () => {
    assert(q('#sample-status').textContent.includes('Gagal'), 'Error tidak tampil');
    assert(q('#task-list').children.length === 6, 'Data lama berubah');
  });

  test('Layout tidak overflow pada empat ukuran layar', () => {
    [320, 390, 768, 1440].forEach((width) => {
      frame.style.width = `${width}px`;
      assert(doc.documentElement.scrollWidth <= win.innerWidth, `Overflow pada ${width}px`);
    });
  });

  storage.setItem(STORAGE_KEY, '{rusak');
  await openFrame();

  test('Data rusak tidak ditimpa', () => {
    submit();
    assert(!q('#storage-warning').hidden && storage.getItem(STORAGE_KEY) === '{rusak', 'Data rusak ditimpa');
  });
} catch (error) {
  results.push(`FAIL Pengujian antarmuka: ${error.message}`);
} finally {
  // Kembalikan data pengguna setelah pengujian selesai.
  if (storage && backup !== undefined) {
    if (backup === null) {
      storage.removeItem(STORAGE_KEY);
    } else {
      storage.setItem(STORAGE_KEY, backup);
    }
  }
}

const failures = results.filter((line) => line.startsWith('FAIL')).length;
output.textContent = `${results.join('\n')}\n\n${results.length - failures}/${results.length} pengujian lulus.`;
output.dataset.status = failures ? 'failed' : 'passed';
document.title = failures ? 'FAIL — Dashboard' : 'PASS — Dashboard';
