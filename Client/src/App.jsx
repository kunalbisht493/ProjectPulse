// import {ToastContainer} from 'react-toastify';
import { useState,useEffect } from 'react';
import { Routes, Route, Navigate,useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Auth from './Pages/Auth';
import Sidebar from './Components/Sidebar';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import Project from './Pages/Project';
import Trash from './Pages/Trash';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

   useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
          navigate('/')
        }
    }, []);
  return (
    <>
      {isLoggedIn && <Header />}

      {isLoggedIn ? (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-grow overflow-y-auto">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Project" element={<Project />} />
              <Route path="/Trash" element={<Trash />} />
            </Routes>
            <ToastContainer></ToastContainer>
          </div>
        </div>
      ) : (<div>
        <Routes>
          <Route path="/Auth" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<Navigate to="/Auth" />} />
        </Routes>
        <ToastContainer></ToastContainer>
      </div>

      )}
    </>
  );
}

export default App;
