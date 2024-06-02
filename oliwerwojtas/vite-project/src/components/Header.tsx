import { MdOutlineAccountCircle } from "react-icons/md";
function Header() {
  return (
    <header className="flex justify-between items-center bg-secondary px-5 py-6">
      <nav className="w-4 flex flex-col gap-1">
        <span className="h-[1px] w-full bg-black"></span>
        <span className="h-[1px] w-full bg-black"></span>
        <span className="h-[1px] w-full bg-black"></span>
      </nav>
      <h1 className="text-2xl">Just To-do it!</h1>
      <MdOutlineAccountCircle />
    </header>
  );
}
export default Header;
