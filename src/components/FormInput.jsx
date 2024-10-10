// react icons
import { IoMdSearch } from "react-icons/io";
import { FaUser, FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function FormInput({ type, placheholder, name }) {
  return (
    <label className="input input-sm input-bordered flex w-full items-center gap-2 md:input-md">
      <input
        type={type}
        className="grow"
        placeholder={placheholder}
        name={name}
      />
      {placheholder == "Search" && (
        <IoMdSearch className="h-6 w-6 opacity-70" />
      )}
      {placheholder == "Full Name" && <FaUser className="h-5 w-5 opacity-70" />}
      {placheholder == "Email" && <MdEmail className="h-5 w-5 opacity-70" />}
      {placheholder == "Password" && <FaKey className="h-5 w-5 opacity-70" />}
      {placheholder == "Confirm Password" && (
        <FaKey className="h-5 w-5 opacity-70" />
      )}
    </label>
  );
}
