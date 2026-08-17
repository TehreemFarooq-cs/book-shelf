# 📚 BookShelf — Virtual Bookshelf Application

A responsive web application built with React, TypeScript, and Vite that allows users to search for books in real time using the Open Library Search API.

## 🚀 Features

- **Live Book Search:** Query millions of titles from the Open Library API.
- **Robust API Service Layer:** Includes normalized data mapping, field filtering (`limit=20`), and defensive handling for missing titles or cover images.
- **Network Resiliency:** Implements request timeouts using `AbortController` to handle API latency.
- **State Management:** Clean UI state transitions for loading, error reporting, empty states, and results display.
- **Type Safety:** Built with strict TypeScript interfaces and type-only imports for optimal compilation.

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Modular CSS
- **API:** Open Library Search API
