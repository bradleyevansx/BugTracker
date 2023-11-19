import { useEffect, useState } from "react";
import { Tables, supabase } from "..";

export function useComments(bugId: string) {
  const [data, setData] = useState<Tables<"comments">[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchCommentsAsync = async () => {
      try {
        const { data, error } = await supabase
          .from("comments")
          .select()
          .eq("bug_id", bugId);

        if (error) {
          throw new Error(`Error fetching comments: ${error.message}`);
        }

        return data || [];
      } catch (error) {
        setError(new Error(`Error fetching comments: ${error}`));
        return [];
      }
    };

    const fetchData = async () => {
      try {
        const result = await fetchCommentsAsync();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [bugId]);

  return { data, isLoading, error };
}
