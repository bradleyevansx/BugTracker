import React, { useState } from "react";
import MyInput from "./MyInput";
import MyDropdown from "./MyDropdown";
import MyCheckbox from "./MyCheckbox";
import MyButton from "./MyButton";
import { supabase } from "..";
import { useInsert } from "@/hooks/useInsert";

interface Props {
  onComplete: (val: boolean) => void;
  projectId: string;
}

const CreateBug = ({ onComplete, projectId }: Props) => {
  const [title, setTitle] = useState("");
  const [assignedToSelf, setAssignedToSelf] = useState(false);
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");

  const { mutate } = useInsert("bugs");

  const insertBug = async () => {
    //handle situation where not all fields are filled out

    const user = await supabase.auth.getSession();

    mutate(
      {
        title: title,
        description: description,
        severity: severity,
        assigned_to: assignedToSelf ? user.data.session?.user.id : null,
        status: assignedToSelf ? "In Progress" : "Open",
        project_id: projectId,
        created_by: user.data.session?.user.id,
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
      <MyInput
        width={"100%"}
        value={title}
        type="text"
        label="Title"
        onChange={setTitle}
      ></MyInput>
      <MyInput
        value={description}
        type="text"
        label="Description"
        onChange={setDescription}
      ></MyInput>
      <div className="flex justify-between gap-5">
        <MyDropdown
          message="Choose severity"
          onSelected={setSeverity}
          options={["High", "Medium", "Low"]}
        ></MyDropdown>
        <MyCheckbox
          onChange={setAssignedToSelf}
          value={assignedToSelf}
          label="Assign to self"
        ></MyCheckbox>
        <MyButton
          onClick={() => {
            insertBug();
          }}
        >
          Submit
        </MyButton>
      </div>
    </div>
  );
};

export default CreateBug;
