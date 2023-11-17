import { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
  label: string;
  placeholder?: string;
  width?: string | number;
  type: string;
  value: string;
  onChange: (value: string) => void;
  isDanger?: "true" | "false";
}

const MyInput = ({
  onChange,
  label,
  placeholder,
  width,
  type,
  value,
  isDanger = "false",
}: Props) => {
  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.target.value);
  }

  return (
    <div className="grid items-center gap-1.5" style={{ width: width }}>
      <Label htmlFor="email">{label}</Label>
      <Input
        className={isDanger === "true" ? "border-red-500 border-2" : ""}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleInputChange}
      ></Input>
    </div>
  );
};

export default MyInput;
