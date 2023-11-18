import BugCard from "@/components/BugCard";
import Heading from "@/components/Heading";
import MyButton from "@/components/MyButton";
import ProjectOverallStatusIndicator from "@/components/ProjectOverallStatusIndicator";
import useProjects from "@/hooks/useProjects";
import { useParams } from "react-router-dom";

const ProjectView = ({}) => {
  const { projectId } = useParams();

  if (!projectId) {
    return <Heading type="h1">Not Found</Heading>;
  }

  const { projectData, bugsData, bugsLoading, projectsLoading, error } =
    useProjects(projectId);

  const statusRatio = () => {
    const resolvedInProgressCount = bugsData.filter((x) => {
      return x.status === "Resolved" || x.status === "In Progress";
    }).length;

    const openCount = bugsData.filter((x) => {
      return x.status === "Open";
    }).length;

    const value = resolvedInProgressCount / openCount;
    return value;
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (projectData)
    return (
      <div
        style={{ width: "95%", height: " 95%" }}
        className="border rounded-lg overflow-auto"
      >
        <div className="p-5 flex justify-center items-center gap-4 ">
          <Heading type="h1">{projectData!.name}</Heading>
          <ProjectOverallStatusIndicator
            statusRatio={statusRatio()}
          ></ProjectOverallStatusIndicator>
        </div>
        <div>
          {bugsData.map((bug) => (
            <BugCard bug={bug}></BugCard>
          ))}
        </div>
      </div>
    );
};

export default ProjectView;
