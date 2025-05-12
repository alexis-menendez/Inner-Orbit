// File: client/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
//import './styles/cosmic.css'; // Update the path if the file is in a 'styles' folder

import Home from './pages/Home';
import Login from './components/home/LoginForm';
import Register from './components/home/RegisterForm';
import Terms from './components/home/Terms';
import Privacy from './components/home/Privacy';
// import ProtectedRoute from './components/layout/ProtectedRoute';      --->  not yet created
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';             
import Constellation from './components/journal/Constellation';
import DevelopConstellations from './components/journal/DevelopConstellations';

// import Tracker from './pages/Tracker';                  --->  not yet created
// import UserProfile from './pages/UserProfile';          --->  not yet created
// import FriendGroup from './pages/FriendGroup';          --->  not yet created
// import Feed from './pages/Feed';                        --->  not yet created
// import Library from './pages/Library';                  --->  not yet created
// import WellnessPet from './components/pet/WellnessPet'; --->  not yet created
// import NotFound from './pages/NotFound';                --->  not yet created


const App = () => {
  return (
    <AuthProvider>
       <div className="cosmic-background min-h-screen w-full">
      <Router>
       {/*} <Navbar />*/}
        <main className="min-h-screen px-4 py-6 text-white bg-gradient-to-b from-gray-900 to-black">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/constellation/:id" element={<Constellation />} />
            <Route path="/develop-constellations" element={<DevelopConstellations />} />
          </Routes>
          <div className="mt-10 text-3xl font-bold text-center text-pink-500">
            Tailwind is working!
          </div>
        </main>
       {/*<Footer />*/}
      </Router>
      </div>
    </AuthProvider>
  );
};

export default App;