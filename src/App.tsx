import { useState, useMemo } from 'react';
import './components/Components.css';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { BookGrid } from './components/BookGrid';
import { searchBooks } from './services/openLibrary';
import type { Book } from './types';
import { useBooks } from './context/BooksContext';

function App() {
  const { savedBooks, updateNotes } = useBooks();

  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'my-books'>('home');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New states for filtering and sorting
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('title');

  // Modal notes state
  const [modalBook, setModalBook] = useState<Book | null>(null);
  const [noteText, setNoteText] = useState('');

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

  const handleOpenNotes = (book: Book) => {
    setModalBook(book);
    setNoteText(book.notes || '');
  };

  const handleSaveNotes = () => {
    if (!modalBook) return;
    updateNotes(modalBook.id, noteText);
    setModalBook(null);
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
          onOpenNotes={handleOpenNotes}
        />
      </main>

      {/* Notes Modal Popup */}
      {modalBook && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Notes for {modalBook.title}</h3>
            <textarea
              className="notes-textarea"
              placeholder="Write your thoughts, favorite quotes, or chapter reflections here..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={6}
            />
            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn cancel"
                onClick={() => setModalBook(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-btn save"
                onClick={handleSaveNotes}
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;