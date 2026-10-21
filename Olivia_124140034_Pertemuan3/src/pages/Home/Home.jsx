import { useState } from 'react'
import BookForm from '../../components/BookForm/BookForm'
import BookFilter from '../../components/BookFilter/BookFilter'
import BookList from '../../components/BookList/BookList'
import useBooks from '../../hooks/useBooks'
import './Home.css'

// Halaman utama: form tambah/edit, filter + pencarian, dan daftar buku
function Home() {
  const {
    books,
    filteredBooks,
    statusFilter,
    searchQuery,
    setStatusFilter,
    setSearchQuery,
    addBook,
    updateBook,
    deleteBook,
  } = useBooks()

  // Buku yang sedang diedit (null = form dalam mode tambah)
  const [editingBook, setEditingBook] = useState(null)

  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data)
      setEditingBook(null)
    } else {
      addBook(data)
    }
  }

  const handleDelete = (book) => {
    if (!window.confirm(`Hapus buku "${book.title}"?`)) return
    deleteBook(book.id)
    if (editingBook?.id === book.id) setEditingBook(null)
  }

  const emptyMessage =
    books.length === 0
      ? 'Belum ada buku. Tambahkan buku pertama Anda!'
      : 'Tidak ada buku yang cocok dengan filter/pencarian.'

  return (
    <div className="home">
      <BookForm
        key={editingBook?.id ?? 'new'}
        initialBook={editingBook}
        onSubmit={handleSubmit}
        onCancel={() => setEditingBook(null)}
      />
      <BookFilter
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <BookList
        books={filteredBooks}
        onEdit={setEditingBook}
        onDelete={handleDelete}
        emptyMessage={emptyMessage}
      />
    </div>
  )
}

export default Home
