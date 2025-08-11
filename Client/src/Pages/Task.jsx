import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { Plus, Calendar, User } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { showError, showSuccess } from "../Utils/Toast";
import CreateTask from "./CreateTask";
import TaskCard from "../Components/TaskCard";

function Task() {
    const { projectDetails, currentProject, setCurrentProject, showCreateTask, setShowCreateTask, setTaskColumn } = useContext(AppContext);
    const { projectId } = useParams(); // Get project ID from URL
    const [tasks, setTasks] = useState([])

    const token = localStorage.getItem("token");

    // Get current project by ID from URL
    useEffect(() => {
        const fetchProject = async () => {
            if (projectDetails && projectDetails.length > 0) {
                const project = projectDetails.find(p => p._id === projectId);
                setCurrentProject(project);
            } else {
                // Fallback fetch
                try {
                    const res = await axios.get(`http://localhost:4000/api/v1/project/getproject/${projectId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setCurrentProject(res.data.project);
                } catch (error) {
                    showError(error.response?.data?.message || "Failed to load project.");
                }
            }
        };

        if (projectId) {
            fetchProject();
        }
    }, [projectId, projectDetails, token]);

    // Fetch tasks for this project
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/v1/project/task/${projectId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(res.data.tasks);  // Set tasks in the state
            } catch (err) {
                showError(err.response?.data?.message || "Something went wrong");
            }
        };

        if (projectId) {
            fetchTasks();  // Fetch tasks when projectId changes
        }
    }, [projectId, token]);

    const getTasksByStatus = (status) => {
        return tasks.filter(task => task.status === status);
    };


    const handleCreateTask = (status) => {
        setTaskColumn(status);
        setShowCreateTask(true);
    };

    if (!currentProject) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600">
                Loading project details...
            </div>
        );
    }

    return (
        <div className="h-screen pt-20 bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/20 relative ">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-100/8 to-purple-100/8 rounded-full blur-3xl"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-6">
                {/* Header with Project Info */}
                <div className="mb-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-1">
                            {currentProject.name}
                        </h1>
                        <p className="text-gray-600 mb-3">
                            {currentProject.description || "No description available"}
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-blue-100/30 shadow-sm">
                                <Calendar size={16} className="text-blue-500" />
                                <span className="text-gray-600">Deadline:</span>
                                <span className="font-medium text-blue-600">
                                    {new Date(currentProject.deadline).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-green-100/30 shadow-sm">
                                <User size={16} className="text-green-500" />
                                <span className="text-gray-600">Manager:</span>
                                <span className="font-medium text-green-600">
                                    {currentProject.ProjectManager?.name || 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Task Button */}
                <div className="mb-6 flex justify-start">
                    <button
                        onClick={() => handleCreateTask('todo')}
                        className="bg-white/50 hover:bg-white/70 border border-gray-200/50 hover:border-gray-300/70 rounded-lg px-4 py-2.5 transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                        <div className="flex items-center gap-2 text-gray-600 group-hover:text-gray-800">
                            <Plus size={16} className="group-hover:scale-105 transition-transform duration-200" />
                            <span className="text-sm font-medium">Add New Task</span>
                        </div>
                    </button>
                </div>

                {/* Kanban Board */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Todo Column */}
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl border border-gray-200/40 overflow-hidden shadow-sm">
                        <div className="bg-white/50 backdrop-blur-sm p-4 border-b border-gray-200/30">
                            <h3 className="font-semibold text-gray-800 flex items-center justify-between">
                                <span>Todo</span>
                                <span className="bg-gray-100/70 text-gray-600 text-xs px-2 py-1 rounded-full">
                                    {getTasksByStatus('todo').length}
                                </span>
                            </h3>
                        </div>
                        <div className="p-4 space-y-3 min-h-[400px]">
                            {getTasksByStatus('todo').map(task => (
                                <TaskCard key={task._id} task={task} />
                            ))}
                        </div>
                    </div>

                    {/* In Progress Column */}
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl border border-gray-200/40 overflow-hidden shadow-sm">
                        <div className="bg-white/50 backdrop-blur-sm p-4 border-b border-gray-200/30">
                            <h3 className="font-semibold text-gray-800 flex items-center justify-between">
                                <span>In Progress</span>
                                <span className="bg-blue-100/70 text-blue-600 text-xs px-2 py-1 rounded-full">
                                    {getTasksByStatus('inprogress').length}
                                </span>
                            </h3>
                        </div>
                        <div className="p-4 space-y-3 min-h-[400px]">
                            {getTasksByStatus('inprogress').map(task => (
                                <TaskCard key={task._id} task={task} />
                            ))}
                        </div>
                    </div>

                    {/* Completed Column */}
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl border border-gray-200/40 overflow-hidden shadow-sm">
                        <div className="bg-white/50 backdrop-blur-sm p-4 border-b border-gray-200/30">
                            <h3 className="font-semibold text-gray-800 flex items-center justify-between">
                                <span>Completed</span>
                                <span className="bg-green-100/70 text-green-600 text-xs px-2 py-1 rounded-full">
                                    {getTasksByStatus('completed').length}
                                </span>
                            </h3>
                        </div>
                        <div className="p-4 space-y-3 min-h-[400px]">
                            {getTasksByStatus('completed').map(task => (
                                <TaskCard key={task._id} task={task} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Task Modal Placeholder */}
            {showCreateTask && <CreateTask></CreateTask>}
        </div>
    );
}

export default Task;