import { Heading } from "../components/Header";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { ButtonWarning } from "../components/ButtonWarning";
export const Signin = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg p-8 shadow-md w-1/4">
        <div className="flex flex-col items-center my-2">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter credentials to access your account"} />
        </div>

        <InputBox
          type={"email"}
          name={"Email"}
          boxname={"Enter your email here"}
        />
        <InputBox
          type={"password"}
          name={"Password"}
          boxname={"Enter your Password here"}
        />
        <div className="flex justify-center">
          {" "}
          {/* Centering the button */}
          <input
            className="bg-black text-white px-4 py-2 border border-white rounded my-2 flex items-center justify-center w-full"
            type="button"
            value="SignUp"
          />
        </div>
        <ButtonWarning
          label={"Don't have an account?"}
          buttonText={"Signup"}
          to={"/signup"}
        />
      </div>
    </div>
  );
};
