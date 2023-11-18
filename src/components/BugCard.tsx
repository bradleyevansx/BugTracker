import { CircleIcon, StarIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Tables } from "..";
import BugSeverity from "./BugSeverity";

interface Props {
  bug: Tables<"bugs">;
}

const BugCard = ({ bug }: Props) => {
  return (
    <Card className="m-5">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{bug.title}</CardTitle>
          <CardDescription>{bug.description}</CardDescription>
        </div>
        <Button variant="secondary" className="shadow-none">
          See Full Details
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <BugSeverity severity={bug.severity}></BugSeverity>
          </div>
          <div className="flex items-center">
            Assigned to: {bug.assigned_to}
          </div>
          <div className="flex items-center">
            Created on: {new Date(bug.created_on).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BugCard;
