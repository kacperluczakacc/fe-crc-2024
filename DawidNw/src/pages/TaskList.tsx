import Task from '../components/Task'
import { Link } from 'react-router-dom'
import { ROUTE } from '../lib/constants'
import { IoMdAdd } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { useTypedSelector } from '../store';

export default function TaskList() {

    const tasks = useTypedSelector(state => state.tasks.taskList)

    return (
        <>
            <section className='p-4'>

                <div className='flex justify-between items-center mb-4'>
                    <Link to={ROUTE.ADD_TASKS}>
                        <button className='bg-dark px-5 py-4 text-white font-semibold rounded-full flex items-center gap-2' type="button"><IoMdAdd size={24} /> New To-do</button>
                    </Link>

                    <MdFilterList className="cursor-pointer" size={24} />
                </div>

                <p>Overall you have: {tasks.length} tasks</p>

                {tasks.map((task, i) => (
                    <Task key={task.title.replace(/ /g, '-')} title={task.title} author={task.author} deadline={task.deadline} keyindex={i} />
                ))}

            </section>
        </>
    )
}
