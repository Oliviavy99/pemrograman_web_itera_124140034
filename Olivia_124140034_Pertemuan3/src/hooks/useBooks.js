import { useContext } from 'react'
import { BookContext } from '../context/contextObject'

// Custom hook untuk mengakses BookContext dengan pengecekan Provider
export default function useBooks() {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error('useBooks harus dipakai di dalam <BookProvider>')
  }
  return context
}
