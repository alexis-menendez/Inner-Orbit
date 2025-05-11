import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext'
import Login from './components/auth/LoginForm';
import Register from './components/auth/RegisterForm';
import Dashboard from './components/dashboard/Dashboard';
import Home from './pages/Home';
import Terms from './pages/Terms'; 
import Privacy from './pages/Privacy'; 
// import Breathing from './components/Breathing'; 
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import WellnessPet from './components/WellnessPet';
// import Journal from './components/Journal';
// import MoodTracker from './components/MoodTracker';

const App = () => {
  return (
    <AuthProvider>
      <Router>
       {/*} <Navbar />*/}
        <main className="min-h-screen px-4 py-6 text-white bg-gradient-to-b from-gray-900 to-black">
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
          <div className="mt-10 text-3xl font-bold text-center text-pink-500">
            Tailwind is working!
          </div>
        </main>
       {/*<Footer />*/}
      </Router>
    </AuthProvider>
  );
};

export default App;