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
      bugs: {
        Row: {
          assigned_to: string | null;
          created_by: string | null;
          created_on: string | null;
          description: string;
          id: string;
          project_id: string;
          severity: string;
          status: string;
          title: string;
          updated_on: string | null;
        };
        Insert: {
          assigned_to?: string | null;
          created_by?: string | null;
          created_on?: string | null;
          description: string;
          id?: string;
          project_id?: string;
          severity: string;
          status: string;
          title: string;
          updated_on?: string | null;
        };
        Update: {
          assigned_to?: string | null;
          created_by?: string | null;
          created_on?: string | null;
          description?: string;
          id?: string;
          project_id?: string;
          severity?: string;
          status?: string;
          title?: string;
          updated_on?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bugs_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bugs_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bugs_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      comments: {
        Row: {
          bug_id: string;
          created_at: string;
          id: number;
          text: string;
          user_first_name: string | null;
          user_id: string;
          user_last_name: string | null;
        };
        Insert: {
          bug_id?: string;
          created_at?: string;
          id?: number;
          text?: string;
          user_first_name?: string | null;
          user_id: string;
          user_last_name?: string | null;
        };
        Update: {
          bug_id?: string;
          created_at?: string;
          id?: number;
          text?: string;
          user_first_name?: string | null;
          user_id?: string;
          user_last_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "comments_bug_id_fkey";
            columns: ["bug_id"];
            isOneToOne: false;
            referencedRelation: "bugs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          created_at: string | null;
          email: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      projects: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          description: string;
          id: string;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          description?: string;
          id?: string;
          name?: string;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          description?: string;
          id?: string;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
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
