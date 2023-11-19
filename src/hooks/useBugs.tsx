import { useQuery } from "@tanstack/react-query";
import { supabase } from "..";

export function useBugs(projectId: string) {
  const fetchBugs = async () => {
    const { data, error } = await supabase
      .from("bugs")
      .select()
      .eq("project_id", projectId);

    if (error) {
      throw new Error(`Error fetching bugs: ${error.message}`);
    }

    return data || [];
  };
  return useQuery({ queryKey: ["bugs", projectId], queryFn: fetchBugs });
}
