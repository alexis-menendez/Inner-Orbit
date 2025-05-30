// File: client/src/App.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

// Layout
import LoginLayout from './components/layout/LoginLayout';
import MainLayout from './components/layout/MainLayout';
import JournalLayout from './components/layout/JournalLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './components/home/LoginForm';
import Register from './components/home/RegisterForm';
import Terms from './components/home/Terms';
import Privacy from './components/home/Privacy';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';

// Components
import SquidDev from './components/dashboard/pet/dev/SquidDev';
import DevelopConstellations from './components/journal/dev/DevelopConstellations'; 
import DevStars from './components/journal/dev/DevStars'; 
import Journal from './pages/Journal';
import Constellation from './components/journal/Constellation';
import ViewJournal from './components/journal/ViewJournal'; 

// TODO pages (not yet created):                 
// import UserProfile from './pages/UserProfile';          --->  not yet created
// import Library from './pages/Library';                  --->  not yet created
// import NotFound from './pages/NotFound';                --->  not yet created

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes using LoginLayout */}
        <Route element={<LoginLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>

        {/* Routes using MainLayout */}
        <Route element={<MainLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tracker"
            element={
              <ProtectedRoute>
                <Tracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dev/squid"
            element={
              <ProtectedRoute>
                <SquidDev />
              </ProtectedRoute>
            }
          />
          <Route path="/develop-constellations" 
          element={
          <DevelopConstellations />} />
        </Route>

          <Route path="/dev/stars" element={<DevStars />} />

        {/* Journal routes using JournalLayout */}
        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <JournalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Journal />} />
          <Route path="constellation/:index" element={<Constellation />} />
          <Route path="entry/:entryId" element={<ViewJournal />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
