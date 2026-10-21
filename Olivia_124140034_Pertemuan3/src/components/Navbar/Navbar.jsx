import { NavLink } from 'react-router-dom'
import './Navbar.css'

// Navigasi antar halaman (React Router)
function Navbar() {
  return (
    <header className="navbar">
      <span className="navbar__brand">Manajemen Buku</span>
      <nav className="navbar__links">
        <NavLink to="/" end>
          Beranda
        </NavLink>
        <NavLink to="/stats">Statistik</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
