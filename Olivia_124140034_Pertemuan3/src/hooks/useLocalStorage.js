import { useEffect, useState } from 'react'

/**
 * Custom hook: state yang otomatis tersinkron dengan localStorage.
 * - Nilai awal dibaca dari localStorage (lazy initializer, hanya sekali).
 * - Jika data rusak / tidak bisa di-parse, dipakai initialValue.
 * - Setiap perubahan nilai ditulis kembali lewat useEffect.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Abaikan error (mis. storage penuh / mode privat) agar aplikasi tetap jalan
    }
  }, [key, value])

  return [value, setValue]
}
