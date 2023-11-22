import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MyButton from "./MyButton";
import { Milestone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "..";

const MyNavButton = () => {
  const navigate = useNavigate();

  const handleNavigate = (endpoint: string) => {
    navigate(endpoint);
  };

  return (
    <div className="fixed top-5 right-5">
      <Popover>
        <PopoverTrigger>
          <Milestone />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-3 w-fit">
          <MyButton
            onClick={() => {
              handleNavigate("/dashboard");
            }}
          >
            Dashboard
          </MyButton>
          <MyButton
            onClick={() => {
              supabase.auth.signOut();
              handleNavigate("/login");
            }}
          >
            SignOut
          </MyButton>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MyNavButton;
