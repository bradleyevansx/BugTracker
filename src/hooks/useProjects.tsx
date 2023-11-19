import { useQuery } from "@tanstack/react-query";
import { supabase } from "..";

function useProjects(projectId: string) {
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("id", projectId);

    if (error) {
      throw new Error(`Error fetching projects: ${error.message}`);
    }

    return data ? data[0] : null;
  };

  return useQuery({
    queryKey: ["projects", projectId],
    queryFn: fetchProjects,
  });
}

export default useProjects;
