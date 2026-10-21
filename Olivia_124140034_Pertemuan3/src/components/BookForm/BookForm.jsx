import { useState } from 'react'
import PropTypes from 'prop-types'
import { BOOK_STATUS } from '../../constants/bookStatus'
import { bookShape } from '../../constants/bookShape'
import { validateBook } from '../../utils/validateBook'
import './BookForm.css'

const EMPTY_FORM = { title: '', author: '', status: 'milik' }

/**
 * Form tambah / edit buku.
 * Jika `initialBook` diberikan, form masuk mode edit dan terisi data buku tsb.
 * Pemanggil sebaiknya memberi `key` berbeda per buku agar state form ter-reset
 * saat berpindah antara mode tambah / edit.
 */
function BookForm({ initialBook, onSubmit, onCancel }) {
  const [values, setValues] = useState(
    initialBook
      ? { title: initialBook.title, author: initialBook.author, status: initialBook.status }
      : EMPTY_FORM,
  )
  const [errors, setErrors] = useState({})
  const isEditing = Boolean(initialBook)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    // Hapus pesan error field ini begitu pengguna mulai memperbaiki
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateBook(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    onSubmit(values)
    if (!isEditing) setValues(EMPTY_FORM)
  }

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2 className="book-form__heading">{isEditing ? 'Edit Buku' : 'Tambah Buku'}</h2>

      <div className="book-form__field">
        <label htmlFor="title">Judul</label>
        <input
          id="title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          className={errors.title ? 'input--error' : ''}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <span id="title-error" className="book-form__error" role="alert">
            {errors.title}
          </span>
        )}
      </div>

      <div className="book-form__field">
        <label htmlFor="author">Penulis</label>
        <input
          id="author"
          name="author"
          type="text"
          value={values.author}
          onChange={handleChange}
          className={errors.author ? 'input--error' : ''}
          aria-invalid={Boolean(errors.author)}
          aria-describedby={errors.author ? 'author-error' : undefined}
        />
        {errors.author && (
          <span id="author-error" className="book-form__error" role="alert">
            {errors.author}
          </span>
        )}
      </div>

      <div className="book-form__field">
        <label htmlFor="status">Status</label>
        <select id="status" name="status" value={values.status} onChange={handleChange}>
          {BOOK_STATUS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="book-form__actions">
        <button type="submit" className="btn btn--primary">
          {isEditing ? 'Simpan Perubahan' : 'Tambah'}
        </button>
        {isEditing && (
          <button type="button" className="btn" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  )
}

BookForm.propTypes = {
  initialBook: bookShape,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
}

export default BookForm
