import type { Book } from '../types';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: Book[];
  loading: boolean;
  error: string | null;
  activeTab: 'home' | 'my-books';
  onOpenNotes?: (book: Book) => void;
}

export const BookGrid = ({
  books,
  loading,
  error,
  activeTab,
  onOpenNotes,
}: BookGridProps) => {
  if (loading) {
    return <div className="grid-state-message">Loading books...</div>;
  }

  if (error) {
    return <div className="grid-state-message error">{error}</div>;
  }

  if (books.length === 0) {
    return (
      <div className="grid-state-message">
        {activeTab === 'my-books'
          ? 'Your bookshelf is empty! Search for books on the Library tab to add them.'
          : 'No books found.'}
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          activeTab={activeTab}
          onOpenNotes={onOpenNotes}
        />
      ))}
    </div>
  );
};