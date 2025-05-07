// file path: client/src/pages/Login.jsx

import React, { useState } from 'react';
import { useAuth } from '../components/home/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user, data.token); // 🔐 stores in AuthContext
        navigate('/dashboard');       // 🚀 redirect after login
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong during login.');
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-indigo-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-2">Welcome Explorer!</h1>
      <h2 className="text-lg mb-6">Please log in below</h2>

      <div className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-sm space-y-4">
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button onClick={handleLogin} className="w-full bg-indigo-700 text-white p-2 rounded hover:bg-indigo-800">
          Login
        </button>
        <p className="text-sm text-center">
          Don’t have an account? <a href="/register" className="text-indigo-600 underline">Sign up</a>
        </p>
      </div>
    </section>
  );
};

export default Login;
