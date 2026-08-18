import type { Book, ReadingStatus } from '../types';

interface BookCardProps {
  book: Book;
  activeTab: 'home' | 'my-books';
  onToggleSave: (book: Book) => void;
  onUpdateStatus?: (id: string, status: ReadingStatus) => void;
  onUpdatePages?: (id: string, pagesRead: number) => void;
}

export const BookCard = ({
  book,
  activeTab,
  onToggleSave,
  onUpdateStatus,
  onUpdatePages,
}: BookCardProps) => {
  const isSaved = Boolean(book.readingStatus);
  const totalPages = book.totalPages || 300;
  const pagesRead = book.pagesRead || 0;
  const progressPercent = Math.min(
    100,
    Math.round((pagesRead / totalPages) * 100)
  );

  return (
    <div className={`book-card ${isSaved && activeTab === 'my-books' ? 'saved' : ''}`}>
      <div className="card-top-bar">
        <div className="card-header-badge">
          <div className="badge-icon">📖</div>
          <span className="badge-label">BOOK</span>
        </div>
        <button
          type="button"
          className={`bookmark-btn ${isSaved ? 'active' : ''}`}
          onClick={() => onToggleSave(book)}
          title={isSaved ? 'Remove from shelf' : 'Save to shelf'}
        >
          {isSaved ? '★ Saved' : '☆ Save'}
        </button>
      </div>

      <img src={book.coverUrl} alt={book.title} loading="lazy" />
      <h3>{book.title}</h3>
      <p>{book.author} {book.year > 0 ? `(${book.year})` : ''}</p>

      {/* Render status controls and progress tracking ONLY on the My Books tab */}
      {isSaved && activeTab === 'my-books' && (
        <div className="card-status-container">
          <label htmlFor={`status-select-${book.id}`} className="status-label">
            Reading Status:
          </label>
          <select
            id={`status-select-${book.id}`}
            className="status-dropdown"
            value={book.readingStatus}
            onChange={(e) =>
              onUpdateStatus?.(book.id, e.target.value as ReadingStatus)
            }
          >
            <option value="want-to-read">Want to Read</option>
            <option value="currently-reading">Currently Reading</option>
            <option value="finished">Finished</option>
          </select>

          {book.readingStatus === 'currently-reading' && (
            <div className="progress-section">
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="progress-controls">
                <input
                  type="number"
                  min={0}
                  max={totalPages}
                  value={pagesRead}
                  onChange={(e) =>
                    onUpdatePages?.(book.id, Number(e.target.value))
                  }
                  className="pages-input"
                />
                <span className="pages-total">/ {totalPages} pages ({progressPercent}%)</span>
              </div>
            </div>
          )}

          <button
            type="button"
            className="book-action-btn remove"
            onClick={() => onToggleSave(book)}
          >
            Remove from Shelf
          </button>
        </div>
      )}
    </div>
  );
};