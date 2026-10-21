import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from '../App'

const renderApp = (route = '/') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  )

async function addBook(title, author, status = 'milik') {
  await userEvent.type(screen.getByLabelText('Judul'), title)
  await userEvent.type(screen.getByLabelText('Penulis'), author)
  await userEvent.selectOptions(screen.getByLabelText('Status'), status)
  await userEvent.click(screen.getByRole('button', { name: 'Tambah' }))
}

afterEach(() => vi.restoreAllMocks())

describe('Aplikasi Manajemen Buku (integrasi)', () => {
  it('menambah buku dan menyimpannya ke localStorage', async () => {
    renderApp()
    expect(screen.getByText(/Belum ada buku/)).toBeInTheDocument()

    await addBook('Bumi', 'Tere Liye', 'baca')

    expect(screen.getByText('Bumi')).toBeInTheDocument()
    const saved = JSON.parse(window.localStorage.getItem('books'))
    expect(saved).toHaveLength(1)
    expect(saved[0]).toMatchObject({ title: 'Bumi', author: 'Tere Liye', status: 'baca' })
  })

  it('memuat buku yang sudah tersimpan di localStorage', () => {
    window.localStorage.setItem(
      'books',
      JSON.stringify([{ id: 'x', title: 'Tersimpan', author: 'Penulis', status: 'milik' }]),
    )
    renderApp()
    expect(screen.getByText('Tersimpan')).toBeInTheDocument()
  })

  it('mengedit buku', async () => {
    renderApp()
    await addBook('Judul Lama', 'Penulis A')

    await userEvent.click(screen.getByRole('button', { name: 'Edit Judul Lama' }))
    const titleInput = screen.getByLabelText('Judul')
    await userEvent.clear(titleInput)
    await userEvent.type(titleInput, 'Judul Baru')
    await userEvent.click(screen.getByRole('button', { name: 'Simpan Perubahan' }))

    expect(screen.getByText('Judul Baru')).toBeInTheDocument()
    expect(screen.queryByText('Judul Lama')).not.toBeInTheDocument()
  })

  it('menghapus buku setelah konfirmasi, dan membatalkan jika konfirmasi ditolak', async () => {
    renderApp()
    await addBook('Hapus Aku', 'Penulis A')

    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValueOnce(false)
    await userEvent.click(screen.getByRole('button', { name: 'Hapus Hapus Aku' }))
    expect(screen.getByText('Hapus Aku')).toBeInTheDocument()

    confirmSpy.mockReturnValueOnce(true)
    await userEvent.click(screen.getByRole('button', { name: 'Hapus Hapus Aku' }))
    expect(screen.queryByText('Hapus Aku')).not.toBeInTheDocument()
  })

  it('memfilter berdasarkan status', async () => {
    renderApp()
    await addBook('Buku Milik', 'A', 'milik')
    await addBook('Buku Beli', 'B', 'beli')

    const filterGroup = screen.getByRole('group', { name: 'Filter status' })
    await userEvent.click(within(filterGroup).getByRole('button', { name: 'Ingin Dibeli' }))

    expect(screen.getByText('Buku Beli')).toBeInTheDocument()
    expect(screen.queryByText('Buku Milik')).not.toBeInTheDocument()
  })

  it('mencari berdasarkan judul atau nama penulis', async () => {
    renderApp()
    await addBook('Bumi', 'Tere Liye')
    await addBook('Laskar Pelangi', 'Andrea Hirata')

    const search = screen.getByLabelText('Cari buku')
    await userEvent.type(search, 'andrea')
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument()
    expect(screen.queryByText('Bumi')).not.toBeInTheDocument()

    await userEvent.clear(search)
    await userEvent.type(search, 'bumi')
    expect(screen.getByText('Bumi')).toBeInTheDocument()
    expect(screen.queryByText('Laskar Pelangi')).not.toBeInTheDocument()
  })

  it('navigasi ke halaman Statistik menampilkan angka yang benar', async () => {
    renderApp()
    await addBook('Bumi', 'Tere Liye', 'baca')
    await addBook('Bulan', 'Tere Liye', 'milik')

    await userEvent.click(screen.getByRole('link', { name: 'Statistik' }))

    expect(screen.getByTestId('stat-total')).toHaveTextContent('2')
    expect(screen.getByTestId('stat-authors')).toHaveTextContent('1')
    expect(screen.getByTestId('stat-baca')).toHaveTextContent('1 (50%)')
  })

  it('menampilkan halaman NotFound untuk rute tidak dikenal', () => {
    renderApp('/tidak-ada')
    expect(screen.getByText('Halaman tidak ditemukan')).toBeInTheDocument()
  })
})
