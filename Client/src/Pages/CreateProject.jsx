import { useState, useEffect, useContext } from "react";
import { showError, showSuccess } from "../Utils/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

function CreateProject({ onClose }){
    const {projectData ,setProjectData}=useContext(AppContext)
    const navigate = useNavigate();
    //FOR POPU ANIMATION
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        // Wait for animation to complete before calling onClose
        setTimeout(() => {
            onClose();
        }, 1000);
    };

    // SENDING RESPONSE TO BACKEND
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, description, ProjectManager, deadline } = projectData
        const payload = { name, description, ProjectManager, deadline }
        try {
            const URL = "http://localhost:4000/api/v1/project/createproject"
            const res = await axios.post(URL, payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            showSuccess(res.data.message)
            setProjectData({ name: "", description: "", ProjectManager: "", deadline: "" })
            navigate('/Project')
            onClose()
        } catch (err) {
            console.error("Project creation failed:", err);
            showError(err.response?.data?.message || "Something went wrong");
        }

    };

    const handleInputChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value })
    };

    return (
        <div className={`fixed inset-0  transition-opacity duration-200 ease-out flex items-center justify-center z-50 p-4 ${isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}>
            <div className={`bg-white p-6 rounded-xl shadow-xl max-w-4xl w-full mx-auto relative transition-all duration-200 ease-out ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
                }`}>

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Create New Project</h1>
                    <p className="text-gray-500 text-sm">Fill in the details below to start your project</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-left text-gray-700 mb-2">
                            Project Name
                        </label>
                        <input
                            name="name"
                            value={projectData.name}
                            onChange={handleInputChange}
                            placeholder="Enter project name"
                            type="text"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-left font-medium text-gray-700 mb-2">
                            Manager Name
                        </label>
                        <input
                            name="ProjectManager"
                            value={projectData.ProjectManager}
                            onChange={handleInputChange}
                            placeholder="Enter manager name"
                            type="text"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-left text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={projectData.description}
                            onChange={handleInputChange}
                            placeholder="Brief description of your project"
                            rows="2"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-left text-gray-700 mb-2">
                            Deadline
                        </label>
                        <input
                            name="deadline"
                            value={projectData.deadline}
                            onChange={handleInputChange}
                            type="date"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                        />
                    </div>

                    <div className="col-span-2 flex space-x-4 pt-4">
                        <button
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            Create Project
                        </button>
                        <button
                            onClick={handleClose}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProject;