import { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import CreateProject from "./CreateProject";
import { showError } from "../Utils/Toast";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Project() {
    const { projectDetails, setProjectDetails, showModal, setShowModal } = useContext(AppContext);
    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/v1/project/getProjects", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );
                setProjectDetails(res.data.projects)
            } catch (err) {
                showError(err.response?.data?.message || 'Error fetching projects');
            }
        }
        fetchProject();
    }, [token, setProjectDetails])

    const handleDelete = (e, projectId) => {
        e.preventDefault(); // Prevent navigation when delete is clicked
        e.stopPropagation();
        // Add your delete logic here
        console.log('Delete project:', projectId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 relative overflow-hidden">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-100/15 to-purple-100/15 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-200/10 to-indigo-200/10 rounded-full blur-2xl"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-6">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Projects</h1>
                            <p className="text-gray-600">Manage and track your project progress</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-100/50">
                                <span className="text-sm text-gray-600">Total Projects: </span>
                                <span className="font-semibold text-blue-600">{projectDetails.length}</span>
                            </div>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
                            >
                                + Create Project
                            </button>
                        </div>
                    </div>

                    {/* Table Header */}
                    <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-t-xl border border-gray-200/50 p-4">
                        <div className="flex items-center justify-between text-sm font-semibold text-gray-700 uppercase tracking-wide">
                            <div className="flex-1 text-center">Project Name</div>
                            <div className="flex-1 text-center">Deadline</div>
                            <div className="flex-1 text-center">Project Manager</div>
                            <div className="flex-1 text-center">Actions</div>
                        </div>
                    </div>
                </div>

                {/* Projects List */}
                <div className="space-y-2">
                    {projectDetails.length > 0 ? (
                        projectDetails.map((project, index) => (
                            <div
                                key={project._id}
                                className="group bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md rounded-lg border border-gray-200/50 hover:border-blue-200/50 transition-all duration-300 hover:bg-white/90 transform hover:-translate-y-0.5"
                            >
                                <div className="flex items-center justify-between p-4">
                                    <NavLink to="/task" className="flex-1 text-center">
                                        <div className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200 hover:underline">
                                            {project.name}
                                        </div>
                                    </NavLink>
                                    <div className="flex-1 text-center">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50/50 text-blue-700 border border-blue-100/50">
                                            📅 {new Date(project.deadline).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex-1 text-center">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-50/50 text-green-700 border border-green-100/50">
                                            👤 {project.ProjectManager?.name || 'N/A'}
                                        </div>
                                    </div>
                                    <div className="flex-1 text-center">
                                        <button
                                            onClick={(e) => handleDelete(e, project._id)}
                                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-50/50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 hover:scale-110 group-hover:shadow-md border border-red-100/50 hover:border-red-200"
                                            title="Delete Project"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16">
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50 max-w-md mx-auto">
                                <div className="text-6xl mb-4">📋</div>
                                <h3 className="text-lg font-medium text-gray-700 mb-2">No Projects Found</h3>
                                <p className="text-gray-500 text-sm">Create your first project to get started</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <CreateProject onClose={() => setShowModal(false)} />
            )}
        </div>
    );
}

export default Project;