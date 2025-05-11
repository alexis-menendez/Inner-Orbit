import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import { AuthProvider } from './context/authContext';

import Login from './components/auth/LoginForm';
import Register from './components/auth/RegisterForm';
import Dashboard from './components/dashboard/Dashboard.tsx';
import Home from './pages/Home'; // Update the path to the correct location of the Home component
import Terms from './pages/Terms'; // Update the path to the correct location of the Terms component
import Privacy from './pages/Privacy'; // Update the path to the correct location of the Privacy component
// import Breathing from './components/Breathing'; // Add these if they exist
// import WellnessPet from './components/WellnessPet';
// import Journal from './components/Journal';
// import MoodTracker from './components/MoodTracker';

const App = () => {
  return (
    <AuthProvider>
      <Router>
       {/*} <Navbar />*/}
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/terms" element={<Terms />} />
<Route path="/privacy" element={<Privacy />} />

            {/* Add additional components like these if they're real pages */}
            {/* <Route path="/breathing" element={<Breathing />} /> */}
          </Routes>
          <div className="text-3xl text-pink-500 font-bold text-center mt-10">
            Tailwind is working!
          </div>
        </main>
       {/*<Footer />*/}
      </Router>
    </AuthProvider>
  );
};

export default App;