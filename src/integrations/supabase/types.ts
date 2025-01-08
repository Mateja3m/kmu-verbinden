export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          company_name: string | null;
          contact_person: string | null;
          address: string | null;
          postal_code: string | null;
          city: string | null;
          phone: string | null;
          is_admin: boolean | null;
          member_type: string | null;
          membership_status: string | null;
          terms_accepted: boolean | null;
          website: string | null;
          partner_type: string | null;
          member_number: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          company_name?: string | null;
          contact_person?: string | null;
          address?: string | null;
          postal_code?: string | null;
          city?: string | null;
          phone?: string | null;
          is_admin?: boolean | null;
          member_type?: string | null;
          membership_status?: string | null;
          terms_accepted?: boolean | null;
          website?: string | null;
          partner_type?: string | null;
          member_number?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          company_name?: string | null;
          contact_person?: string | null;
          address?: string | null;
          postal_code?: string | null;
          city?: string | null;
          phone?: string | null;
          is_admin?: boolean | null;
          member_type?: string | null;
          membership_status?: string | null;
          terms_accepted?: boolean | null;
          website?: string | null;
          partner_type?: string | null;
          member_number?: string | null;
          created_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
        };
      };
      profile_services: {
        Row: {
          profile_id: string;
          service_id: string;
          claimed_at: string;
        };
        Insert: {
          profile_id: string;
          service_id: string;
          claimed_at?: string;
        };
        Update: {
          profile_id?: string;
          service_id?: string;
          claimed_at?: string;
        };
      };
      partners: {
        Row: {
          id: string;
          profile_id: string;
          name: string;
          logo: string | null;
          website: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          name: string;
          logo?: string | null;
          website?: string | null;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          name?: string;
          logo?: string | null;
          website?: string | null;
          description?: string | null;
          created_at?: string;
        };
      };
      experts: {
        Row: {
          id: string;
          profile_id: string;
          expertise_area: string;
          description: string;
          image_url: string | null;
          logo_url: string | null;
          services: string[];
          status: string;
          company_name: string;
          contact_person: string;
          email: string;
          phone: string | null;
          website: string | null;
          linkedin: string | null;
          address: string | null;
          postal_code: string | null;
          city: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          expertise_area: string;
          description: string;
          image_url?: string | null;
          logo_url?: string | null;
          services?: string[];
          status?: string;
          company_name: string;
          contact_person: string;
          email: string;
          phone?: string | null;
          website?: string | null;
          linkedin?: string | null;
          address?: string | null;
          postal_code?: string | null;
          city?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          expertise_area?: string;
          description?: string;
          image_url?: string | null;
          logo_url?: string | null;
          services?: string[];
          status?: string;
          company_name?: string;
          contact_person?: string;
          email?: string;
          phone?: string | null;
          website?: string | null;
          linkedin?: string | null;
          address?: string | null;
          postal_code?: string | null;
          city?: string | null;
          created_at?: string;
        };
      };
      expert_reviews: {
        Row: {
          id: string;
          expert_id: string;
          reviewer_profile_id: string;
          rating: number;
          comment: string | null;
          is_anonymous: boolean;
          is_public: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          expert_id: string;
          reviewer_profile_id: string;
          rating: number;
          comment?: string | null;
          is_anonymous?: boolean;
          is_public?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          expert_id?: string;
          reviewer_profile_id?: string;
          rating?: number;
          comment?: string | null;
          is_anonymous?: boolean;
          is_public?: boolean;
          created_at?: string;
        };
      };
      news_posts: {
        Row: {
          id: string;
          author_id: string;
          title: string;
          content: string;
          slug: string;
          image_url: string | null;
          meta_description: string | null;
          meta_keywords: string | null;
          published_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          author_id: string;
          title: string;
          content: string;
          slug: string;
          image_url?: string | null;
          meta_description?: string | null;
          meta_keywords?: string | null;
          published_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          author_id?: string;
          title?: string;
          content?: string;
          slug?: string;
          image_url?: string | null;
          meta_description?: string | null;
          meta_keywords?: string | null;
          published_at?: string | null;
          created_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          member_id: string;
          partner_id: string;
          service_name: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          member_id: string;
          partner_id: string;
          service_name: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          member_id?: string;
          partner_id?: string;
          service_name?: string;
          status?: string;
          created_at?: string;
        };
      };
      invoices: {
        Row: {
          id: string;
          profile_id: string;
          amount: number;
          year: number;
          due_date: string;
          status: string;
          paid_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          amount: number;
          year: number;
          due_date: string;
          status?: string;
          paid_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          amount?: number;
          year?: number;
          due_date?: string;
          status?: string;
          paid_at?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];