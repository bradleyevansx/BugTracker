import { useEffect, useState } from "react";
import { Tables, supabase } from "..";

export function useBug(bugId: string) {
  const [data, setData] = useState<Tables<"bugs">[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchBugAsync = async () => {
      try {
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
      } catch (error) {
        throw new Error(`Error fetching bugs: ${error}`);
      }
    };

    const fetchData = async () => {
      try {
        const result = await fetchBugAsync();
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
