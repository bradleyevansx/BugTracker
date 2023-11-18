import { ReactNode } from "react";
import { Button } from "./ui/button";

interface Props {
  onClick?: () => void | Promise<void>;
  children: ReactNode;
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

const MyButton = ({ onClick, children, variant, className }: Props) => {
  return (
    <Button className={className} variant={variant} onClick={onClick}>
      {children}
    </Button>
  );
};

export default MyButton;
