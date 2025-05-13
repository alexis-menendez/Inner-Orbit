// File: client/src/components/home/Login.tsx

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../graphql/mutations';
import { AuthContext } from '../../context/AuthContext';
import formStyles from '../../assets/css/common/Form.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css';

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

  const [loginUser] = useMutation(LOGIN_USER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({
        variables: {
          username: form.username,
          password: form.password,
        },
      });

      if (data?.loginUser?.token && data?.loginUser?.user) {
        login(data.loginUser.user, data.loginUser.token);
        navigate('/dashboard');
      } else {
        alert('Login failed.');
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

      <div className={formStyles.formContainer}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className={formStyles.input}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className={formStyles.input}
        />
        <button
          onClick={handleLogin}
          className={`${buttonStyles.button} ${buttonStyles.primary}`}
        >
          Login
        </button>
        <p className={formStyles.linkText}>
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
