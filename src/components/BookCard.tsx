import type { Book } from '../types';

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => (
  <div className="book-card">
    <div className="card-header-badge">
      <div className="badge-icon">📖</div>
      <span className="badge-label">BOOK</span>
    </div>
    <img src={book.coverUrl} alt={book.title} loading="lazy" />
    <h3>{book.title}</h3>
    <p>{book.author} {book.year > 0 ? `(${book.year})` : ''}</p>
    <span className={`badge ${book.status}`}>{book.status}</span>
  </div>
);