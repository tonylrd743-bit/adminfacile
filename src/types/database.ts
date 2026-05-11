export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          company_name: string | null;
          profession: string | null;
          activity: string | null;
          specialty: string | null;
          siret: string | null;
          vat_applicable: boolean;
          hourly_rate: number | null;
          service_area: string | null;
          travel_fee: number | null;
          professional_email: string | null;
          phone: string | null;
          logo_url: string | null;
          document_style: string;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          company_name?: string | null;
          profession?: string | null;
          activity?: string | null;
          specialty?: string | null;
          siret?: string | null;
          vat_applicable?: boolean;
          hourly_rate?: number | null;
          service_area?: string | null;
          travel_fee?: number | null;
          professional_email?: string | null;
          phone?: string | null;
          logo_url?: string | null;
          document_style?: string;
          updated_at?: string;
          created_at?: string;
        };
        Update: {
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          company_name?: string | null;
          profession?: string | null;
          activity?: string | null;
          specialty?: string | null;
          siret?: string | null;
          vat_applicable?: boolean;
          hourly_rate?: number | null;
          service_area?: string | null;
          travel_fee?: number | null;
          professional_email?: string | null;
          phone?: string | null;
          logo_url?: string | null;
          document_style?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      requests: {
        Row: {
          id: string;
          user_id: string;
          request_type: string;
          form_data: Json;
          ai_result: Json | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          request_type: string;
          form_data: Json;
          ai_result?: Json | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          request_type?: string;
          form_data?: Json;
          ai_result?: Json | null;
          status?: string;
        };
        Relationships: [];
      };
      documents: {
        Row: {
          id: string;
          user_id: string;
          request_id: string | null;
          title: string;
          file_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          request_id?: string | null;
          title: string;
          file_url: string;
          created_at?: string;
        };
        Update: {
          request_id?: string | null;
          title?: string;
          file_url?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
