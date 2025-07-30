// import { useState } from "react";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import { showError, showSucess } from "../Utils/Toast";

// function User({ setIsLoggedIn }) {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         role: ""
//     });
//     const [isSignUp, setIsSignUp] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { name, email, password, role } = formData;
//         const payload = { email, password };

//         if (isSignUp) {
//             payload.name = name;
//             payload.role = role;
//         }

//         try {
//             const URl = isSignUp
//                 ? "http://localhost:4000/api/v1/signup"
//                 : "http://localhost:4000/api/v1/login";

//             const res = await axios.post(URl, payload, {
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });

//             showSucess(res.data.message);

//             if(isSignUp){
//                 showSucess(res.message)
//                 setIsSignUp(true);
//                 setFormData({ name: "", email: "", password: "", role: "" });
                
//             }else {
//                 showSucess(res.message)
//                 setIsLoggedIn(true);
//                 navigate("/");
//             }

//         } catch (err) {
//             showError(err.response?.data?.message || "Something went wrong");
//         }
//     };

//     return (
//         <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 items-center justify-center p-4">
//             <div className="relative w-full max-w-[800px] h-[500px] bg-white shadow-xl overflow-hidden flex rounded-xl border border-blue-200">
//                 <div className="w-1/2 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white flex flex-col items-center justify-center p-8 relative">
//                     <div className="relative z-10 text-left">
//                         <h2 className="text-3xl font-bold mb-4">
//                             {isSignUp ? 'Welcome Back!' : 'New Here?'}
//                         </h2>
//                         <p className="mb-6 text-left text-sm leading-relaxed text-blue-50">
//                             {isSignUp
//                                 ? 'To stay connected with us, please login with your personal info.'
//                                 : 'Enter your details and start your journey with us.'}
//                         </p>
//                         <button
//                             className="border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 font-medium"
//                             onClick={() => setIsSignUp(!isSignUp)}
//                         >
//                             {isSignUp ? 'Sign In' : 'Sign Up'}
//                         </button>
//                     </div>
//                 </div>

//                 <div className="w-1/2 relative overflow-hidden bg-white">
//                     <div className={`absolute w-full h-full top-0 left-0 transition-transform duration-500 ease-in-out ${isSignUp ? '-translate-x-full' : 'translate-x-0'}`}>
//                         {/* Sign In Form */}
//                         <div className="p-8 w-full h-full flex flex-col justify-center items-center">
//                             <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
//                             <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs">
//                                 <input
//                                     type="email"
//                                     placeholder="Email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 />
//                                 <input
//                                     type="password"
//                                     placeholder="Password"
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 />
//                                 <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium">
//                                     Sign In
//                                 </button>
//                             </form>
//                         </div>
//                     </div>

//                     <div className={`absolute w-full h-full top-0 left-full transition-transform duration-500 ease-in-out ${isSignUp ? '-translate-x-full' : 'translate-x-0'}`}>
//                         {/* Sign Up Form */}
//                         <div className="p-8 w-full h-full flex flex-col justify-center items-center">
//                             <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Account</h2>
//                             <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs">
//                                 <input
//                                     type="text"
//                                     placeholder="Name"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 />
//                                 <input
//                                     type="email"
//                                     placeholder="Email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 />
//                                 <input
//                                     type="password"
//                                     placeholder="Password"
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="role"
//                                     name="role"
//                                     value={formData.role}
//                                     onChange={handleChange}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 />
//                                 <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium">
//                                     Sign Up
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default User;


import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { showError, showSucess } from "../Utils/Toast";

function User({ setIsLoggedIn }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, role } = formData;
        const payload = { email, password };

        if (isSignUp) {
            payload.name = name;
            payload.role = role;
        }

        try {
            const URl = isSignUp
                ? "http://localhost:4000/api/v1/signup"
                : "http://localhost:4000/api/v1/login";

            const res = await axios.post(URl, payload, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            showSucess(res.data.message);

            if (isSignUp) {
                setIsSignUp(false); // ✅ Switch to sign-in form after signup
                setFormData({ name: "", email: "", password: "", role: "" });
            } else {
                setIsLoggedIn(true);
                navigate("/");
            }

        } catch (err) {
            showError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 items-center justify-center p-4">
            <div className="relative w-full max-w-[800px] h-[500px] bg-white shadow-xl overflow-hidden flex rounded-xl border border-blue-200">
                {/* Left Side */}
                <div className="w-1/2 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white flex flex-col items-center justify-center p-8 relative">
                    <div className="relative z-10 text-left">
                        <h2 className="text-3xl font-bold mb-4">
                            {isSignUp ? 'Welcome Back!' : 'New Here?'}
                        </h2>
                        <p className="mb-6 text-left text-sm leading-relaxed text-blue-50">
                            {isSignUp
                                ? 'To stay connected with us, please login with your personal info.'
                                : 'Enter your details and start your journey with us.'}
                        </p>
                        <button
                            className="border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 font-medium"
                            onClick={() => setIsSignUp(!isSignUp)}
                        >
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                </div>

                {/* Right Side - Forms */}
                <div className="w-1/2 relative overflow-hidden bg-white">
                    {/* Sign In Form */}
                    <div className={`absolute w-full h-full top-0 left-0 transition-transform duration-500 ease-in-out ${isSignUp ? '-translate-x-full' : 'translate-x-0'}`}>
                        <div className="p-8 w-full h-full flex flex-col justify-center items-center">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
                            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium">
                                    Sign In
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sign Up Form */}
                    <div className={`absolute w-full h-full top-0 left-full transition-transform duration-500 ease-in-out ${isSignUp ? '-translate-x-full' : 'translate-x-0'}`}>
                        <div className="p-8 w-full h-full flex flex-col justify-center items-center">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Account</h2>
                            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                                <input
                                    type="text"
                                    placeholder="Role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium">
                                    Sign Up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
