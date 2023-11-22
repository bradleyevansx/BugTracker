import BugCard from "@/components/BugCard";
import CreateBug from "@/components/CreateBug";
import Heading from "@/components/Heading";
import MyAlert from "@/components/MyAlert";
import MyButton from "@/components/MyButton";
import ProjectOverallStatusIndicator from "@/components/ProjectOverallStatusIndicator";
import Text from "@/components/Text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useFullProject from "@/hooks/useFullProject";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const ProjectView = ({}) => {
  const { projectId } = useParams();

  const [addBugIsShown, setAddBugIsShown] = useState(false);

  if (!projectId) {
    return <Heading type="h1">Not Found</Heading>;
  }

  const { projectsData, bugsData, bugsLoading, projectsLoading, error } =
    useFullProject(projectId);

  if (bugsLoading || projectsLoading) {
    return <div>Loading...</div>;
  }

  const unassignedBugsCount = bugsData!.filter(
    (x) => x.assigned_to === null
  ).length;
  const assignedBugsCount = bugsData!.filter(
    (x) => x.assigned_to !== null
  ).length;

  const openBugsCount = bugsData?.filter((x) => {
    return x.status === "Open";
  }).length;
  const inProgressBugsCount = bugsData?.filter((x) => {
    return x.status === "In Progress";
  }).length;
  const resolvedBugsCount = bugsData?.filter((x) => {
    return x.status === "Resolved";
  }).length;

  const resolvedUnresolvedData = [
    {
      name: "Unassigned",
      value: unassignedBugsCount,
    },
    {
      name: "Assigned",
      value: assignedBugsCount,
    },
  ];

  const overallStatusData = [
    {
      name: "Open",
      value: openBugsCount,
    },
    {
      name: "In Progress",
      value: inProgressBugsCount,
    },
    {
      name: "Resolved",
      value: resolvedBugsCount,
    },
  ];

  const statusColors = ["#DC143C", "#FF4500", "#33CC66"];
  const unresolvedResolvedColors = ["#DC143C", "#33CC66"];

  const statusRatio = () => {
    if (resolvedBugsCount && inProgressBugsCount && openBugsCount) {
      const value = (resolvedBugsCount + inProgressBugsCount) / openBugsCount;
      return value;
    }
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  if (projectsData)
    return (
      <>
        <MyAlert
          onClose={(alertState) => {
            setAddBugIsShown(alertState);
          }}
          heading="Create New Bug"
          isShown={addBugIsShown}
        >
          <CreateBug
            projectId={projectId}
            onComplete={(val) => setAddBugIsShown(val)}
          ></CreateBug>
        </MyAlert>
        <Card>
          <CardHeader className="flex flex-row gap-3 items-center justify-center">
            <Heading type="h1">{projectsData!.name}</Heading>
            <ProjectOverallStatusIndicator
              statusRatio={statusRatio()!}
            ></ProjectOverallStatusIndicator>
            <div>
              <MyButton
                onClick={() => {
                  setAddBugIsShown(!addBugIsShown);
                }}
              >
                Create New Bug
              </MyButton>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <Card className="h-fit">
                  <ScrollArea className="h-96 w-96">
                    {bugsData!.map((bug) => (
                      <BugCard key={bug.id} bug={bug}></BugCard>
                    ))}
                  </ScrollArea>
                </Card>
                <Card className="w-96 h-96">
                  <CardHeader>
                    <div className="w-fit mx-auto border-b">
                      <Heading type="h3">Project Description</Heading>
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-96">
                    <Text type="p">{projectsData.description}</Text>
                  </CardContent>
                </Card>
              </div>
              <div className="flex gap-20 justify-center">
                <div className="flex flex-col items-center w-fit">
                  <div className="flex justify-center">
                    <Heading type="h4">Overall Status</Heading>
                  </div>
                  <PieChart width={215} height={215}>
                    <Pie
                      cx="50%"
                      cy="50%"
                      outerRadius={75}
                      data={overallStatusData}
                      label
                    >
                      {overallStatusData.map((data, index) => (
                        <Cell
                          onClick={() => {
                            //add navigation to Resolved, In Progress, or Open bugs for specific project
                            console.log(data);
                          }}
                          key={`cell-${index}`}
                          fill={statusColors[index]}
                        ></Cell>
                      ))}
                    </Pie>
                    <Tooltip></Tooltip>
                  </PieChart>
                </div>
                <div className="flex flex-col items-center w-fit">
                  <div className="flex justify-center">
                    <Heading type="h4">Unresolved to Resolved</Heading>
                  </div>
                  <PieChart width={215} height={215}>
                    <Pie
                      cx="50%"
                      cy="50%"
                      outerRadius={75}
                      data={resolvedUnresolvedData}
                      label
                    >
                      {resolvedUnresolvedData.map((data, index) => (
                        <Cell
                          onClick={() => {
                            //add navigation to un assigned projects on click of entire pie to assign to users
                            console.log(data);
                          }}
                          key={`cell-${index}`}
                          fill={unresolvedResolvedColors[index]}
                        ></Cell>
                      ))}
                    </Pie>
                    <Tooltip></Tooltip>
                  </PieChart>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
};

export default ProjectView;
