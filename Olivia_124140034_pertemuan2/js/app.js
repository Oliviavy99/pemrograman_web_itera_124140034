import { TaskItem, STORAGE_KEY, localDate, escapeHtml } from './models.js';

const getElement = (selector) => document.querySelector(selector);

const formatDate = (value) => {
  return new Date(`${value}T12:00:00`).toLocaleDateString('id-ID');
};

// Data API tidak memiliki mata kuliah dan tenggat, jadi diberi nilai awal.
const createSampleTask = ({ id, title, completed }) => {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error('ID dari API tidak valid.');
  }

  return new TaskItem({
    id: `jsonplaceholder-${id}`,
    title,
    completed,
    course: 'Tugas Simulasi',
    deadline: localDate(),
  });
};

export class DashboardApp {
  constructor() {
    this.tasks = [];
    this.storageHealthy = true;
    this.form = getElement('#task-form');

    this.loadTasks();
    this.bindEvents();
    this.render();
  }

  loadTasks() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

      if (!Array.isArray(data)) {
        throw new Error('Data bukan daftar tugas.');
      }

      const tasks = data.map((item) => new TaskItem(item));
      const ids = tasks.map((task) => task.id);

      if (new Set(ids).size !== ids.length) {
        throw new Error('ID tugas duplikat.');
      }

      this.tasks = tasks;
    } catch (error) {
      // Data lama yang rusak tidak ditimpa; aplikasi masih bisa dipakai di memori.
      this.storageHealthy = false;
      getElement('#storage-warning').hidden = false;
      getElement('#storage-warning').textContent = 'Data lokal tidak bisa dibaca. Perubahan sesi ini tidak akan tersimpan.';
      console.warn(error);
    }
  }

  updateTasks(tasks, message) {
    this.tasks = tasks;

    try {
      if (!this.storageHealthy) {
        throw new Error('Data lokal bermasalah.');
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (error) {
      message += ' Perubahan belum tersimpan, jangan muat ulang halaman.';
      console.warn(error);
    }

    this.render();
    getElement('#message').textContent = message;
  }

  bindEvents() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submitTask();
    });

    getElement('#cancel-edit').addEventListener('click', () => this.resetForm());
    getElement('#load-samples').addEventListener('click', () => this.loadSampleTasks());

    // Satu listener menangani semua tombol dan checkbox pada daftar tugas.
    getElement('#task-list').addEventListener('click', (event) => {
      const control = event.target.closest('[data-action]');

      if (control) {
        this.handleAction(control.dataset);
      }
    });
  }

  submitTask() {
    try {
      const fields = this.form.elements;
      const id = fields.id.value;
      const input = {
        title: fields.title.value,
        course: fields.course.value,
        deadline: fields.deadline.value,
        priority: fields.priority.value,
      };

      if (id) {
        const existing = this.tasks.find((task) => task.id === id);

        if (!existing) {
          throw new Error('Tugas tidak ditemukan. Silakan batalkan edit.');
        }

        const edited = existing.withChanges(input);
        const tasks = this.tasks.map((task) => task.id === id ? edited : task);
        this.updateTasks(tasks, 'Tugas berhasil diperbarui.');
      } else {
        const task = new TaskItem(input);
        this.updateTasks([...this.tasks, task], 'Tugas berhasil ditambahkan.');
      }

      this.resetForm();
    } catch (error) {
      getElement('#message').textContent = error.message;
    }
  }

  handleAction({ action, id }) {
    const task = this.tasks.find((item) => item.id === id);

    if (!task) {
      return;
    }

    if (action === 'edit') {
      const fields = this.form.elements;
      fields.id.value = task.id;
      fields.title.value = task.title;
      fields.course.value = task.course;
      fields.deadline.value = task.deadline;
      fields.priority.value = task.priority;

      getElement('#form-title').textContent = 'Edit tugas';
      getElement('#cancel-edit').hidden = false;
      this.form.querySelector('[type="submit"]').textContent = 'Simpan perubahan';
      fields.title.focus();
    } else if (action === 'toggle') {
      const edited = task.withChanges({ completed: !task.completed });
      const tasks = this.tasks.map((item) => item.id === id ? edited : item);
      this.updateTasks(tasks, 'Status tugas diperbarui.');
    } else if (action === 'delete' && window.confirm(`Hapus tugas "${task.title}"?`)) {
      const tasks = this.tasks.filter((item) => item.id !== id);
      this.updateTasks(tasks, 'Tugas berhasil dihapus.');

      if (this.form.elements.id.value === id) {
        this.resetForm();
      }
    }
  }

  resetForm() {
    this.form.reset();
    this.form.elements.id.value = '';
    getElement('#form-title').textContent = 'Tambah tugas';
    getElement('#cancel-edit').hidden = true;
    this.form.querySelector('[type="submit"]').textContent = 'Tambah tugas';
  }

  render() {
    const done = this.tasks.filter((task) => task.completed).length;
    let summary = '0 tugas, 0 sudah selesai.';

    if (this.tasks.length > 0) {
      summary = `${this.tasks.length} tugas, ${done} sudah selesai.`;
    }

    getElement('#task-count').textContent = summary;
    getElement('#empty-state').hidden = this.tasks.length > 0;

    // Template literals membuat kartu dari data; input pengguna di-escape dahulu.
    getElement('#task-list').innerHTML = this.tasks.map((task) => {
      const { id, title, course, deadline, priority, completed } = task;

      return `
        <article class="task-card ${completed ? 'task-completed' : ''}">
          <div class="task-heading">
            <input type="checkbox" data-action="toggle" data-id="${escapeHtml(id)}"
              aria-label="${escapeHtml(`Ubah status ${title}`)}" ${completed ? 'checked' : ''}>
            <div>
              <h3 class="task-title">${escapeHtml(title)}</h3>
              <p class="task-meta">${escapeHtml(course)} · ${formatDate(deadline)} · ${priority}</p>
              <p>${completed ? 'Selesai' : 'Belum selesai'}</p>
            </div>
          </div>
          <div class="task-actions">
            <button type="button" data-action="edit" data-id="${escapeHtml(id)}">Edit</button>
            <button type="button" data-action="delete" data-id="${escapeHtml(id)}">Hapus</button>
          </div>
        </article>
      `;
    }).join('');
  }

  async loadSampleTasks() {
    const button = getElement('#load-samples');
    const status = getElement('#sample-status');

    if (button.disabled) {
      return;
    }

    button.disabled = true;
    status.textContent = 'Memuat tugas simulasi…';

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error('Permintaan API gagal.');
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Format respons API salah.');
      }

      const samples = data.map((item) => createSampleTask(item));
      const newTasks = samples.filter((sample) => {
        return !this.tasks.some((task) => task.id === sample.id);
      });

      this.updateTasks([...this.tasks, ...newTasks], 'Data simulasi selesai dimuat.');
      status.textContent = `${newTasks.length} tugas simulasi baru ditambahkan.`;
    } catch (error) {
      status.textContent = 'Gagal memuat tugas simulasi. Periksa koneksi dan coba lagi.';
      console.warn(error);
    } finally {
      clearTimeout(timer);
      button.disabled = false;
    }
  }
}

new DashboardApp();
