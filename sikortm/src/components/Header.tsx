
import { MdOutlineAccountCircle as AccountIcon } from "react-icons/md";

export default function Header() {
    return (
        <header className="flex justify-between items-center bg-secondary px-5 py-6">
            <nav className="w-5 flex flex-col gap-[3px] cursor-pointer">
                <span className="h-[2px] w-full bg-black"></span>
                <span className="h-[2px] w-full bg-black"></span>
                <span className="h-[2px] w-full bg-black"></span>
            </nav>
            <h1 className="text-2xl">Just To-do it!</h1>
            <AccountIcon className="cursor-pointer" size={24} />
        </header>
    )
}