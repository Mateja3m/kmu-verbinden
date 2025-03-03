
import { Database } from "./base";

export type NewsPost = Database["public"]["Tables"]["news_posts"]["Row"];
export type NewsPostInsert = Database["public"]["Tables"]["news_posts"]["Insert"];
export type NewsPostUpdate = Database["public"]["Tables"]["news_posts"]["Update"];

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
