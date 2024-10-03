// react router dom
import { Outlet } from "react-router-dom";
// components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <div className="global__container h-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
