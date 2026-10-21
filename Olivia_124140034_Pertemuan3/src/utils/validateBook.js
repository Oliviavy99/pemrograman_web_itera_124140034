// Validasi kolom wajib isi; mengembalikan objek { namaField: pesanError }
export function validateBook({ title, author, status }) {
  const errors = {}
  if (!title.trim()) errors.title = 'Judul wajib diisi'
  if (!author.trim()) errors.author = 'Penulis wajib diisi'
  if (!status) errors.status = 'Status wajib dipilih'
  return errors
}
