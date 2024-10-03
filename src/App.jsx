// react router dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// pages
import { Home, About, Contact, LikedImages } from "./pages";
// layouts
import MainLayout from "./layouts/MainLayout";
// action
import { action as HomeAction } from "./pages/Home";
import DownloadImages from "./pages/DownloadImages";
import ImageInfo from "./pages/ImageInfo";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
    path: "*",
    element: <h1>Not Found!</h1>,
  },
]);
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
