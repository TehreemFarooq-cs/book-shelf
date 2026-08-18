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
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'my-books'>('home');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchBooks(query);
      const savedIds = new Set(savedBooks.map((b) => b.id));
      const syncedResults = results.map((book) => ({
        ...book,
        status: savedIds.has(book.id) ? ('read' as const) : ('unread' as const),
      }));
      setBooks(syncedResults);
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

  const handleToggleSave = (bookToToggle: Book) => {
    const isSaved = savedBooks.some((b) => b.id === bookToToggle.id);

    if (isSaved) {
      setSavedBooks((prev) => prev.filter((b) => b.id !== bookToToggle.id));
    } else {
      setSavedBooks((prev) => [...prev, { ...bookToToggle, status: 'read' }]);
    }

    setBooks((prevBooks) =>
      prevBooks.map((b) =>
        b.id === bookToToggle.id
          ? { ...b, status: b.status === 'read' ? 'unread' : 'read' }
          : b
      )
    );
  };

  const displayedBooks = activeTab === 'my-books' ? savedBooks : books;

  return (
    <>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedBooks.length}
      />
      <main>
        <span className="hero-tag">
          {activeTab === 'home' ? 'THE LIBRARY' : 'YOUR COLLECTION'}
        </span>
        <h2 className="hero-headline">
          {activeTab === 'home' ? (
            <>
              Every book you need.
              <br />
              One simple shelf.
            </>
          ) : (
            'Your saved books.'
          )}
        </h2>

        {activeTab === 'home' && (
          <SearchBar onSearch={handleSearch} onClear={handleClear} />
        )}

        <BookGrid
          books={displayedBooks}
          loading={activeTab === 'home' ? loading : false}
          error={activeTab === 'home' ? error : null}
          onToggleSave={handleToggleSave}
        />
      </main>
    </>
  );
}

export default App;