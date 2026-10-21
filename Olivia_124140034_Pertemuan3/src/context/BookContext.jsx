import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import useLocalStorage from '../hooks/useLocalStorage'
import { BookContext } from './contextObject'

const STORAGE_KEY = 'books'

// ID unik; fallback untuk lingkungan tanpa crypto.randomUUID
const createId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`

/**
 * Provider global: menyimpan daftar buku (persisten di localStorage),
 * state filter/pencarian, serta fungsi CRUD yang dipakai semua halaman.
 */
export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage(STORAGE_KEY, [])
  const [statusFilter, setStatusFilter] = useState('semua')
  const [searchQuery, setSearchQuery] = useState('')

  const addBook = useCallback(
    ({ title, author, status }) => {
      const newBook = {
        id: createId(),
        title: title.trim(),
        author: author.trim(),
        status,
      }
      setBooks((prev) => [newBook, ...prev])
    },
    [setBooks],
  )

  const updateBook = useCallback(
    (id, { title, author, status }) => {
      setBooks((prev) =>
        prev.map((b) =>
          b.id === id
            ? { ...b, title: title.trim(), author: author.trim(), status }
            : b,
        ),
      )
    },
    [setBooks],
  )

  const deleteBook = useCallback(
    (id) => setBooks((prev) => prev.filter((b) => b.id !== id)),
    [setBooks],
  )

  // Hasil filter status + pencarian (judul atau penulis, tidak peka huruf besar/kecil)
  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return books.filter((b) => {
      const matchStatus = statusFilter === 'semua' || b.status === statusFilter
      const matchQuery =
        query === '' ||
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query)
      return matchStatus && matchQuery
    })
  }, [books, statusFilter, searchQuery])

  const value = useMemo(
    () => ({
      books,
      filteredBooks,
      statusFilter,
      searchQuery,
      setStatusFilter,
      setSearchQuery,
      addBook,
      updateBook,
      deleteBook,
    }),
    [books, filteredBooks, statusFilter, searchQuery, addBook, updateBook, deleteBook],
  )

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
