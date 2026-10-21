import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import useLocalStorage from '../hooks/useLocalStorage'
import useBookStats from '../hooks/useBookStats'

describe('useLocalStorage', () => {
  it('memakai nilai awal jika localStorage kosong', () => {
    const { result } = renderHook(() => useLocalStorage('k', ['a']))
    expect(result.current[0]).toEqual(['a'])
  })

  it('membaca nilai yang sudah tersimpan', () => {
    window.localStorage.setItem('k', JSON.stringify({ x: 1 }))
    const { result } = renderHook(() => useLocalStorage('k', null))
    expect(result.current[0]).toEqual({ x: 1 })
  })

  it('menyimpan perubahan nilai ke localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('k', 0))
    act(() => result.current[1](5))
    expect(result.current[0]).toBe(5)
    expect(JSON.parse(window.localStorage.getItem('k'))).toBe(5)
  })

  it('kembali ke nilai awal jika data tersimpan rusak', () => {
    window.localStorage.setItem('k', '{bukan json')
    const { result } = renderHook(() => useLocalStorage('k', 'default'))
    expect(result.current[0]).toBe('default')
  })
})

describe('useBookStats', () => {
  const books = [
    { id: '1', title: 'A', author: 'Budi', status: 'milik' },
    { id: '2', title: 'B', author: 'budi', status: 'baca' },
    { id: '3', title: 'C', author: 'Sari', status: 'milik' },
    { id: '4', title: 'D', author: 'Dewi', status: 'beli' },
  ]

  it('menghitung total, jumlah per status, persentase, dan penulis unik', () => {
    const { result } = renderHook(() => useBookStats(books))
    const { total, byStatus, uniqueAuthors } = result.current
    expect(total).toBe(4)
    expect(uniqueAuthors).toBe(3)
    expect(byStatus.find((s) => s.value === 'milik')).toMatchObject({ count: 2, percentage: 50 })
    expect(byStatus.find((s) => s.value === 'baca')).toMatchObject({ count: 1, percentage: 25 })
    expect(byStatus.find((s) => s.value === 'beli')).toMatchObject({ count: 1, percentage: 25 })
  })

  it('tidak error (persentase 0) ketika daftar buku kosong', () => {
    const { result } = renderHook(() => useBookStats([]))
    expect(result.current.total).toBe(0)
    expect(result.current.byStatus.every((s) => s.percentage === 0)).toBe(true)
  })
})
