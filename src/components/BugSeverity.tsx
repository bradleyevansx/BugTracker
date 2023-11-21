import { Syringe } from "lucide-react";
import { AlertOctagon } from "lucide-react";
import { BellRing } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
interface Props {
  severity: string;
  size?: string;
}

const BugSeverity = ({ severity, size = "25px" }: Props) => {
  const getSeverityIcon = () => {
    if (severity === "Low") {
      return <BellRing size={size} color="green"></BellRing>;
    } else if (severity === "Medium") {
      return <Syringe size={size} color="orange"></Syringe>;
    } else {
      return <AlertOctagon size={size} color="red"></AlertOctagon>;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{getSeverityIcon()}</TooltipTrigger>
        <TooltipContent>
          <p>{severity}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BugSeverity;
