import { Button, Datepicker } from "flowbite-react";
import { HiSearch } from "react-icons/hi";

export default function SearchTodo() {
  return (
    <form className="flex w-full">
      <Datepicker className="flex-grow"   />
      <Button type="submit" size="md" className="rounded-l-none relative right-1">
        <HiSearch size={20} />
      </Button>
    </form>
  );
}
