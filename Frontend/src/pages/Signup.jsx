import { Heading } from "../components/Header";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { ButtonWarning } from "../components/ButtonWarning";
import { useState } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg p-8 shadow-md w-1/4">
        <div className="flex flex-col items-center my-2">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create your account"} />
        </div>
        <InputBox
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          name={"Firstname"}
          boxname={"Enter your Firstname here"}
        />
        <InputBox
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          name={"Lastname"}
          boxname={"Enter your Lastname here"}
        />
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type={"email"}
          name={"Email"}
          boxname={"Enter your email here"}
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type={"password"}
          name={"Password"}
          boxname={"Enter your Password here"}
        />
        <div className="flex justify-center">
          {" "}
          {/* Centering the button */}
          {/* <input
            onClick={() =>
              axios.post("http://localhost:3000/api/v1/user/signup", {
                firstName,
                lastName,
                email,
                password,
              })
            }
            className="bg-black text-white px-4 py-2 border border-white rounded my-2 flex items-center justify-center w-full"
            type="button"
            value="SignUp"
          /> */}
          <Button
            onPress={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  firstName,
                  lastName,
                  username,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}
            label={"SignUp"}
          ></Button>
        </div>
        <ButtonWarning
          label={"Already have an account?"}
          buttonText={"Signin"}
          to={"/signin"}
        />
      </div>
    </div>
  );
};
