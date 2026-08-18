import type { Book } from '../types';

interface BookCardProps {
  book: Book;
  onToggleSave: (book: Book) => void;
}

export const BookCard = ({ book, onToggleSave }: BookCardProps) => {
  const isSaved = book.status === 'read';

  return (
    <div className={`book-card ${isSaved ? 'saved' : ''}`}>
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

      <div className="card-footer-actions">
        <button
          type="button"
          className={`book-action-btn ${isSaved ? 'remove' : 'add'}`}
          onClick={() => onToggleSave(book)}
        >
          {isSaved ? 'Remove from Shelf' : '+ Add to My Books'}
        </button>
      </div>
    </div>
  );
};