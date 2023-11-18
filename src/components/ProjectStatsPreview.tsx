import { Tables } from "..";
import Text from "./Text";
import { Progress } from "./ui/progress";

interface Props {
  bugs: Tables<"bugs">[];
}

const ProjectStatsPreview = ({ bugs }: Props) => {
  const resolvedBugs = bugs.filter((x) => x.status === "Resolved").length;
  const openBugs = bugs.filter((x) => x.status === "Open").length;
  const inProgressBugs = bugs.filter((x) => x.status === "In Progress").length;
  const progress = (resolvedBugs / bugs.length) * 100 || 0;

  return (
    <div className="w-full flex flex-col items-center mt-5">
      <div className="w-5/6 mb-2">
        <Progress value={progress}></Progress>
      </div>
      <div className="flex justify-around w-full">
        <div className="flex flex-col items-center">
          <span className="border-b pb-1">
            <Text type="lead">Open</Text>
          </span>
          <Text type="large">{openBugs.toString()}</Text>
        </div>
        <div className="flex flex-col items-center">
          <span className="border-b pb-1">
            <Text type="lead">In Progress</Text>
          </span>
          <Text type="large">{inProgressBugs.toString()}</Text>
        </div>
        <div className="flex flex-col items-center">
          <span className="border-b pb-1">
            <Text type="lead">Resolved</Text>
          </span>
          <Text type="large">{resolvedBugs.toString()}</Text>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatsPreview;
