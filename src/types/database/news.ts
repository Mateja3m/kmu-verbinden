
export type NewsPost = {
  id: string;
  author_id?: string;
  title: string;
  content: string;
  slug: string;
  image_url?: string;
  logo_url?: string;
  meta_description?: string;
  meta_keywords?: string;
  published_at?: string;
  created_at: string;
};

export type NewsPostInsert = Omit<NewsPost, 'id' | 'created_at'>;
export type NewsPostUpdate = Partial<NewsPostInsert>;

// Rich content types for the editor
export interface RichTextContent {
  type: 'paragraph' | 'heading' | 'image' | 'list';
  content: string;
  level?: 1 | 2 | 3; // For headings
  format?: {
    bold?: boolean;
    italic?: boolean;
    size?: 'small' | 'medium' | 'large';
  };
  url?: string; // For images
  position?: 'left' | 'center' | 'right'; // For images
}
