// react icons
import { FaInstagram, FaYoutube, FaTelegram, FaUser } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-base-200">
      <footer className="footer global__container items-center p-4">
        <aside className="grid-flow-col items-center">
          <FaUser className="text-2xl" />
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a href="#" className="text-2xl cursor-pointer">
            <FaYoutube />
          </a>
          <a href="#" className="text-2xl cursor-pointer">
            <FaTelegram />
          </a>
          <a href="#" className="text-2xl cursor-pointer">
            <FaInstagram />
          </a>
        </nav>
      </footer>
    </div>
  );
}
