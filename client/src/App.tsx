// File: client/src/App.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

// Layout
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './components/home/LoginForm';
import Register from './components/home/RegisterForm';
import Terms from './components/home/Terms';
import Privacy from './components/home/Privacy';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Constellation from './components/journal/Constellation';
import DevelopConstellations from './components/journal/dev/DevelopConstellations';

// TODO pages (not yet created):
// import Tracker from './pages/Tracker';                  --->  not yet created
// import UserProfile from './pages/UserProfile';          --->  not yet created
// import FriendGroup from './pages/FriendGroup';          --->  not yet created
// import Feed from './pages/Feed';                        --->  not yet created
// import Library from './pages/Library';                  --->  not yet created
// import WellnessPet from './components/pet/WellnessPet'; --->  not yet created
// import NotFound from './pages/NotFound';                --->  not yet created

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <Journal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journal/constellation/:id"
            element={
              <ProtectedRoute>
                <Constellation />
              </ProtectedRoute>
            }
          />
          <Route path="/develop-constellations" element={<DevelopConstellations />} />

          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
