import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('jwt_token')
    navigate('/login', { replace: true })
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-container">

        <Link
          to="/home"
          className="logo"
          onClick={closeMenu}
        >
          Movies App
        </Link>

        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        <nav
          className={`nav-links ${
            menuOpen ? 'nav-open' : ''
          }`}
        >
          <Link
            to="/home"
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/popular"
            onClick={closeMenu}
          >
            Popular
          </Link>

          <Link
            to="/search"
            onClick={closeMenu}
          >
            Search
          </Link>

          <Link
            to="/account"
            onClick={closeMenu}
          >
            Account
          </Link>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>

      </div>
    </header>
  )
}

export default Header