import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Tables, supabase } from "..";
import BugSeverity from "./BugSeverity";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  bug: Tables<"bugs">;
}

const BugCard = ({ bug }: Props) => {
  const navigate = useNavigate();
  const [assignedUserProfile, setAssignedUserProfile] =
    useState<Tables<"profiles"> | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!bug.assigned_to) {
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", bug.assigned_to)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error.message);
      } else {
        setAssignedUserProfile(data);
      }
    };

    if (bug.assigned_to) {
      fetchUserProfile();
    }
  }, [bug.assigned_to]);

  function handleSeeFullDetails() {
    navigate(`/bug/${bug.id}`);
  }

  return (
    <Card className="m-5">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{bug.title}</CardTitle>
          <CardDescription>{bug.description}</CardDescription>
        </div>
        <Button
          variant="secondary"
          className="shadow-none"
          onClick={handleSeeFullDetails}
        >
          See Full Details
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground justify-between">
          <div className="flex items-center gap-2">
            <BugSeverity severity={bug.severity}></BugSeverity>
            Assigned to:{" "}
            {assignedUserProfile
              ? assignedUserProfile?.first_name +
                " " +
                assignedUserProfile?.last_name
              : "No assigned user."}
          </div>
          <div className="flex items-center">
            Created on: {new Date(bug.created_on!).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BugCard;
