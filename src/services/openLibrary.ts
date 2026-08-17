import type { Book, OpenLibraryDoc, OpenLibraryResponse } from '../types';

export async function searchBooks(query: string): Promise<Book[]> {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20&fields=key,title,author_name,first_publish_year,cover_i,subject`);
    //const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.statusText}`);
    }
    const data: OpenLibraryResponse = await response.json();
    return data.docs.map(transformToBook);
  } catch (error) {
    console.error('Error searching books:', error);
    throw new Error('An error occurred while searching for books. Please try again later.');
  }
}

function transformToBook(doc: OpenLibraryDoc): Book {
  return {
    id: doc.key.replace('/works/', ''),
    title: doc.title,
    author: doc.author_name?.[0] || 'Unknown Author',
    year: doc.first_publish_year || 0,
    status: 'unread',
    cover_i: doc.cover_i,
    subject: doc.subject,
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : 'https://placehold.co/128x192?text=No+Cover',
  };
}
