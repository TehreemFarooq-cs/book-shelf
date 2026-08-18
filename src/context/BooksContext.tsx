/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode, useMemo, useCallback } from 'react';
import type { Book, ReadingStatus } from '../types';

interface BooksContextType {
  savedBooks: Book[];
  toggleSave: (book: Book) => void;
  updateStatus: (id: string, status: ReadingStatus) => void;
  updatePages: (id: string, pagesRead: number) => void;
  updateNotes: (id: string, notes: string) => void;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [savedBooks, setSavedBooks] = useState<Book[]>(() => {
    const localData = localStorage.getItem('bookshelf_saved');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookshelf_saved', JSON.stringify(savedBooks));
  }, [savedBooks]);

  const toggleSave = useCallback((bookToToggle: Book) => {
    const isSaved = savedBooks.some((b) => b.id === bookToToggle.id);
    if (isSaved) {
      setSavedBooks((prev) => prev.filter((b) => b.id !== bookToToggle.id));
    } else {
      const defaultSavedBook: Book = {
        ...bookToToggle,
        readingStatus: 'want-to-read',
        pagesRead: 0,
        totalPages: bookToToggle.totalPages || 300,
        notes: '',
      };
      setSavedBooks((prev) => [...prev, defaultSavedBook]);
    }
  }, [savedBooks]);

  const updateStatus = useCallback((id: string, status: ReadingStatus) => {
    setSavedBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, readingStatus: status } : b))
    );
  }, []);

  const updatePages = useCallback((id: string, pagesRead: number) => {
    setSavedBooks((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const validPages = Math.min(Math.max(0, pagesRead), b.totalPages || 300);
        return { ...b, pagesRead: validPages };
      })
    );
  }, []);

  const updateNotes = useCallback((id: string, notes: string) => {
    setSavedBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, notes } : b))
    );
  }, []);

  const value = useMemo(() => ({
    savedBooks,
    toggleSave,
    updateStatus,
    updatePages,
    updateNotes,
  }), [savedBooks, toggleSave, updateStatus, updatePages, updateNotes]);

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = (): BooksContextType => {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
};
