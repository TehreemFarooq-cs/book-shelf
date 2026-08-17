export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  status: 'read' | 'unread';
  cover_i?: number;
  subject?: string[];
  coverUrl?: string;
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
