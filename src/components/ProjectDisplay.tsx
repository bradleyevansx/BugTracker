import { useBugs } from "@/hooks/useBugs";
import { Tables } from "..";
import Heading from "./Heading";
import Text from "./Text";
import BugPreview from "./BugPreview";
import ProjectStatsPreview from "./ProjectStatsPreview";

interface Props {
  project: Tables<"projects">;
}

const ProjectDisplay = ({ project }: Props) => {
  const { data, error, isLoading } = useBugs(project.id);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <article className="w-80 flex flex-col justify-center items-center rounded-lg border p-5 h-fit">
      <Heading type="h2">{project.name}</Heading>
      <ProjectStatsPreview bugs={data}></ProjectStatsPreview>
      {data.map((bug) => (
        <>
          <BugPreview bug={bug}></BugPreview>
        </>
      ))}
    </article>
  );
};

export default ProjectDisplay;
