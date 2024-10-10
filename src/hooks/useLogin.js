import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
// global context
import { useGlobalContext } from "./useGlobalContext";

export const useLogin = () => {
  const { dispatch } = useGlobalContext();
  const loginWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        toast.success(`Welcome !`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Email or Password is incorrect !");
      });
  };

  return { loginWithEmail };
};
