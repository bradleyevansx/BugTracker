import { CheckCircle2 } from "lucide-react";
import { XCircle } from "lucide-react";
import { CircleDot } from "lucide-react";
interface Props {
  status: string;
}

const BugStatusIcon = ({ status }: Props) => {
  switch (status) {
    case "Open":
      return <XCircle color="red"></XCircle>;
    case "In Progress":
      return <CircleDot color="orange"></CircleDot>;
    case "Resolved":
      return <CheckCircle2 color="green"></CheckCircle2>;
  }
};

export default BugStatusIcon;
