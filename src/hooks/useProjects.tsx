import { useEffect, useState } from "react";
import { useBugs } from "./useBugs";
import { Tables, supabase } from "..";

function useProjects(projectId: string) {
  const [projectData, setProjectData] = useState<Tables<"projects"> | null>(
    null
  );
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const {
    data: bugsData,
    isLoading: bugsLoading,
    error: bugsError,
  } = useBugs(projectId);

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

        setProjectData(data[0]);
      } catch (error) {
        setError(new Error(`Error fetching projects: ${error}`));
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjectsAsync();
  }, [projectId]);

  return {
    projectData,
    bugsData,
    bugsLoading,
    projectsLoading,
    error: error || bugsError,
  };
}

export default useProjects;
