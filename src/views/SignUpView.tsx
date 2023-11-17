import Heading from "@/components/Heading";
import { supabase } from "..";
import MyInput from "@/components/MyInput";
import { useState } from "react";
import MyButton from "@/components/MyButton";
import { useToast } from "@/components/ui/use-toast";
import { Eye } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { isEmailValid } from "@/helpers/emailHelpers";
const SignUpView = () => {
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordDuplicate, setPasswordDuplicate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [passwordIsShown, setPasswordIsShown] = useState(false);

  const setNewState = (newValue: string, setter: (arg: string) => void) => {
    setter(newValue);
  };

  const handleSignUpAsync = async () => {
    if (!(email && password && passwordDuplicate && firstName && lastName)) {
      resetFields();
      toast({
        title: "Warning",
        description: "All boxes must be filled out.",
        variant: "destructive",
      });
      return;
    }
    if (password != passwordDuplicate) {
      resetFields();
      toast({
        title: "Warning",
        description: "Password entries must be identical.",
        variant: "destructive",
      });
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error("Authentication error:", error.message);
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    if (data.user) {
      insertNewUserAsync(data.user);
    }
  };

  const insertNewUserAsync = async (user: User) => {
    const { data, error } = await supabase.from("users").upsert([
      {
        id: user?.id,
        email: email,
        first_name: firstName,
        last_name: lastName,
      },
    ]);
    if (error) {
      console.error("Authentication error:", error.message);
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    console.log(data);
  };

  const getPasswordsValid = () => {
    //add validation for passwords being strong enough

    return password === passwordDuplicate;
  };

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setPasswordDuplicate("");
    setFirstName("");
    setLastName("");
    setPasswordIsShown(false);
  };

  return (
    <>
      <article className=" w-80 flex flex-col justify-center items-center rounded-lg border p-5">
        <div className="border-b mb-2">
          <Heading type="h2">Sign Up</Heading>
        </div>
        <div className="w-full flex flex-col gap-2 mb-2">
          <MyInput
            width={"100%"}
            type="text"
            value={firstName}
            label="First Name"
            onChange={(newFirstName) => {
              setNewState(newFirstName, setFirstName);
            }}
          ></MyInput>
          <MyInput
            width={"100%"}
            type="text"
            value={lastName}
            label="Last Name"
            onChange={(newLastName) => {
              setNewState(newLastName, setLastName);
            }}
          ></MyInput>
          <div className="border-b m-2"></div>
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
            isDanger={getPasswordsValid() ? "false" : "true"}
          ></MyInput>
          <MyInput
            width={"100%"}
            type={passwordIsShown ? "text" : "password"}
            value={passwordDuplicate}
            label="Confirm Password"
            onChange={(newPasswordDuplicate) => {
              setNewState(newPasswordDuplicate, setPasswordDuplicate);
            }}
            isDanger={getPasswordsValid() ? "false" : "true"}
          ></MyInput>
        </div>
        <div className="flex justify-between w-full">
          <MyButton
            variant={"ghost"}
            onClick={() => setPasswordIsShown(!passwordIsShown)}
          >
            <Eye></Eye>
          </MyButton>
          <MyButton onClick={handleSignUpAsync}>Sign Up</MyButton>
        </div>
      </article>
    </>
  );
};

export default SignUpView;
