import { FcGoogle } from "react-icons/fc";

import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";

// useeffect
import { useEffect } from "react";

// register hook
import { useRegister } from "../hooks/useRegister";
// login hook
import { useLogin } from "../hooks/useLogin";

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  return {
    email,
    password,
  };
};

export default function Login() {
  const inputData = useActionData();
  const { registerWithGoogle } = useRegister();
  const { loginWithEmail } = useLogin();

  useEffect(() => {
    if (inputData) {
      loginWithEmail(inputData.email, inputData.password);
    }
  }, [inputData]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url(https://static.vecteezy.com/system/resources/previews/036/226/872/non_2x/ai-generated-nature-landscapes-background-free-photo.jpg)] bg-cover bg-center bg-no-repeat">
      <div className="fixed h-full w-full bg-black opacity-50"></div>

      <Form
        className="global__container z-50 m-5 w-[500px] rounded-md bg-black bg-opacity-40 p-5 md:m-0"
        method="post"
      >
        <h1 className="mb-4 text-center text-2xl text-white md:text-4xl">
          Login
        </h1>
        <div className="flex h-full flex-col items-center gap-5">
          <FormInput name="email" placheholder="Email" type="text" />
          <FormInput name="password" placheholder="Password" type="text" />
          <div className="flex w-full justify-between text-white">
            <p>forget password?</p>
            <Link className="link link-info" to="/register">
              You don't have account yet?
            </Link>
          </div>
          <div className="mb-3 flex w-full flex-col gap-4 md:flex-row">
            <button
              type="submit"
              className="btn btn-primary btn-sm grow md:btn-md"
            >
              Login
            </button>
            <button
              onClick={registerWithGoogle}
              type="button"
              className="btn btn-primary btn-sm grow md:btn-md"
            >
              <span>Google</span> <FcGoogle />
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
