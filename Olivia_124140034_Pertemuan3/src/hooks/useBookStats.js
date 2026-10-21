import { useMemo } from 'react'
import { BOOK_STATUS } from '../constants/bookStatus'

/**
 * Custom hook: menghitung statistik dari daftar buku.
 * Mengembalikan total, jumlah & persentase per status, serta jumlah penulis unik.
 */
export default function useBookStats(books) {
  return useMemo(() => {
    const total = books.length

    const byStatus = BOOK_STATUS.map(({ value, label }) => {
      const count = books.filter((b) => b.status === value).length
      return {
        value,
        label,
        count,
        percentage: total === 0 ? 0 : Math.round((count / total) * 100),
      }
    })

    const authors = new Set(books.map((b) => b.author.trim().toLowerCase()))

    return { total, byStatus, uniqueAuthors: authors.size }
  }, [books])
}
