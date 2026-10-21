import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import BookList from '../components/BookList/BookList'
import BookFilter from '../components/BookFilter/BookFilter'

const books = [
  { id: '1', title: 'Bumi', author: 'Tere Liye', status: 'baca' },
  { id: '2', title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' },
]

describe('<BookList />', () => {
  it('menampilkan semua buku beserta status-nya', () => {
    render(<BookList books={books} onEdit={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('Bumi')).toBeInTheDocument()
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument()
    expect(screen.getByText('Sedang Dibaca')).toBeInTheDocument()
    expect(screen.getByText('Milik')).toBeInTheDocument()
  })

  it('menampilkan pesan kosong jika tidak ada buku', () => {
    render(<BookList books={[]} onEdit={vi.fn()} onDelete={vi.fn()} emptyMessage="Kosong nih" />)
    expect(screen.getByText('Kosong nih')).toBeInTheDocument()
  })

  it('memanggil onEdit dan onDelete dengan buku yang dipilih', async () => {
    const onEdit = vi.fn()
    const onDelete = vi.fn()
    render(<BookList books={books} onEdit={onEdit} onDelete={onDelete} />)

    await userEvent.click(screen.getByRole('button', { name: 'Edit Bumi' }))
    await userEvent.click(screen.getByRole('button', { name: 'Hapus Bumi' }))

    expect(onEdit).toHaveBeenCalledWith(books[0])
    expect(onDelete).toHaveBeenCalledWith(books[0])
  })
})

describe('<BookFilter />', () => {
  it('memanggil onStatusChange saat tombol filter diklik', async () => {
    const onStatusChange = vi.fn()
    render(
      <BookFilter
        statusFilter="semua"
        onStatusChange={onStatusChange}
        searchQuery=""
        onSearchChange={vi.fn()}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Ingin Dibeli' }))
    expect(onStatusChange).toHaveBeenCalledWith('beli')
    expect(screen.getByRole('button', { name: 'Semua' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('memanggil onSearchChange saat mengetik di kotak pencarian', async () => {
    const onSearchChange = vi.fn()
    render(
      <BookFilter
        statusFilter="semua"
        onStatusChange={vi.fn()}
        searchQuery=""
        onSearchChange={onSearchChange}
      />,
    )
    await userEvent.type(screen.getByLabelText('Cari buku'), 'a')
    expect(onSearchChange).toHaveBeenCalledWith('a')
  })
})
