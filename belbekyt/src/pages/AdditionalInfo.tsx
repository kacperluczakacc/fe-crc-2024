export default function AdditionalInfo({ tasks }: { Task[]}){
    return (
        <p>Overall you have: {tasks.length} tasks</p>
    )
}