import { useEffect, useState } from "react";
import { Tables, supabase } from "..";

export function useBugs(projectId: string) {
  const [data, setData] = useState<Tables<"bugs">[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchBugsAsync = async () => {
      try {
        const { data, error } = await supabase
          .from("bugs")
          .select()
          .eq("project_id", projectId);

        if (error) {
          throw new Error(`Error fetching bugs: ${error.message}`);
        }

        return data || [];
      } catch (error) {
        setError(new Error(`Error fetching bugs: ${error}`));
        return [];
      }
    };

    const fetchData = async () => {
      try {
        const result = await fetchBugsAsync();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  return { data, isLoading, error };
}
