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
}

const MyButton = ({ onClick, children, variant }: Props) => {
  return (
    <Button variant={variant} onClick={onClick}>
      {children}
    </Button>
  );
};

export default MyButton;
