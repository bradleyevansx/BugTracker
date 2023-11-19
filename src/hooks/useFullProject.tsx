import { useBugs } from "./useBugs";
import useProjects from "./useProjects";

function useFullProject(projectId: string) {
  const {
    data: bugsData,
    isLoading: bugsLoading,
    error: bugsError,
  } = useBugs(projectId);

  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: projectError,
  } = useProjects(projectId);

  return {
    projectsData,
    bugsData,
    bugsLoading,
    projectsLoading,
    error: projectError || bugsError,
  };
}

export default useFullProject;
