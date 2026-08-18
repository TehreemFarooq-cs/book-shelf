import type { Book, ReadingStatus } from '../types';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: Book[];
  loading: boolean;
  error: string | null;
  onToggleSave: (book: Book) => void;
  onUpdateStatus?: (id: string, status: ReadingStatus) => void;
  onUpdatePages?: (id: string, pagesRead: number) => void;
}

export const BookGrid = ({
  books,
  loading,
  error,
  onToggleSave,
  onUpdateStatus,
  onUpdatePages,
}: BookGridProps) => {
  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="error">{error}</p>;
  if (books.length === 0) return <p>No books found.</p>;

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onToggleSave={onToggleSave}
          onUpdateStatus={onUpdateStatus}
          onUpdatePages={onUpdatePages}
        />
      ))}
    </div>
  );
};