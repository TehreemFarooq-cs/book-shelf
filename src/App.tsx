import { useState } from 'react';
import './App.css';
import './components/Components.css';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { BookGrid } from './components/BookGrid';
import { searchBooks } from './services/openLibrary';
import type { Book } from './types';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchBooks(query);
      setBooks(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setBooks([]);
    setError(null);
  };

  return (
    <>
      <Header />
      <main>
        <span className="hero-tag">THE LIBRARY</span>
        <h2 className="hero-headline">Every book you need.<br />One simple shelf.</h2>
        <SearchBar onSearch={handleSearch} onClear={handleClear} />
        <BookGrid books={books} loading={loading} error={error} />
      </main>
    </>
  );
}

export default App;
