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

  const totalUsersResolvingBugs = bugsData!
    .filter((x) => {
      return x.assigned_to !== null;
    })
    .map((x) => {
      return x.assigned_to;
    });

  const uniqueUserIds = [...new Set(totalUsersResolvingBugs)].length;

  const statusRatio = () => {
    const resolvedInProgressCount = bugsData!.filter((x) => {
      return x.status === "Resolved" || x.status === "In Progress";
    }).length;

    const openCount = bugsData!.filter((x) => {
      return x.status === "Open";
    }).length;

    const value = resolvedInProgressCount / openCount;
    return value;
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
        <Card className=" h-5/6 w-5/6">
          <CardHeader className="flex flex-row gap-3 items-center justify-center">
            <Heading type="h1">{projectsData!.name}</Heading>

            <ProjectOverallStatusIndicator
              statusRatio={statusRatio()}
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
            <div className="flex gap-5">
              <ScrollArea className="h-96 border rounded-lg">
                {bugsData!.map((bug) => (
                  <BugCard key={bug.id} bug={bug}></BugCard>
                ))}
              </ScrollArea>
              <div className="w-1/2 flex flex-col gap-5">
                <Card>
                  <CardHeader>
                    <div className="w-fit mx-auto border-b">
                      <Heading type="h3">Project Description</Heading>
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-96">
                    <Text type="p">{projectsData.description}</Text>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="w-fit mx-auto border-b">
                      <Heading type="h3">Other Project Info</Heading>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Text type="p">
                      {"Created On: " +
                        new Date(projectsData.created_at!).toLocaleString()}
                    </Text>

                    <Text type="p">
                      {"Total bugs: " + bugsData!.length.toString()}
                    </Text>
                    <Text type="p">
                      {"Unassigned bugs: " + unassignedBugsCount.toString()}
                    </Text>
                    <Text type="p">
                      {"Employees involed in resolving bugs: " +
                        uniqueUserIds.toString()}
                    </Text>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    );
};

export default ProjectView;
