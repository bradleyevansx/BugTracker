import { Syringe } from "lucide-react";
import { AlertOctagon } from "lucide-react";
import { BellRing } from "lucide-react";
interface Props {
  severity: string;
}

const getSeverityIcon = (severity: string) => {
  if (severity === "Low") {
    return <BellRing color="green"></BellRing>;
  } else if (severity === "Medium") {
    return <Syringe color="orange"></Syringe>;
  } else {
    return <AlertOctagon color="red"></AlertOctagon>;
  }
};

const BugSeverity = ({ severity }: Props) => {
  return (
    <div className="flex gap-2 items-center">{getSeverityIcon(severity)}</div>
  );
};

export default BugSeverity;
