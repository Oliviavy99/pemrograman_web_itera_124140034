import PropTypes from 'prop-types'
import StatusBadge from '../StatusBadge/StatusBadge'
import { bookShape } from '../../constants/bookShape'
import './BookItem.css'

// Satu baris buku beserta tombol Edit dan Hapus
function BookItem({ book, onEdit, onDelete }) {
  return (
    <li className="book-item">
      <div className="book-item__info">
        <h3 className="book-item__title">{book.title}</h3>
        <p className="book-item__author">oleh {book.author}</p>
        <StatusBadge status={book.status} />
      </div>
      <div className="book-item__actions">
        <button
          type="button"
          className="btn btn--small"
          onClick={() => onEdit(book)}
          aria-label={`Edit ${book.title}`}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn--small btn--danger"
          onClick={() => onDelete(book)}
          aria-label={`Hapus ${book.title}`}
        >
          Hapus
        </button>
      </div>
    </li>
  )
}

BookItem.propTypes = {
  book: bookShape.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default BookItem
