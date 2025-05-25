// File: client/src/components/home/RegisterForm.tsx

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../graphql/mutations';
import { AuthContext } from '../../context/authContext';
import formStyles from '../../assets/css/common/Form.module.css';
import buttonStyles from '../../assets/css/common/Button.module.css';
import logoStyles from '../../assets/css/common/Logo.module.css';
import { motion } from 'framer-motion';

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
        console.log(`✅ User created successfully: ${username} (ID: ${_id})`);
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
    <section className={formStyles.authSection}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={formStyles.authContainer}
      >
        <h1 className={logoStyles.title}>
          <span className={logoStyles.titleInner}>inner</span>
          <span className={logoStyles.titleOrbit}>Orbit</span>
        </h1>

        <div className={formStyles.formContainer}>
          <input type="text" id="username" placeholder="Username" value={form.username} onChange={handleChange} className={formStyles.input} />
          <input type="text" id="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className={formStyles.input} />
          <input type="text" id="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className={formStyles.input} />
          <input type="date" id="dob" value={form.dob} onChange={handleChange} className={formStyles.input} />
          <input type="password" id="password" placeholder="Password" value={form.password} onChange={handleChange} className={formStyles.input} />
          <input type="email" id="email" placeholder="Email" value={form.email} onChange={handleChange} className={formStyles.input} />

          <label className="flex items-center text-sm text-white mt-2 mb-1">
            <input
              type="checkbox"
              id="disclaimer"
              checked={form.disclaimer}
              onChange={handleChange}
              className="mt-[7px] mr-1"
            />
            <span className={formStyles.disclaimerText}>
              By signing up, you agree to our
              <Link to="/terms" className={formStyles.disclaimerLink}> Terms of Service </Link>
              and
              <Link to="/privacy" className={formStyles.disclaimerLink}> Privacy Policy </Link>
            </span>
          </label>

          <p className={formStyles.disclaimerNote}>
            Disclaimer: If you are sixteen (16) years of age or younger, you must have your parent or guardian's permission to use this service...
          </p>

          <button
            className={`${buttonStyles.button} ${buttonStyles.primary}`}
            onClick={handleRegister}
          >
            Register
          </button>

          <p className={formStyles.linkText}>
            Already have an account?
            <Link to="/login" className={formStyles.disclaimerLink}> Log in</Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Register;
