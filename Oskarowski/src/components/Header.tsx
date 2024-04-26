import { MdOutlineAccountCircle as AccountIcon } from "react-icons/md";

function Header() {
    return (
        <header className="flex items-center justify-between px-5">
            <nav className="flex flex-col w-4 gap-1 py-6 ">
                <span className="w-full h-[2px] bg-black"></span>
                <span className="w-full h-[2px] bg-black"></span>
                <span className="w-full h-[2px] bg-black"></span>
            </nav>

            <h1 className="text-2xl">Just To-do it</h1>
            <AccountIcon />
        </header>
    );
}

export { Header };