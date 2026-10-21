// Daftar status buku yang valid beserta label yang ditampilkan di UI
export const BOOK_STATUS = [
  { value: 'milik', label: 'Milik' },
  { value: 'baca', label: 'Sedang Dibaca' },
  { value: 'beli', label: 'Ingin Dibeli' },
]

export const STATUS_VALUES = BOOK_STATUS.map((s) => s.value)

export function getStatusLabel(value) {
  return BOOK_STATUS.find((s) => s.value === value)?.label ?? value
}
