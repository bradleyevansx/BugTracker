import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";
import MyButton from "./MyButton";
import { X } from "lucide-react";

interface Props {
  onClose: (alertState: boolean) => void;
  isShown: boolean;
  heading: ReactNode;
  children: ReactNode;
}

const MyAlert = ({ heading, children, isShown, onClose }: Props) => {
  return (
    <AlertDialog open={isShown}>
      <AlertDialogContent className="w-fit">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex justify-center items-center">
              {heading}
              <MyButton
                onClick={() => onClose(false)}
                className="w-fit fixed right-5"
                variant={"ghost"}
              >
                <X></X>
              </MyButton>
            </div>
          </AlertDialogTitle>
          {children}
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MyAlert;
