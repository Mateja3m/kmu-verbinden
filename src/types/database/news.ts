import { Database } from "./base";

export type NewsPost = Database["public"]["Tables"]["news_posts"]["Row"];
export type NewsPostInsert = Database["public"]["Tables"]["news_posts"]["Insert"];
export type NewsPostUpdate = Database["public"]["Tables"]["news_posts"]["Update"];