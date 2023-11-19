import Heading from "@/components/Heading";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useFullBug from "@/hooks/useFullBug";
import Text from "@/components/Text";
import { ScrollArea } from "@/components/ui/scroll-area";
import MyButton from "@/components/MyButton";
import MyAlert from "@/components/MyAlert";
import CreateComment from "@/components/CreateComment";
import { useState } from "react";

const BugDetailView = () => {
  const [newCommentIsShown, setNewCommentIsShown] = useState(false);
  const { bugId } = useParams();
  const { bugData, bugsLoading, error, commentsLoading, commentsData } =
    useFullBug(bugId || "");

  if (bugsLoading || commentsLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const bug = bugData?.[0];

  return (
    <>
      <MyAlert
        onClose={(alertState) => {
          setNewCommentIsShown(alertState);
        }}
        heading="Create New Comment"
        isShown={newCommentIsShown}
      >
        <CreateComment
          onComplete={setNewCommentIsShown}
          bugId={bug.id}
        ></CreateComment>
      </MyAlert>
      <Card>
        <CardHeader>
          <Heading type="h1">{bug.title}</Heading>
        </CardHeader>
        <CardContent>
          <div className="flex">
            <Card className="max-w 96">
              <CardHeader>
                <div className="border-b w-fit">
                  <Heading type="h3">Bug Details</Heading>
                </div>
              </CardHeader>
              <CardContent>
                <Text type="p">{`Description: ${bug.description}`}</Text>
                <Text type="p">{`Status: ${bug.status}`}</Text>
                <Text type="p">{`Severity: ${bug.severity}`}</Text>
              </CardContent>
            </Card>
            <Card className=" ms-auto w-80">
              <CardHeader className="flex flex-row justify-between items-center">
                <div className="border-b w-fit">
                  <Heading type="h3">Comments</Heading>
                </div>{" "}
                <MyButton
                  variant={"outline"}
                  onClick={() => setNewCommentIsShown(true)}
                >
                  New
                </MyButton>
              </CardHeader>
              <ScrollArea className="h-96 overflow-auto flex flex-col gap-2 p-5">
                {commentsData.map((comment) => (
                  <div key={comment.id}>
                    <Text type="p">{`${comment.user_first_name} ${comment.user_last_name}: `}</Text>
                    <Text key={comment.id} type="lead">
                      {`${comment.text}`}
                    </Text>
                  </div>
                ))}
              </ScrollArea>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BugDetailView;
