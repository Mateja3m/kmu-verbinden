
import { Database } from "./base";

// Database partner type (used for DB operations)
export type Partner = Database["public"]["Tables"]["partners"]["Row"];
export type PartnerInsert = Database["public"]["Tables"]["partners"]["Insert"];
export type PartnerUpdate = Database["public"]["Tables"]["partners"]["Update"];

// Frontend partner type (used for static data)
export interface FrontendPartner {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  customBackground?: string;
  requiresRedBackground?: boolean;
}
