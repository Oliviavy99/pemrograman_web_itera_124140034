import PropTypes from 'prop-types'
import { STATUS_VALUES, getStatusLabel } from '../../constants/bookStatus'
import './StatusBadge.css'

// Label kecil berwarna untuk menampilkan status buku
function StatusBadge({ status }) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      {getStatusLabel(status)}
    </span>
  )
}

StatusBadge.propTypes = {
  status: PropTypes.oneOf(STATUS_VALUES).isRequired,
}

export default StatusBadge
