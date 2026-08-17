import type { Book } from '../types';

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => (
  <div className="book-card">
    <h3>{book.title}</h3>
    <p>{book.author} ({book.year})</p>
    <span className={`badge ${book.status}`}>{book.status}</span>
  </div>
);
