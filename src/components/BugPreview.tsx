import { trimString } from "@/helpers/stringHelpers";
import { Tables } from "..";
import Text from "./Text";
import BugStatusIcon from "./BugStatusIcon";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

interface Props {
  bug: Tables<"bugs">;
}

const BugPreview = ({ bug }: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/bug/${bug.id}`);
  };

  return (
    <MyButton
      className="w-full my-2 flex justify-between"
      variant={"outline"}
      onClick={handleClick}
    >
      <Text type="p">{trimString(bug.title, 25)}</Text>
      <BugStatusIcon status={bug.status}></BugStatusIcon>
    </MyButton>
  );
};

export default BugPreview;
