// react router dom
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
// pages
import { Home, About, Contact, LikedImages, Login, Register } from "./pages";
// components
import { ProtectedRoutes } from "./components";
// layouts
import MainLayout from "./layouts/MainLayout";
// action
import { action as HomeAction } from "./pages/Home";
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
// donwload image
import DownloadImages from "./pages/DownloadImages";
import ImageInfo from "./pages/ImageInfo";
// global context
import { useGlobalContext } from "./hooks/useGlobalContext";
import { useEffect } from "react";
// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

function App() {
  const { user, dispatch, authReady } = useGlobalContext();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          action: HomeAction,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/likedImages",
          element: <LikedImages />,
        },
        {
          path: "/downloadImages",
          element: <DownloadImages />,
        },
        {
          path: "/imageInfo/:id",
          element: <ImageInfo />,
        },
      ],
    },
    {
      path: "login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
    {
      path: "*",
      element: <h1>Not Found!</h1>,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({ type: "LOGIN", payload: user });
      dispatch({ type: "AUTH_STATE" });
    });
  }, []);
  return <>{authReady && <RouterProvider router={routes} />} </>;
}

export default App;
