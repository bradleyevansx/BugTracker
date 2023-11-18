import { trimString } from "@/helpers/stringHelpers";
import { Tables } from "..";
import Text from "./Text";
import BugStatusIcon from "./BugStatusIcon";
import MyButton from "./MyButton";

interface Props {
  bug: Tables<"bugs">;
}

const BugPreview = ({ bug }: Props) => {
  return (
    <MyButton className="w-full my-2 flex justify-between" variant={"outline"}>
      <Text type="p">{trimString(bug.title, 25)}</Text>
      <BugStatusIcon status={bug.status}></BugStatusIcon>
    </MyButton>
  );
};

export default BugPreview;
