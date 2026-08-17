## Prompt 1: UI Scaffolding

Initialize a clean baseline layout for a virtual bookshelf application using functional components in React and TypeScript. 

Create the following files in `src/components/`:
1. Header.tsx: Displays the app title "BookShelf" and a subtitle/navigation layout.
2. SearchBar.tsx: Renders a form input for book titles/authors with a submit button and clear button.
3. BookCard.tsx: Displays placeholder book details (title, author, publish year, and shelf status badge).
4. BookGrid.tsx: Renders a responsive grid containing multiple BookCard placeholders.

Requirements:
- Use TypeScript interfaces for component props and placeholder book data.
- Keep components pure and presentational (no API calls or complex state yet).
- Provide a clean, minimal CSS file for basic grid alignment and card borders.
- Update App.tsx to import and display these components.

### Output
Baseline Layout Completed: Finalizing the baseline layout by verifying the structure.

✦ The virtual bookshelf baseline layout is now complete.

  Summary of Changes:
   1. Created src/types.ts: Defined the Book interface used across components.
   2. Created src/components/:
       * Header.tsx: Basic app title and navigation links.
       * SearchBar.tsx: Presentational search form with submit/clear handlers.
       * BookCard.tsx: Displays placeholder book details and status.
       * BookGrid.tsx: Maps over books to render the grid of cards.
       * Components.css: Basic layout styles for the grid, cards, and header.
   3. Updated src/App.tsx: Cleaned up the boilerplate and integrated the new components with placeholder book data.

  All components are functional, presentational, and follow TypeScript standards.

### Manual Improvements & Code Refactoring
- Issue: AI generated an un-aliased path (/src/types.ts), causing a Vite runtime export resolution error.

- Fix: Corrected the path to relative ../types and converted it to an explicit import type to ensure clean erasure during TypeScript compilation.

