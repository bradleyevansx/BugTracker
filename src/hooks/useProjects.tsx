import { useEffect, useState } from "react";
import { Tables, supabase } from "..";

function useProjects(projectId: string) {
  const [data, setData] = useState<Tables<"projects"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchProjectsAsync = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select()
          .eq("id", projectId);
        if (error) {
          throw new Error(`Error fetching projects: ${error.message}`);
        }

        setData(data[0]);
      } catch (error) {
        setError(new Error(`Error fetching projects: ${error}`));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectsAsync();
  }, [projectId]);

  return {
    data,
    isLoading,
    error,
  };
}

export default useProjects;
