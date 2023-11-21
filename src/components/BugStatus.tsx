import { CheckCircle2 } from "lucide-react";
import { XCircle } from "lucide-react";
import { CircleDot } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
interface Props {
  status: string;
  size?: string;
}

const BugStatus = ({ status, size = "25px" }: Props) => {
  const getIcon = () => {
    switch (status) {
      case "Open":
        return <XCircle size={size} color="red"></XCircle>;
      case "In Progress":
        return <CircleDot size={size} color="orange"></CircleDot>;
      case "Resolved":
        return <CheckCircle2 size={size} color="green"></CheckCircle2>;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{getIcon()}</TooltipTrigger>
        <TooltipContent>
          <p>{status}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BugStatus;
