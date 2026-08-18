import { useState, useEffect, useMemo } from 'react';
import './components/Components.css';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { BookGrid } from './components/BookGrid';
import { searchBooks } from './services/openLibrary';
import type { Book, ReadingStatus } from './types';

function App() {
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const [savedBooks, setSavedBooks] = useState<Book[]>(() => {
    const localData = localStorage.getItem('bookshelf_saved');
    return localData ? JSON.parse(localData) : [];
  });

  const [activeTab, setActiveTab] = useState<'home' | 'my-books'>('home');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New states for filtering and sorting
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('title');

  useEffect(() => {
    localStorage.setItem('bookshelf_saved', JSON.stringify(savedBooks));
  }, [savedBooks]);

  // Filter and sort logic for My Books
  const processedSavedBooks = useMemo(() => {
    let result = [...savedBooks];

    // Filter by reading status
    if (filterStatus !== 'all') {
      result = result.filter((b) => b.readingStatus === filterStatus);
    }

    // Sort books
    result.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'author') {
        return a.author.localeCompare(b.author);
      } else if (sortBy === 'year') {
        return (b.year || 0) - (a.year || 0); // Newest first
      }
      return 0;
    });

    return result;
  }, [savedBooks, filterStatus, sortBy]);

  const displayedBooks = useMemo(() => {
    if (activeTab === 'my-books') return processedSavedBooks;

    const savedMap = new Map(savedBooks.map((b) => [b.id, b]));
    return searchResults.map((book) => savedMap.get(book.id) || book);
  }, [activeTab, savedBooks, searchResults, processedSavedBooks]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchBooks(query);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchResults([]);
    setError(null);
  };

  const handleToggleSave = (bookToToggle: Book) => {
    const isSaved = savedBooks.some((b) => b.id === bookToToggle.id);

    if (isSaved) {
      setSavedBooks((prev) => prev.filter((b) => b.id !== bookToToggle.id));
    } else {
      const defaultSavedBook: Book = {
        ...bookToToggle,
        readingStatus: 'want-to-read',
        pagesRead: 0,
        totalPages: bookToToggle.totalPages || 300,
      };
      setSavedBooks((prev) => [...prev, defaultSavedBook]);
    }
  };

  const handleUpdateStatus = (id: string, status: ReadingStatus) => {
    setSavedBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, readingStatus: status } : b))
    );
  };

  const handleUpdatePages = (id: string, pagesRead: number) => {
    setSavedBooks((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const validPages = Math.min(Math.max(0, pagesRead), b.totalPages || 300);
        return { ...b, pagesRead: validPages };
      })
    );
  };

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

        {activeTab === 'my-books' && (
          <>
            <div className="stats-dashboard">
              <div className="stat-card">
                <span className="stat-value">{savedBooks.length}</span>
                <span className="stat-label">Total Books</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">
                  {savedBooks.filter((b) => b.readingStatus === 'currently-reading').length}
                </span>
                <span className="stat-label">Currently Reading</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">
                  {savedBooks.filter((b) => b.readingStatus === 'finished').length}
                </span>
                <span className="stat-label">Finished</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">
                  {savedBooks.reduce((acc, b) => acc + (b.pagesRead || 0), 0)}
                </span>
                <span className="stat-label">Pages Read</span>
              </div>
            </div>

            {/* Filter & Sort Control Bar */}
            <div className="filter-sort-bar">
              <div className="filter-group">
                <label htmlFor="status-filter">Filter:</label>
                <select
                  id="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-dropdown"
                >
                  <option value="all">All Books</option>
                  <option value="want-to-read">Want to Read</option>
                  <option value="currently-reading">Currently Reading</option>
                  <option value="finished">Finished</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="sort-by">Sort by:</label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-dropdown"
                >
                  <option value="title">Title (A-Z)</option>
                  <option value="author">Author</option>
                  <option value="year">Publication Year</option>
                </select>
              </div>
            </div>
          </>
        )}

        <BookGrid
          books={displayedBooks}
          loading={activeTab === 'home' ? loading : false}
          error={activeTab === 'home' ? error : null}
          activeTab={activeTab}
          onToggleSave={handleToggleSave}
          onUpdateStatus={handleUpdateStatus}
          onUpdatePages={handleUpdatePages}
        />
      </main>
    </>
  );
}

export default App;