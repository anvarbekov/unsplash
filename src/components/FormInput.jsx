// react icons
import { IoMdSearch } from "react-icons/io";

export default function FormInput({ type, placheholder, name }) {
  return (
    <label className="input input-bordered flex items-center gap-2 w-full input-sm md:input-md">
      <input type={type} className="grow" placeholder={placheholder} name={name} />
      <IoMdSearch className="h-6 w-6 opacity-70" />
    </label>
  );
}
