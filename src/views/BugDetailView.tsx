import Heading from "@/components/Heading";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useFullBug from "@/hooks/useFullBug";
import Text from "@/components/Text";
import { ScrollArea } from "@/components/ui/scroll-area";
import MyButton from "@/components/MyButton";
import MyAlert from "@/components/MyAlert";
import CreateComment from "@/components/CreateComment";
import { useEffect, useState } from "react";
import BugSeverity from "@/components/BugSeverity";
import BugStatus from "@/components/BugStatus";
import { supabase } from "..";
import UpdateEntity, { UpdateEntityProps } from "@/components/UpdateEntity";
import { severity } from "@/supabase/severity";
import { status } from "@/supabase/status";

const BugDetailView = () => {
  const [newCommentIsShown, setNewCommentIsShown] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [updateParams, setUpdateParams] = useState<UpdateEntityProps>({
    options: [],
    entityId: "",
    table: "bugs",
    propertyToChange: "",
  });

  const [userId, setUserId] = useState("");
  const { bugId } = useParams();
  const { bugData, bugsLoading, error, commentsLoading, commentsData } =
    useFullBug(bugId || "");

  useEffect(() => {
    supabase.auth.getSession().then((x) => {
      setUserId(x.data.session!.user.id);
      console.log(x.data.session?.user.id);
    });

    if (bugData) {
      supabase
        .from("profiles")
        .select("first_name")
        .eq("id", userId)
        .then((x) => {
          if (x.data) {
            setFirstName(x.data[0].first_name!);
          }
        });
      supabase
        .from("profiles")
        .select("last_name")
        .eq("id", userId)
        .then((x) => {
          if (x.data) {
            setLastName(x.data[0].last_name!);
          }
        });
    }
  }, [bugData]);

  const handleUpdate = (options: string[], propertyToChange: string) => {
    setUpdateParams({
      options: options,
      entityId: bug!.id,
      table: "bugs",
      propertyToChange: propertyToChange,
    });
  };

  if (bugsLoading || commentsLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const bug = bugData?.[0];

  return (
    <>
      <UpdateEntity
        propertyToChange={updateParams.propertyToChange}
        entityId={updateParams.entityId}
        onCancel={() => {
          setUpdateParams({
            options: [],
            entityId: "",
            table: "bugs",
            propertyToChange: "",
          });
        }}
        options={updateParams.options}
        table={updateParams.table}
      ></UpdateEntity>
      <MyAlert
        onClose={(alertState) => {
          setNewCommentIsShown(alertState);
        }}
        heading="Create New Comment"
        isShown={newCommentIsShown}
      >
        <CreateComment
          onComplete={setNewCommentIsShown}
          bugId={bug!.id}
        ></CreateComment>
      </MyAlert>
      <Card>
        <CardHeader className="items-center">
          <Heading type="h1">{bug!.title}</Heading>
        </CardHeader>
        <CardContent>
          <div className="flex">
            <Card className=" ms-auto mr-5">
              <div className="flex">
                <div className="m-8 flex flex-col gap-5 w-56">
                  <div className="w-fit mx-auto flex flex-col gap-1 items-center">
                    <div className="border-b ">
                      <Heading type="h3">Assigned To</Heading>
                    </div>
                    <Text type="p">{`${firstName} ${lastName}`}</Text>
                  </div>
                  <div className="w-fit mx-auto flex flex-col gap-1 items-center">
                    <div className="border-b ">
                      <Heading type="h3">Description</Heading>
                    </div>
                    <Text type="p">{`${bug!.description}`}</Text>
                  </div>
                </div>
                <div className="flex flex-col border-l">
                  <CardHeader className="flex flex-row justify-between items-center w-80">
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
                  <CardContent className="w-80">
                    <ScrollArea className="h-96 overflow-auto flex flex-col gap-2 p-5">
                      {commentsData!.length < 1 && "Be the first to comment."}
                      {commentsData!.map((comment) => (
                        <div key={comment.id}>
                          <Text type="p">{`${comment.user_first_name} ${comment.user_last_name}: `}</Text>
                          <Text key={comment.id} type="lead">
                            {`${comment.text}`}
                          </Text>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </div>
              </div>
            </Card>
            <Card className=" w-60 h-fit m-auto mr-5">
              <CardHeader>
                <div className="border-b w-fit mx-auto">
                  <Heading type="h3">Severity</Heading>
                </div>
              </CardHeader>
              <CardContent
                className="flex flex-col items-center gap-4
               justify-center"
              >
                <BugSeverity
                  size="150px"
                  severity={bug!.severity}
                ></BugSeverity>
                <MyButton
                  disabled={bug?.created_by !== userId}
                  onClick={() => {
                    handleUpdate(severity, "severity");
                  }}
                >
                  {bug?.created_by === userId
                    ? "Edit Severity"
                    : "Must Have Permission"}
                </MyButton>
              </CardContent>
            </Card>
            <Card className=" w-60 h-fit m-auto">
              <CardHeader>
                <div className="border-b w-fit mx-auto">
                  <Heading type="h3">Status</Heading>
                </div>
              </CardHeader>
              <CardContent
                className="flex flex-col items-center gap-4
                justify-center"
              >
                <BugStatus size="150px" status={bug!.status}></BugStatus>
                <MyButton
                  disabled={bug?.created_by !== userId}
                  onClick={() => {
                    handleUpdate(status, "status");
                  }}
                >
                  {bug?.created_by === userId
                    ? "Edit Status"
                    : "Must Have Permission"}
                </MyButton>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BugDetailView;
