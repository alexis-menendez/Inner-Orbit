// file: client/src/components/home/RegisterForm.tsx

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Register = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext is not provided');
  }
  const { login } = authContext;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    firstName: '',
    lastName: '',
    dob: '',
    password: '',
    email: '',
    disclaimer: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm({ ...form, [id]: type === 'checkbox' ? checked : value });
  };

  const handleRegister = async () => {
    if (!form.disclaimer) {
      alert('You must agree to the disclaimer to register.');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user, data.token); 
        navigate('/dashboard');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Something went wrong during registration.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-white bg-gradient-to-b from-indigo-900 to-black">
      <h1 className="mb-4 text-4xl font-bold tracking-widest">Hello, InnerOrbit 🌌</h1>
      <h2 className="mb-8 text-2xl font-bold tracking-wide">Welcome to the Register Page</h2>

      <section className="w-full max-w-md p-6 space-y-4 text-black bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-semibold">Hello New Explorer!</h1>
        <h2 className="mb-4">Please register below!</h2>

        <input type="text" id="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <input type="text" id="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
        <input type="text" id="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
        <input type="date" id="dob" value={form.dob} onChange={handleChange} />
        <input type="password" id="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <input type="email" id="email" placeholder="Email" value={form.email} onChange={handleChange} />

        <label className="flex items-start text-sm">
          <input type="checkbox" id="disclaimer" checked={form.disclaimer} onChange={handleChange} className="mt-1 mr-2" />
          By signing up, you agree to our <a href="/terms" className="underline">Terms of Service</a> and <a href="/privacy" className="underline">Privacy Policy</a>.
        </label>

        <p className="text-xs italic">
          Disclaimer: If you are sixteen (16) years of age or younger, you must have your parent or guardian's permission to use this service...
        </p>

        <button className="px-4 py-2 mt-4 text-white bg-indigo-700 rounded" onClick={handleRegister}>
          Register
        </button>

        <p className="mt-4 text-sm">
          Already have an account? <a href="/login" className="text-indigo-600 underline">Log in</a>.
        </p>
      </section>
    </div>
  );
};

export default Register;
