export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bugs: {
        Row: {
          assigned_to: string
          created_by: string
          created_on: string
          description: string
          id: string
          project_id: string
          severity: string
          status: string
          title: string
          updated_on: string
        }
        Insert: {
          assigned_to?: string
          created_by?: string
          created_on?: string
          description?: string
          id?: string
          project_id?: string
          severity?: string
          status?: string
          title?: string
          updated_on?: string
        }
        Update: {
          assigned_to?: string
          created_by?: string
          created_on?: string
          description?: string
          id?: string
          project_id?: string
          severity?: string
          status?: string
          title?: string
          updated_on?: string
        }
        Relationships: [
          {
            foreignKeyName: "bugs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          bug_id: string
          created_at: string
          created_by: string
          id: number
          text: string
        }
        Insert: {
          bug_id?: string
          created_at?: string
          created_by?: string
          id?: number
          text?: string
        }
        Update: {
          bug_id?: string
          created_at?: string
          created_by?: string
          id?: number
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_bug_id_fkey"
            columns: ["bug_id"]
            isOneToOne: false
            referencedRelation: "bugs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          created_at: string
          created_by: string
          description: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          name?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          id: string
          role: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          id: string
          role?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
