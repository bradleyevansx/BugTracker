import { createClient } from "@supabase/supabase-js";
import { Database } from "../src/supabase/supabase";

export const supabase = createClient<Database>(
  "https://mzuaonbjxfkvnqxrgchg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16dWFvbmJqeGZrdm5xeHJnY2hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyMzgyNzYsImV4cCI6MjAxNTgxNDI3Nn0.AzbpAFYlfo145GTSOWK5aeuxElqlkNqlFXNg2fvMCF4"
);

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
