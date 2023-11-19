import Heading from "@/components/Heading";
import MyButton from "@/components/MyButton";
import MyInput from "@/components/MyInput";
import { isEmailValid } from "@/helpers/emailHelpers";
import { Eye } from "lucide-react";
import { useState } from "react";
import { supabase } from "..";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import Text from "@/components/Text";

const LoginView = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordIsShown: false,
  });

  const setNewState = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleLoginAsync = async () => {
    const { email, password } = formData;

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
    }
  };

  const resetFields = () => {
    setFormData({
      email: "",
      password: "",
      passwordIsShown: false,
    });
  };

  return (
    <article className=" w-96 flex flex-col justify-center items-center rounded-lg border p-5">
      <div className="border-b mb-2">
        <Heading type="h2">Login</Heading>
      </div>
      <div className="w-full flex flex-col gap-2 mb-2">
        <MyInput
          isDanger={isEmailValid(formData.email) ? "false" : "true"}
          width={"100%"}
          type="text"
          value={formData.email}
          label="Email"
          onChange={(newEmail) => setNewState("email", newEmail)}
        ></MyInput>
        <MyInput
          width={"100%"}
          type={formData.passwordIsShown ? "text" : "password"}
          value={formData.password}
          label={
            <div className="flex items-center gap-2">
              Password
              <Eye
                className="hover:cursor-pointer"
                onClick={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    passwordIsShown: !prevData.passwordIsShown,
                  }))
                }
              ></Eye>
            </div>
          }
          onChange={(newPassword) => setNewState("password", newPassword)}
        ></MyInput>
      </div>
      <div className="flex justify-between w-full">
        <Text type="p">
          Dont have an account?{" "}
          <a href="/signup" className="text-blue-600">
            Sign Up
          </a>
        </Text>
        <MyButton onClick={handleLoginAsync}>Log In</MyButton>
      </div>
    </article>
  );
};

export default LoginView;
