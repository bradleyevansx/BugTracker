import { useState } from "react";
import MyAlert from "./MyAlert";
import MyDropdown from "./MyDropdown";
import { useUpdate } from "@/hooks/useUpdate";
import { useToast } from "./ui/use-toast";
import MyButton from "./MyButton";

export interface UpdateEntityProps {
  entityId: string;
  propertyToChange: string;
  options: string[];
  onCancel?: () => void;
  table: string;
}

const UpdateEntity = ({
  entityId,
  propertyToChange,
  options,
  onCancel: onClose = () => {},
  table,
}: UpdateEntityProps) => {
  const isShown = entityId ? true : false;
  const [newValue, setNewValue] = useState("");

  const { toast } = useToast();

  const { mutate } = useUpdate(table);

  const handleSubmit = () => {
    if (newValue === "") {
      toast({
        title: "Warning",
        description: "Must choose new value.",
        variant: "destructive",
      });
      return;
    }

    mutate(
      {
        id: entityId,
        propertyToChange: propertyToChange,
        newValue: newValue,
      },
      {
        onSuccess() {
          toast({
            title: "Success",
            description: "Entity updated.",
          });
          onClose();
        },
      }
    );
  };

  return (
    <MyAlert
      onClose={onClose}
      heading={`Update ${propertyToChange}`}
      isShown={isShown}
    >
      <div className="mx-auto h-16 gap-2 flex items-center justify-center">
        <MyDropdown
          onSelected={setNewValue}
          options={options}
          message={"Make selection."}
        ></MyDropdown>
        <MyButton onClick={handleSubmit}>Submit Change</MyButton>
      </div>
    </MyAlert>
  );
};

export default UpdateEntity;
