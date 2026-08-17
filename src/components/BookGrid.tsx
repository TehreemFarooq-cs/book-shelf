import type { Book } from '../types';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: Book[];
}

export const BookGrid = ({ books }: BookGridProps) => (
  <div className="book-grid">
    {books.map((book) => (
      <BookCard key={book.id} book={book} />
    ))}
  </div>
);
