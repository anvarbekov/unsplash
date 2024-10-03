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

const themeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "winter";
};

export default function Navbar() {
  const { likedImages, downloadImages } = useGlobalContext();
  const [theme, setTheme] = useState(themeFromLocalStorage());
  const toggleTheme = () => {
    const newTheme = theme == "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="bg-base-200">
      <div className="navbar global__container">
        <div className="navbar-start">
          <Link to={"/"} className="hidden md:flex">
            <FcStackOfPhotos className="w-10 h-10" />
          </Link>

          <div className="dropdown md:hidden">
            <div tabIndex={0} role="button" className="btn m-1">
              <FcStackOfPhotos className="w-10 h-10" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
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
              <span className="indicator-item badge badge-sm badge-secondary">
                {downloadImages.length}
              </span>
              <FaCloudDownloadAlt className="w-6 h-6 text-success" />
            </div>
          </Link>

          <Link to={"/likedImages"}>
            <div className="indicator">
              <span className="indicator-item badge badge-sm badge-secondary">
                {likedImages.length}
              </span>
              <FaHeart className="w-6 h-6 text-success" />
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
        </div>
      </div>
    </header>
  );
}
