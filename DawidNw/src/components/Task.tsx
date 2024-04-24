import { TaskT } from '../App'

export default function Task({ title, author, deadline }: TaskT) {


  return (
    <>
        <div>
            <p className='text-xl'>{title}</p>
            <p className='font-medium'>{author}</p>
            <p>{deadline}</p>
        </div>
    </>
  )
}
