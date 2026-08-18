export type ReadingStatus = 'want-to-read' | 'currently-reading' | 'finished';

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  coverUrl: string;
  cover_i?: number;
  readingStatus?: ReadingStatus;
  pagesRead?: number;
  totalPages?: number;
  notes?: string; // Added for personal notes
}

export interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: string[];
}

export interface OpenLibraryResponse {
  docs: OpenLibraryDoc[];
}