// File: client/src/components/home/RegisterForm.tsx

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/mutations';
import { AuthContext } from '../../context/authContext';
import formStyles from '../../assets/css/common/Form.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css';

const Register = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext is not provided');
  }
  const { login } = authContext;
  const navigate = useNavigate();

  const [registerUser] = useMutation(REGISTER_USER);

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
      const { data } = await registerUser({
        variables: {
          username: form.username,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          dob: form.dob,
        },
      });

      if (data?.registerUser?.success) {
        const { _id, username, email } = data.registerUser.user;
        login({ id: _id, username, email }, data.registerUser.token);
        navigate('/dashboard');
      } else {
        alert(data?.registerUser?.message || 'Registration failed');
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

      <section className={formStyles.formContainer}>
        <h1 className={formStyles.formTitle}>Hello New Explorer!</h1>
        <h2 className="mb-4 text-center">Please register below!</h2>

        <input type="text" id="username" placeholder="Username" value={form.username} onChange={handleChange} className={formStyles.input} />
        <input type="text" id="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className={formStyles.input} />
        <input type="text" id="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className={formStyles.input} />
        <input type="date" id="dob" value={form.dob} onChange={handleChange} className={formStyles.input} />
        <input type="password" id="password" placeholder="Password" value={form.password} onChange={handleChange} className={formStyles.input} />
        <input type="email" id="email" placeholder="Email" value={form.email} onChange={handleChange} className={formStyles.input} />

        <label className="flex items-start text-sm">
          <input
            type="checkbox"
            id="disclaimer"
            checked={form.disclaimer}
            onChange={handleChange}
            className="mt-1 mr-2"
          />
          By signing up, you agree to our <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/privacy" className="underline">Privacy Policy</Link>.
        </label>

        <p className="text-xs italic">
          Disclaimer: If you are sixteen (16) years of age or younger, you must have your parent or guardian's permission to use this service...
        </p>

        <button
          className={`${buttonStyles.button} ${buttonStyles.primary}`}
          onClick={handleRegister}
        >
          Register
        </button>

        <p className={formStyles.linkText}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </div>
  );
};

export default Register;