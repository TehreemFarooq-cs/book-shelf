# 📝 AI Prompts & Development Log

Documented history of AI generation prompts, generated outcomes, and manual code refactoring for the **BookShelf** application.

---

## Prompt 1: UI Scaffolding

### Prompt
Initialize a clean baseline layout for a virtual bookshelf application using functional components in React and TypeScript. 

Create the following files in `src/components/`:
1. `Header.tsx`: Displays the app title "BookShelf" and a subtitle/navigation layout.
2. `SearchBar.tsx`: Renders a form input for book titles/authors with a submit button and clear button.
3. `BookCard.tsx`: Displays placeholder book details (title, author, publish year, and shelf status badge).
4. `BookGrid.tsx`: Renders a responsive grid containing multiple `BookCard` placeholders.

Requirements:
- Use TypeScript interfaces for component props and placeholder book data.
- Keep components pure and presentational (no API calls or complex state yet).
- Provide a clean, minimal CSS file for basic grid alignment and card borders.
- Update `App.tsx` to import and display these components.

### Generated Output Summary
* **`src/types.ts`:** Created with central `Book` interface definition.
* **`src/components/`:**
  * `Header.tsx`: Presentational header and navigation layout.
  * `SearchBar.tsx`: Search form UI with event handler props.
  * `BookCard.tsx`: Individual book card display component.
  * `BookGrid.tsx`: Grid wrapper mapping over book lists.
  * `Components.css`: Styling rules for layout alignment, grid response, and card borders.
* **`src/App.tsx`:** Updated to integrate components with mock baseline data.

### Manual Improvements & Refactoring
* **Issue (Path Alias / Import Error):** AI generated an absolute path (`/src/types.ts`) for type imports, causing a Vite module resolution error.
* **Fix:** Corrected path to relative (`../types`) and converted to an explicit `import type { Book }` to ensure clean type erasure during build.

---

## Prompt 2: Open Library API Integration

### Prompt
Create a typed service to integrate with the Open Library Search API in `src/services/openLibrary.ts`.

Requirements:
1. Write an async function `searchBooks(query: string)` that fetches data from `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`.
2. Define TypeScript interfaces for the raw Open Library API doc payload and an updated `Book` interface in `src/types.ts`.
3. Add a helper utility function to transform raw API documents into normalized `Book` objects (extracting `key`, `title`, `author_name`, `first_publish_year`, `cover_i`, and `subject`).
4. Construct fallback cover URLs (`https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`) and a placeholder image URL when `cover_i` is missing.
5. Handle HTTP errors and return clean, readable error messages. Keep this service presentation-agnostic without attaching React hooks.

### Generated Output Summary
* **`src/types.ts`:** Expanded `Book` interface with optional properties (`cover_i`, `subject`, `coverUrl`) and added `OpenLibraryDoc` / `OpenLibraryResponse` interfaces.
* **`src/services/openLibrary.ts`:** Created async API service with `searchBooks()` and `transformToBook()` mapper utility.

### Manual Improvements & Refactoring
* **Issue (Runtime Export Resolution):** `openLibrary.ts` imported type interfaces as standard JavaScript imports, leading Vite to expect runtime exports.
* **Fix:** Converted imports to explicit `import type` syntax at the top of `src/services/openLibrary.ts`.
* **Issue (Missing Fallback Asset):** API service referenced a non-existent local fallback image (`/placeholder-book.svg`).
* **Fix:** Updated fallback logic to point to a reliable external placeholder (`https://placehold.co/128x192?text=No+Cover`).

---

## Prompt 3: Connecting Search State to the UI

### Prompt
Wire up the search functionality using the `searchBooks` service across `src/App.tsx`, `src/components/SearchBar.tsx`, `src/components/BookCard.tsx`, and `src/components/BookGrid.tsx`.

Requirements:
1. Update `SearchBar.tsx` to manage local input state and call an `onSearch(query: string)` callback prop on form submission. Add an `onClear` handler to reset search input.
2. In `App.tsx`, maintain state for `books` (`Book[]`), `loading` (`boolean`), and `error` (`string | null`).
3. Implement `handleSearch(query: string)` in `App.tsx` to set loading status, call `searchBooks(query)`, update the `books` array, and handle error messages cleanly.
4. Update `BookCard.tsx` to render `book.coverUrl` as an `<img>` tag alongside title, author, publish year, and status badge.
5. Update `BookGrid.tsx` to handle empty states, loading indicators, and display error messages if API requests fail.

### Generated Output Summary
* **`SearchBar.tsx`:** Added internal `useState` for input field control and managed form submission.
* **`App.tsx`:** Wired state variables (`books`, `loading`, `error`) with `handleSearch` and `handleClear` methods.
* **`BookCard.tsx`:** Updated to display image covers from `book.coverUrl`.
* **`BookGrid.tsx`:** Implemented conditional state rendering for loading, error alerts, and empty search prompts.

### Manual Improvements & Refactoring
* **Issue (API Connection Timeout):** Broad search queries triggered `net::ERR_CONNECTION_TIMED_OUT` and `TypeError: Failed to fetch` errors due to massive unfiltered payload sizes from Open Library.
* **Fix:** 
  1. Appended `limit=20` and explicit `fields` parameters (`key,title,author_name,first_publish_year,cover_i,subject`) to API request URLs.
  2. Implemented an `AbortController` with a 10-second timeout in `src/services/openLibrary.ts` to handle hanging network requests cleanly.
* **Issue (Unsafe Property Access):** Books with missing API parameters caused script execution errors during object transformation.
* **Fix:** Added defensive fallback checks in `transformToBook` for optional properties (`doc.title`, `doc.key`).
