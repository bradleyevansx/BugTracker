import { useQuery } from "@tanstack/react-query";
import { supabase } from "..";

export function useComments(bugId: string) {
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select()
      .eq("bug_id", bugId);

    if (error) {
      throw new Error(`Error fetching comments: ${error.message}`);
    }

    return data || [];
  };

  return useQuery({
    queryKey: ["comments", bugId],
    queryFn: fetchComments,
  });
}
