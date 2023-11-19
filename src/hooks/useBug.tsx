import { useQuery } from "@tanstack/react-query";
import { supabase } from "..";

export function useBug(bugId: string) {
  const fetchBug = async () => {
    const { data, error } = await supabase
      .from("bugs")
      .select()
      .eq("id", bugId);

    if (error) {
      throw new Error(`Error fetching bugs: ${error.message}`);
    }

    if (!data) {
      throw new Error("Bug not found");
    }

    return data;
  };
  return useQuery({ queryKey: ["bug", bugId], queryFn: fetchBug });
}
