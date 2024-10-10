import { FcGoogle } from "react-icons/fc";

import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
// register hook
import { useRegister } from "../hooks/useRegister";
import { toast } from "react-toastify";
import { useEffect } from "react";

// action
export const action = async ({ request }) => {
  const form = await request.formData();
  const fullName = form.get("fullName");
  const email = form.get("email");
  const password = form.get("password");
  const confirm_password = form.get("confirm_password");

  if (password == confirm_password) {
    return {
      fullName,
      email,
      password,
      confirm_password,
    };
  } else {
    toast.warn("Password is not equal !");
    return null;
  }
};

export default function Register() {
  const inputData = useActionData();
  const { registerWithGoogle, registerWithEmail } = useRegister();

  useEffect(() => {
    if (inputData) {
      registerWithEmail(
        inputData.fullName,
        inputData.email,
        inputData.password,
      );
    }
  }, [inputData]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url(https://static.vecteezy.com/system/resources/previews/036/226/872/non_2x/ai-generated-nature-landscapes-background-free-photo.jpg)] bg-cover bg-center bg-no-repeat">
      <div className="fixed h-full w-full bg-black opacity-50"></div>
      <Form
        className="global__container relative z-50 m-5 w-[500px] rounded-md bg-black bg-opacity-40 p-5 md:m-0"
        method="post"
      >
        <h1 className="mb-4 text-center text-2xl text-white md:text-4xl">
          Register
        </h1>
        <div className="flex h-full flex-col items-center gap-5">
          <FormInput name="fullName" placheholder="Full Name" type="text" />
          <FormInput name="email" placheholder="Email" type="text" />
          <FormInput name="password" placheholder="Password" type="text" />
          <FormInput
            name="confirm_password"
            placheholder="Confirm Password"
            type="text"
          />
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <button
              type="submit"
              className="btn btn-primary btn-sm grow md:btn-md"
            >
              Register
            </button>
            <button
              onClick={registerWithGoogle}
              type="button"
              className="btn btn-primary btn-sm grow md:btn-md"
            >
              <span>Google</span> <FcGoogle />
            </button>
          </div>
          <Link className="link link-info" to="/login">
            You already have account !
          </Link>
        </div>
      </Form>
    </div>
  );
}
