
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

/**
 * Rich content types for the rich text editor
 * These types define the structure for content blocks in the editor
 */
export interface RichTextContent {
  /**
   * The type of content block
   */
  type: 'paragraph' | 'heading' | 'image' | 'list';
  
  /**
   * The actual content text or HTML
   */
  content: string;
  
  /**
   * Heading level (h1, h2, h3) - only applicable for heading type
   */
  level?: 1 | 2 | 3;
  
  /**
   * Formatting options for the content
   */
  format?: {
    bold?: boolean;
    italic?: boolean;
    size?: 'small' | 'medium' | 'large';
  };
  
  /**
   * URL for image type content
   */
  url?: string;
  
  /**
   * Position/alignment for image type content
   */
  position?: 'left' | 'center' | 'right';
}
