import { TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  statusRatio: number;
}

const ProjectOverallStatusIndicator = ({ statusRatio }: Props) => {
  if (statusRatio > 0.5) {
    return <TrendingUp color="green"></TrendingUp>;
  } else {
    return <TrendingDown color="red"></TrendingDown>;
  }
};

export default ProjectOverallStatusIndicator;
