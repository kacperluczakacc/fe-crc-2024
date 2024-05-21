import { MdOutlineAccountCircle } from "react-icons/md";

export default function Header () {
  return (
    <header className='flex justify-between items-center bg-light px-5 py-5'>
        <nav className='w-5 flex flex-col gap-[3px]'>
            <span className="h-[2px] w-full bg-black"></span>
            <span className="h-[2px] w-full bg-black"></span>
            <span className="h-[2px] w-full bg-black"></span>
        </nav>

        <h1 className='text-2xl font-semibold'>
            Just To-do it!
        </h1>

        <MdOutlineAccountCircle size={24} />
    </header>
  )
}
