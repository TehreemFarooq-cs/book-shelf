# 📚 BookShelf - Virtual Bookshelf Application

A responsive web application built with React, TypeScript and Vite that allows users to search for books in real time using the Open Library Search API.

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
├── services/         # API integration layer and transformation utilities (openLibrary.ts)
├── types.ts          # Centralized TypeScript interfaces
├── App.tsx           # Primary state management and view container
└── main.tsx          # Application entry point

## 📝 Prompting & Refactoring Documentation
All AI prompts, iterations, manual code refactoring, and debug logs are documented step-by-step in PROMPTS.md.
