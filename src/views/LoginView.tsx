import Heading from "@/components/Heading";
import MyButton from "@/components/MyButton";
import MyInput from "@/components/MyInput";
import { isEmailValid } from "@/helpers/emailHelpers";
import { Eye } from "lucide-react";
import { useState } from "react";
import { supabase } from "..";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const setNewState = (newValue: string, setter: (arg: string) => void) => {
    setter(newValue);
  };

  const handleLoginAsync = async () => {
    if (!(email && password)) {
      toast({
        title: "Warning",
        description: "Must fill out email and password.",
        variant: "destructive",
      });
      resetFields();
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (data.session && data.user) {
      navigate("/dashboard");
    }
    if (error) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
    }
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setPasswordIsShown(false);
  };

  return (
    <article className=" w-80 flex flex-col justify-center items-center rounded-lg border p-5">
      <div className="border-b mb-2">
        <Heading type="h2">Login</Heading>
      </div>
      <div className="w-full flex flex-col gap-2 mb-2">
        <MyInput
          isDanger={isEmailValid(email) ? "false" : "true"}
          width={"100%"}
          type="text"
          value={email}
          label="Email"
          onChange={(newEmail) => {
            setNewState(newEmail, setEmail);
          }}
        ></MyInput>
        <MyInput
          width={"100%"}
          type={passwordIsShown ? "text" : "password"}
          value={password}
          label="Password"
          onChange={(newPassword) => {
            setNewState(newPassword, setPassword);
          }}
        ></MyInput>
      </div>
      <div className="flex justify-between w-full">
        <MyButton
          variant={"ghost"}
          onClick={() => setPasswordIsShown(!passwordIsShown)}
        >
          <Eye></Eye>
        </MyButton>
        <MyButton onClick={handleLoginAsync}>Log In</MyButton>
      </div>
    </article>
  );
};

export default LoginView;
