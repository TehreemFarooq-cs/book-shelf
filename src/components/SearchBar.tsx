interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

export const SearchBar = ({ onSearch, onClear }: SearchBarProps) => (
  <form className="search-bar" onSubmit={(e) => { e.preventDefault(); onSearch((e.target as any).query.value); }}>
    <input type="text" name="query" placeholder="Search books..." />
    <button type="submit">Search</button>
    <button type="button" onClick={onClear}>Clear</button>
  </form>
);
