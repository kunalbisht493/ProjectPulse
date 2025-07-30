// import {ToastContainer} from 'react-toastify';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import User from './Pages/User';
import Sidebar from './Components/Sidebar';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import Project from './Pages/Project';
import Trash from './Pages/Trash';
import { ToastContainer } from 'react-toastify';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          <Route path="/Auth" element={<User setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<Navigate to="/Auth" />} />
        </Routes>
        <ToastContainer></ToastContainer>
      </div>

      )}
    </>
  );
}

export default App;
