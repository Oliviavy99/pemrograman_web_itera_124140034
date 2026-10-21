import PropTypes from 'prop-types'
import BookItem from '../BookItem/BookItem'
import { bookShape } from '../../constants/bookShape'
import './BookList.css'

// Daftar buku; menampilkan pesan kosong jika tidak ada data
function BookList({ books, onEdit, onDelete, emptyMessage = 'Belum ada buku.' }) {
  if (books.length === 0) {
    return <p className="book-list__empty">{emptyMessage}</p>
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}

BookList.propTypes = {
  books: PropTypes.arrayOf(bookShape).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string,
}


export default BookList
