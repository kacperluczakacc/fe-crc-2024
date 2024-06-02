import { Task as TaskType } from "../App";
import axios from "axios";

const api_url = 'http://localhost:3001'

export const getTasks = async () => {
    try {
        const response = await axios.get<TaskType[]>(`${api_url}/Tasks`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const addTask = async (task: TaskType) => {
    try {
        const response = await axios.post<TaskType>(`${api_url}/Tasks`, task)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
export const deleteTask = async (id: string) => {
    try {
        const response = await axios.delete<TaskType>(`${api_url}/Tasks/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}
export default { getTasks, addTask, deleteTask }