import { useQuery } from "@tanstack/react-query";
import { supabase } from "..";

export function useFullName(userId: string | null) {
  const fetchFullName = async () => {
    if (!userId) {
      return;
    }

    const { data: first_name, error: first_name_error } = await supabase
      .from("profiles")
      .select("first_name")
      .eq("id", userId);
    const { data: last_name, error: last_name_error } = await supabase
      .from("profiles")
      .select("last_name")
      .eq("id", userId);

    if (first_name_error) {
      throw new Error(`Error fetching first name: ${first_name_error.message}`);
    }
    if (last_name_error) {
      throw new Error(`Error fetching last name: ${last_name_error.message}`);
    }

    if (!first_name || !last_name) {
      throw new Error("User not found");
    }

    return `${first_name[0].first_name} ${last_name[0].last_name}`;
  };
  return useQuery({ queryKey: ["profiles", userId], queryFn: fetchFullName });
}
