// react hooks
import { useEffect, useState } from "react";
// global context hook
import { useGlobalContext } from "../hooks/useGlobalContext";
// react router dom
import { Link } from "react-router-dom";
// react icons
import { FcStackOfPhotos } from "react-icons/fc";
import { FaHeart } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa6";
// components
import NavLinks from "./NavLinks";
import { FaCloudDownloadAlt } from "react-icons/fa";
// firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

const themeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "winter";
};

export default function Navbar() {
  const { likedImages, downloadImages, user, dispatch } = useGlobalContext();
  const [theme, setTheme] = useState(themeFromLocalStorage());
  const toggleTheme = () => {
    const newTheme = theme == "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      toast.success("See you soon");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="bg-base-200">
      <div className="global__container navbar">
        <div className="navbar-start">
          <Link to={"/"} className="hidden md:flex">
            <FcStackOfPhotos className="h-10 w-10" />
          </Link>

          <div className="dropdown md:hidden">
            <div tabIndex={0} role="button" className="btn m-1">
              <FcStackOfPhotos className="h-10 w-10" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal rounded-box">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end gap-x-4">
          <Link to={"/downloadImages"}>
            <div className="indicator">
              <span className="badge indicator-item badge-secondary badge-sm">
                {downloadImages.length}
              </span>
              <FaCloudDownloadAlt className="h-6 w-6 text-success" />
            </div>
          </Link>

          <Link to={"/likedImages"}>
            <div className="indicator">
              <span className="badge indicator-item badge-secondary badge-sm">
                {likedImages.length}
              </span>
              <FaHeart className="h-6 w-6 text-success" />
            </div>
          </Link>

          <div>
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input onClick={toggleTheme} type="checkbox" />

              {/* sun icon */}
              <MdSunny className="swap-on h-7 w-7 fill-current" />
              {/* moon icon */}
              <FaMoon className="swap-off h-7 w-7 fill-current" />
            </label>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="w-10 rounded-full">
                <img alt={user.displayName} src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={signOutUser}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
