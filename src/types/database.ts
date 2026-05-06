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
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          created_at?: string;
        };
        Update: {
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
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
