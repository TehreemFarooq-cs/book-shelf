# 📚 BookShelf - Virtual Bookshelf Application

A responsive web application built with React, TypeScript and Vite that allows users to search for books in real time using the Open Library Search API.

## 🚀 Live Demo
* **URL:** [https://book-shelf-inky-chi.vercel.app/](https://book-shelf-inky-chi.vercel.app/)

## 🚀 Features

- **Live Book Search:** Query millions of titles from the Open Library API.
- **Robust API Service Layer:** Includes normalized data mapping, field filtering (`limit=20`) and defensive handling for missing titles or cover images.
- **Network Resiliency:** Implements request timeouts using `AbortController` to handle API latency.
- **State Management:** Clean UI state transitions for loading, error reporting, empty states and results display.
- **Type Safety:** Built with strict TypeScript interfaces and type-only imports for optimal compilation.

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Modular CSS
- **API:** Open Library Search API

## 📁 Project Structure

```text
src/
├── components/       # Reusable presentational UI components (BookCard, BookGrid, SearchBar, Header)
├── context/          # Global application state management (BooksContext.tsx)
├── services/         # API integration layer and transformation utilities (openLibrary.ts)
├── types.ts          # Centralized TypeScript interfaces
├── App.tsx           # Primary view container
└── main.tsx          # Application entry point
```

## 📝 Prompting & Refactoring Documentation
All AI prompts, iterations, and manual code refactoring logs are documented in [`PROMPTS.md`](./PROMPTS.md).
