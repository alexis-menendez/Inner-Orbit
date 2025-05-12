// file: client/src/components/home/Login.tsx

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/auth.ts'; 

const Login = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext is undefined. Ensure AuthProvider is wrapping your component tree.');
  }
  const { login } = authContext; 
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        login(data.user, data.token); 
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong during login.');
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 text-white bg-gradient-to-b from-black to-indigo-900">
      <h1 className="mb-2 text-4xl font-bold">Welcome Explorer!</h1>
      <h2 className="mb-6 text-lg">Please log in below</h2>

      <div className="w-full max-w-sm p-6 space-y-4 text-black bg-white rounded-lg shadow-md">
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
        <button
          onClick={handleLogin}
          className="w-full p-2 text-white bg-indigo-700 rounded hover:bg-indigo-800"
        >
          Login
        </button>
        <p className="text-sm text-center">
          Don’t have an account?{' '}
          <a href="/register" className="text-indigo-600 underline">
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
