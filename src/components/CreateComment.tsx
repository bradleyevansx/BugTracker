import { useState } from "react";
import { supabase } from "..";
import { useNavigate } from "react-router-dom";
import MyTextArea from "./MyTextArea";
import MyButton from "./MyButton";
import { useToast } from "./ui/use-toast";
import { useInsert } from "@/hooks/useInsert";

interface Props {
  bugId: string;
  onComplete: (state: boolean) => void;
}

const CreateComment = ({ bugId, onComplete }: Props) => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const { toast } = useToast();
  const { mutate: insertCommentMutation } = useInsert("comments");

  const insertComment = async () => {
    const user = await supabase.auth.getSession();

    if (!user.data.session) {
      navigate("/login");
      return;
    }

    if (!text || text.length < 10) {
      toast({
        title: "Warning",
        description: "Comment must be at least 10 characters long.",
      });
      return;
    }

    insertCommentMutation(
      {
        bug_id: bugId,
        user_id: user.data.session.user.id,
        user_last_name: user.data.session.user.user_metadata.last_name,
        user_first_name: user.data.session.user.user_metadata.first_name,
        text: text,
      },
      {
        onSuccess() {
          onComplete(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <MyTextArea
        width={"400px"}
        placeholder="Type your comment here."
        label="New Comment"
        value={text}
        onChange={setText}
      ></MyTextArea>
      <MyButton onClick={insertComment}>Enter</MyButton>
    </div>
  );
};

export default CreateComment;
