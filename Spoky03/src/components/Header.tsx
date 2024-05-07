import { MdOutlineAccountCircle as AccountIcon } from 'react-icons/md'
import { Link } from 'react-router-dom'
export const Header = () => {
    return (
        <header className='bg-secondary text-slate-900 flex justify-between items-center px-5 py-6'>

            <nav className="w-4 flex flex-col gap-0.5">
                <span className="h-0.5 w-full bg-black"></span>
                <span className="h-0.5 w-full bg-black"></span>
                <span className="h-0.5 w-full bg-black"></span>
            </nav>
            <h1 className="text-2xl">
                <Link to='/'>Just To-Do it!</Link>
            </h1>
            <AccountIcon className='text-2xl '/>


        </header>
    )
}