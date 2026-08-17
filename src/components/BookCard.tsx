import type { Book } from '../types';

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => (
  <div className="book-card">
    <img src={book.coverUrl} alt={book.title} style={{ width: '100px', height: '150px' }} />
    <h3>{book.title}</h3>
    <p>{book.author} ({book.year})</p>
    <span className={`badge ${book.status}`}>{book.status}</span>
  </div>
);
