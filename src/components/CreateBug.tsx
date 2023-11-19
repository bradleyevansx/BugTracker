import React, { useState } from "react";
import MyInput from "./MyInput";
import MyDropdown from "./MyDropdown";
import MyCheckbox from "./MyCheckbox";
import MyButton from "./MyButton";
import { supabase } from "..";

interface Props {
  onComplete: (val: boolean) => void;
  projectId: string;
}

const CreateBug = ({ onComplete, projectId }: Props) => {
  const [title, setTitle] = useState("");
  const [assignedToSelf, setAssignedToSelf] = useState(false);
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");

  const insertBug = async () => {
    //handle situation where not all fields are filled out

    const user = await supabase.auth.getSession();

    const { error } = await supabase.from("bugs").insert({
      title: title,
      description: description,
      severity: severity,
      assigned_to: assignedToSelf ? user.data.session?.user.id : null,
      status: assignedToSelf ? "In Progress" : "Open",
      project_id: projectId,
    });
  };
  supabase.from("bugs");

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
            onComplete(false);
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
