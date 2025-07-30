import { useState } from "react";
import CreateProject from "./CreateProject";
function LandingPage() {
        const [showModal, setShowModal] = useState(false);
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-br from-gray-50 to-white relative">
            {/* Subtle background decoration */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
            <div className="absolute bottom-20 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-15"></div>

            <div className="text-center z-10">
                <h1 className="text-6xl font-bold  mb-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                    Build Your Project
                </h1>
                <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto">
                    Start creating something amazing today. Your next great project is just one click away.
                </p>

                <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-4 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
                    Create Project
                </button>
                {showModal && (
                    <CreateProject onClose={() => setShowModal(false)} />)}
            </div>
        </div>
    )
}
export default LandingPage;