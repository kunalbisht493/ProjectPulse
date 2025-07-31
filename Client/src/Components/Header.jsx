import { useNavigate } from "react-router-dom";
import { showSuccess } from "../Utils/Toast";

function Header({setIsLoggedIn}) {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false)
        showSuccess("Logout Successfully")
        navigate('/auth')
    };

    return (
        <>
            <header className="flex items-center justify-between bg-gradient-to-b from-blue-500 to-blue-600 h-18 px-14">
                <div className="font-bold text-white text-2xl">PROJECT PULSE</div>

                <div className="flex items-center space-x-4">
                    {/* User Avatar */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-lg">KB</span>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium"
                    >
                        Logout
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header;