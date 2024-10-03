// components
import { Form } from "react-router-dom";
import FormInput from "./FormInput";

export default function Search() {
  return (
    <Form method="post" className="flex gap-2 w-full max-w-96 mx-auto">
      <FormInput name="search" type="text" placheholder="Search" />
      <button className="btn btn-primary md:hidden btn-sm">Search</button>
    </Form>
  );
}
