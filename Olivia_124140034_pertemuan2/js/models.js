export const STORAGE_KEY = 'olivia.dashboard.tasks.v1';

// Gunakan tanggal lokal agar tenggat tidak bergeser karena zona waktu.
export const localDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const isValidDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T12:00:00`);
  return !Number.isNaN(date.getTime()) && localDate(date) === value;
};

// Setiap tugas disimpan sebagai satu objek TaskItem.
export class TaskItem {
  constructor({
    id = crypto.randomUUID(),
    title,
    course,
    deadline,
    priority = 'sedang',
    completed = false,
    createdAt = new Date().toISOString(),
  } = {}) {
    if (typeof id !== 'string' || !id.trim()) {
      throw new Error('ID tugas tidak valid.');
    }

    if (typeof title !== 'string' || !title.trim() || title.trim().length > 100) {
      throw new Error('Judul wajib diisi, maksimal 100 karakter.');
    }

    if (typeof course !== 'string' || !course.trim() || course.trim().length > 60) {
      throw new Error('Mata kuliah wajib diisi, maksimal 60 karakter.');
    }

    if (!isValidDate(deadline)) {
      throw new Error('Tanggal tenggat tidak valid.');
    }

    if (!['rendah', 'sedang', 'tinggi'].includes(priority)) {
      throw new Error('Prioritas tidak valid.');
    }

    if (typeof completed !== 'boolean') {
      throw new Error('Status tugas tidak valid.');
    }

    this.id = id;
    this.title = title.trim();
    this.course = course.trim();
    this.deadline = deadline;
    this.priority = priority;
    this.completed = completed;
    this.createdAt = createdAt;
  }

  withChanges(changes) {
    return new TaskItem({ ...this, ...changes, id: this.id, createdAt: this.createdAt });
  }
}

// Teks pengguna diubah menjadi teks aman sebelum dimasukkan ke HTML.
export const escapeHtml = (value) => {
  const characters = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return String(value).replace(/[&<>"']/g, (character) => characters[character]);
};
