import './App.css';
import './components/Components.css';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { BookGrid } from './components/BookGrid';
import type { Book } from './types';

const placeholderBooks: Book[] = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, status: 'read' },
  { id: '2', title: '1984', author: 'George Orwell', year: 1949, status: 'unread' },
];

function App() {
  return (
    <>
      <Header />
      <main>
        <SearchBar onSearch={(q) => console.log('Searching for:', q)} onClear={() => console.log('Cleared')} />
        <BookGrid books={placeholderBooks} />
      </main>
    </>
  );
}

export default App;
