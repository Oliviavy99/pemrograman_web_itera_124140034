import PropTypes from 'prop-types'
import { BOOK_STATUS } from '../../constants/bookStatus'
import './BookFilter.css'

const FILTER_OPTIONS = [{ value: 'semua', label: 'Semua' }, ...BOOK_STATUS]

// Kotak pencarian + tombol filter status
function BookFilter({ statusFilter, onStatusChange, searchQuery, onSearchChange }) {
  return (
    <div className="book-filter">
      <input
        type="search"
        className="book-filter__search"
        placeholder="Cari judul atau penulis..."
        aria-label="Cari buku"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="book-filter__tabs" role="group" aria-label="Filter status">
        {FILTER_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`btn btn--small ${statusFilter === value ? 'btn--primary' : ''}`}
            aria-pressed={statusFilter === value}
            onClick={() => onStatusChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

BookFilter.propTypes = {
  statusFilter: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}

export default BookFilter
