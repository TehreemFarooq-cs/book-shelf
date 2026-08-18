interface HeaderProps {
  activeTab: 'home' | 'my-books';
  setActiveTab: (tab: 'home' | 'my-books') => void;
  savedCount: number;
}

export const Header = ({ activeTab, setActiveTab, savedCount }: HeaderProps) => (
  <header className="app-header">
    <div className="header-container">
      <h1>BookShelf</h1>
      <nav>
        <button
          type="button"
          className={`nav-btn ${activeTab === 'home' ? 'nav-btn-primary' : 'nav-btn-outline'}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button
          type="button"
          className={`nav-btn ${activeTab === 'my-books' ? 'nav-btn-primary' : 'nav-btn-outline'}`}
          onClick={() => setActiveTab('my-books')}
        >
          My Books
          {savedCount > 0 && <span className="nav-counter-badge">{savedCount}</span>}
        </button>
      </nav>
    </div>
  </header>
);