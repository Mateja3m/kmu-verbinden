import { Database } from "./base";

export type Expert = Database["public"]["Tables"]["experts"]["Row"];
export type ExpertInsert = Database["public"]["Tables"]["experts"]["Insert"];
export type ExpertUpdate = Database["public"]["Tables"]["experts"]["Update"];

export interface ExpertFormData {
  expertise_area: string;
  description: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  website?: string;
  linkedin?: string;
  address: string;
  postal_code: string;
  city: string;
  services: string[];
  image_url?: string;
  logo_url?: string;
}