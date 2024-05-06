import { MdOutlineAccountCircle } from 'react-icons/md'

const Header = () => {
	return (
		<header className='px-5 py-6 flex justify-between bg-secondary items-center'>
			<nav className='w-4 flex flex-col gap-[3px] '>
				<span className='h-[1px] w-full bg-black'></span>
				<span className='h-[1px] w-full bg-black'></span>
				<span className='h-[1px] w-full bg-black'></span>
			</nav>
			<h1 className='text-2xl'>Just-To-do it</h1>
			<MdOutlineAccountCircle />
		</header>
	)
}

export default Header
