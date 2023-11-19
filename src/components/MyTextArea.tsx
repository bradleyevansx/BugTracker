import { ChangeEvent, ReactNode } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface Props {
  label: ReactNode;
  placeholder?: string;
  width?: string | number;
  value: string;
  onChange: (value: string) => void;
  isDanger?: "true" | "false";
}

const MyTextArea = ({
  onChange,
  label,
  placeholder,
  width,
  value,
  isDanger = "false",
}: Props) => {
  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    onChange(event.target.value);
  }

  return (
    <div className="grid items-center gap-1.5" style={{ width: width }}>
      <Label htmlFor="email">{label}</Label>
      <Textarea
        className={isDanger === "true" ? "border-red-500 border-2" : ""}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      ></Textarea>
    </div>
  );
};

export default MyTextArea;
