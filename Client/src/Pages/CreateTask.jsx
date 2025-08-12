import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { showSuccess, showError } from "../Utils/Toast";
function CreateTask() {
    const { taskColumn, createTasks, setCreateTasks,setTaskChanged, setShowCreateTask } = useContext(AppContext)
    const { projectId } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { description, dueDate, assignedTo, priority } = createTasks;
        const payload = {
            description,
            dueDate,
            assignedTo,
            priority,
            projectId
        }
        try {
            const res = await axios.post(`http://localhost:4000/api/v1/project/${projectId}/createtask`, payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            setCreateTasks({ description: "", dueDate: "", assignedTo: "", priority: "" });
            setTaskChanged(prev => !prev);
            setShowCreateTask(false)
            showSuccess(res.data.message)

        } catch (err) {
            console.error("Task creation failed:", err);
            showError(err.response?.data?.message || "Something went wrong");

        }


    }

    const handleCancel = () => {
        setShowCreateTask(false)
    }

    const handleChange = (e) => {
        setCreateTasks({ ...createTasks, [e.target.name]: e.target.value })
    }
    return (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Create Task in {taskColumn}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                <label className="block text-sm font-medium text-left text-gray-700 mb-2">Description</label>
                <input
                    name="description"
                    value={createTasks.description}
                    onChange={handleChange}
                    placeholder="Enter task"
                    type="text"
                    required
                    className="w-full p-3 border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                >
                </input>
                <label className="block text-sm font-medium text-left text-gray-700 mb-2">Due Date</label>
                <input
                    name="dueDate"
                    value={createTasks.dueDate}
                    onChange={handleChange}
                    placeholder="Enter task"
                    type="date"
                    required
                    className="w-full p-3 border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                >
                </input>
                <label className="block text-sm font-medium text-left text-gray-700 mb-2">Priority</label>
                <select
                    name="priority"
                    value={createTasks.priority}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"

                >
                    <option value="" disabled>Select priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <label className="block text-sm font-medium text-left text-gray-700 mb-2">Assigned To</label>
                <input
                    name="assignedTo"
                    value={createTasks.assignedTo}
                    onChange={handleChange}
                    placeholder="Enter a name"
                    type="text"
                    required
                    className="w-full p-3 border border-gray-300/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                >
                </input>
 
            </form>
            <div className="flex gap-3 justify-end mt-4">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2  text-gray-600 hover:text-gray-800 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Create Task
                </button>
            </div>
        </div>
    </div>)

}
export default CreateTask;