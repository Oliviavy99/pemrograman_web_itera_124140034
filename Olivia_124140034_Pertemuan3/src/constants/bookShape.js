import PropTypes from 'prop-types'
import { STATUS_VALUES } from './bookStatus'

// Bentuk objek buku, dipakai ulang untuk PropTypes di banyak komponen
export const bookShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  status: PropTypes.oneOf(STATUS_VALUES).isRequired,
})
