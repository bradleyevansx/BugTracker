import { Checkbox } from "./ui/checkbox";

interface Props {
  label: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
}

const MyCheckbox = ({ onChange, label, value }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={value}
        onCheckedChange={() => {
          onChange(!value);
        }}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

export default MyCheckbox;
