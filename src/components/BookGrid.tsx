import type { Book } from '../types';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: Book[];
  loading: boolean;
  error: string | null;
}

export const BookGrid = ({ books, loading, error }: BookGridProps) => {
  if (loading) return <div className="book-grid">Loading...</div>;
  if (error) return <div className="book-grid error">{error}</div>;
  if (books.length === 0) return <div className="book-grid">Search for a title to get started</div>;

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
