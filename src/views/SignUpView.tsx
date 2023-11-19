import Heading from "@/components/Heading";
import { supabase } from "..";
import MyInput from "@/components/MyInput";
import { useState } from "react";
import MyButton from "@/components/MyButton";
import { useToast } from "@/components/ui/use-toast";
import { Eye } from "lucide-react";
import { isEmailValid } from "@/helpers/emailHelpers";
import Text from "@/components/Text";
import { useNavigate } from "react-router-dom";

const SignUpView = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordDuplicate: "",
    firstName: "",
    lastName: "",
    passwordIsShown: false,
  });

  const setNewState = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSignUpAsync = async () => {
    const { email, password, passwordDuplicate, firstName, lastName } =
      formData;

    if (!(email && password && passwordDuplicate && firstName && lastName)) {
      resetFields();
      toast({
        title: "Warning",
        description: "All boxes must be filled out.",
        variant: "destructive",
      });
      return;
    }

    if (password !== passwordDuplicate) {
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
      options: {
        data: {
          email: email,
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (data.session) {
      navigate("/dashboard");
    }

    if (error) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
  };

  const getPasswordsValid = () => {
    return formData.password === formData.passwordDuplicate;
  };

  const resetFields = () => {
    setFormData({
      email: "",
      password: "",
      passwordDuplicate: "",
      firstName: "",
      lastName: "",
      passwordIsShown: false,
    });
  };

  return (
    <>
      <article className=" w-96 flex flex-col justify-center items-center rounded-lg border p-5">
        <div className="border-b mb-2">
          <Heading type="h2">Sign Up</Heading>
        </div>
        <div className="w-full flex flex-col gap-2 mb-2">
          <MyInput
            width={"100%"}
            type="text"
            value={formData.firstName}
            label="First Name"
            onChange={(newFirstName) => setNewState("firstName", newFirstName)}
          ></MyInput>
          <MyInput
            width={"100%"}
            type="text"
            value={formData.lastName}
            label="Last Name"
            onChange={(newLastName) => setNewState("lastName", newLastName)}
          ></MyInput>
          <div className="border-b m-2"></div>
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
            isDanger={getPasswordsValid() ? "false" : "true"}
          ></MyInput>
          <MyInput
            width={"100%"}
            type={formData.passwordIsShown ? "text" : "password"}
            value={formData.passwordDuplicate}
            label="Confirm Password"
            onChange={(newPasswordDuplicate) =>
              setNewState("passwordDuplicate", newPasswordDuplicate)
            }
            isDanger={getPasswordsValid() ? "false" : "true"}
          ></MyInput>
        </div>
        <div className="flex justify-between w-full">
          <Text type="p">
            Already have an account?{" "}
            <a className="text-blue-600" href="/login">
              Login
            </a>
          </Text>
          <MyButton onClick={handleSignUpAsync}>Sign Up</MyButton>
        </div>
      </article>
    </>
  );
};

export default SignUpView;
