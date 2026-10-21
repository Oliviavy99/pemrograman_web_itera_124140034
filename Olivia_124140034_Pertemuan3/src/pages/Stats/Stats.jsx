import useBooks from '../../hooks/useBooks'
import useBookStats from '../../hooks/useBookStats'
import './Stats.css'

// Halaman statistik koleksi buku (memakai custom hook useBookStats)
function Stats() {
  const { books } = useBooks()
  const { total, byStatus, uniqueAuthors } = useBookStats(books)

  return (
    <section className="stats">
      <h2>Statistik Koleksi</h2>

      <div className="stats__summary">
        <div className="stats__card">
          <span className="stats__number" data-testid="stat-total">
            {total}
          </span>
          <span>Total Buku</span>
        </div>
        <div className="stats__card">
          <span className="stats__number" data-testid="stat-authors">
            {uniqueAuthors}
          </span>
          <span>Penulis</span>
        </div>
      </div>

      <ul className="stats__list">
        {byStatus.map(({ value, label, count, percentage }) => (
          <li key={value} className="stats__row">
            <div className="stats__row-head">
              <span>{label}</span>
              <span data-testid={`stat-${value}`}>
                {count} ({percentage}%)
              </span>
            </div>
            <div className="stats__bar">
              <div
                className={`stats__bar-fill stats__bar-fill--${value}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Stats
