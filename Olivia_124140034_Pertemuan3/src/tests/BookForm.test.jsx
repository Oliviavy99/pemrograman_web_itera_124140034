import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import BookForm from '../components/BookForm/BookForm'
import { validateBook } from '../utils/validateBook'

describe('validateBook', () => {
  it('mengembalikan error untuk judul & penulis yang kosong / hanya spasi', () => {
    const errors = validateBook({ title: '  ', author: '', status: 'milik' })
    expect(errors.title).toBeDefined()
    expect(errors.author).toBeDefined()
  })

  it('tidak mengembalikan error untuk input valid', () => {
    expect(validateBook({ title: 'A', author: 'B', status: 'baca' })).toEqual({})
  })
})

describe('<BookForm />', () => {
  it('menampilkan pesan error dan tidak submit saat kolom kosong', async () => {
    const onSubmit = vi.fn()
    render(<BookForm onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('button', { name: 'Tambah' }))

    expect(screen.getByText('Judul wajib diisi')).toBeInTheDocument()
    expect(screen.getByText('Penulis wajib diisi')).toBeInTheDocument()
    expect(screen.getByLabelText('Judul')).toHaveAttribute('aria-invalid', 'true')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('menghapus pesan error ketika pengguna mulai mengetik', async () => {
    render(<BookForm onSubmit={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: 'Tambah' }))
    await userEvent.type(screen.getByLabelText('Judul'), 'Laskar Pelangi')
    expect(screen.queryByText('Judul wajib diisi')).not.toBeInTheDocument()
  })

  it('memanggil onSubmit dengan data valid lalu mengosongkan form', async () => {
    const onSubmit = vi.fn()
    render(<BookForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText('Judul'), 'Laskar Pelangi')
    await userEvent.type(screen.getByLabelText('Penulis'), 'Andrea Hirata')
    await userEvent.selectOptions(screen.getByLabelText('Status'), 'beli')
    await userEvent.click(screen.getByRole('button', { name: 'Tambah' }))

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      status: 'beli',
    })
    expect(screen.getByLabelText('Judul')).toHaveValue('')
  })

  it('mode edit: form terisi data buku dan menampilkan tombol Batal', () => {
    const book = { id: '1', title: 'Bumi', author: 'Tere Liye', status: 'baca' }
    render(<BookForm initialBook={book} onSubmit={vi.fn()} onCancel={vi.fn()} />)

    expect(screen.getByLabelText('Judul')).toHaveValue('Bumi')
    expect(screen.getByLabelText('Penulis')).toHaveValue('Tere Liye')
    expect(screen.getByLabelText('Status')).toHaveValue('baca')
    expect(screen.getByRole('button', { name: 'Simpan Perubahan' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Batal' })).toBeInTheDocument()
  })
})
