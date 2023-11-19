import { useBugs } from "@/hooks/useBugs";
import { Tables } from "..";
import Heading from "./Heading";
import BugPreview from "./BugPreview";
import ProjectStatsPreview from "./ProjectStatsPreview";
import { ScrollArea } from "./ui/scroll-area";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

interface Props {
  project: Tables<"projects">;
}

const ProjectDisplay = ({ project }: Props) => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useBugs(project.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const onClickDetailView = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <article className="w-80 flex flex-col justify-center items-center rounded-lg border p-5 h-full">
      <Heading type="h2">{project.name}</Heading>
      <ProjectStatsPreview bugs={data!}></ProjectStatsPreview>
      <ScrollArea className="h-96 w-full">
        {data!.map((bug) => (
          <BugPreview key={bug.id} bug={bug}></BugPreview>
        ))}
      </ScrollArea>
      <MyButton
        className="mt-5 w-full"
        variant={"secondary"}
        onClick={onClickDetailView}
      >
        Detail View
      </MyButton>
    </article>
  );
};

export default ProjectDisplay;
