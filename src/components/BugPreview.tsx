import { Tables } from "..";
import Text from "./Text";

interface Props {
  bug: Tables<"bugs">;
}

const BugPreview = ({ bug }: Props) => {
  return <Text type="p">{bug.title}</Text>;
};

export default BugPreview;
