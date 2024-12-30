export type Profile = {
  id: string;
  created_at: string;
  company_name?: string | null;
  contact_person?: string | null;
  address?: string | null;
  postal_code?: string | null;
  city?: string | null;
  phone?: string | null;
  is_admin?: boolean | null;
  member_type?: string | null;
};

export type Service = {
  id: string;
  name: string;
  description?: string | null;
  created_at: string;
};

export type ProfileService = {
  profile_id: string;
  service_id: string;
  claimed_at: string;
};