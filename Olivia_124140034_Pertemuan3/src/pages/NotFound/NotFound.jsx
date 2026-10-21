import { Link } from 'react-router-dom'

// Halaman fallback untuk URL yang tidak dikenal
function NotFound() {
  return (
    <section>
      <h2>Halaman tidak ditemukan</h2>
      <Link to="/">Kembali ke beranda</Link>
    </section>
  )
}

export default NotFound
