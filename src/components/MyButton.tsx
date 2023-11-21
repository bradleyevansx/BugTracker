import { ReactNode } from "react";
import { Button } from "./ui/button";

interface Props {
  onClick?: () => void | Promise<void>;
  children: ReactNode;
  disabled?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  className?: string;
}

const MyButton = ({
  onClick,
  children,
  variant,
  className,
  disabled = false,
}: Props) => {
  return (
    <Button
      disabled={disabled}
      className={className}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default MyButton;
