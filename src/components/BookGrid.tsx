import type { Book } from '../types';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: Book[];
  loading: boolean;
  error: string | null;
  onToggleSave: (book: Book) => void;
}

export const BookGrid = ({ books, loading, error, onToggleSave }: BookGridProps) => {
  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="error">{error}</p>;
  if (books.length === 0) return <p>No books found.</p>;

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onToggleSave={onToggleSave} />
      ))}
    </div>
  );
};