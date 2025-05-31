import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useAuth } from '../context/authContext';
import { UPDATE_USER } from '../graphql/mutations';
import formStyles from '../assets/css/common/Form.module.css';
import buttonStyles from '../assets/css/common/Button.module.css';
import pageStyles from '../assets/css/dashboard/Dashboard.module.css';
import userStyles from '../assets/css/user/User.module.css'; 

const UserProfile: React.FC = () => {
  const { user, token, login } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: (data) => {
      login(data.updateUser, token); 
      setMessage('Profile updated successfully.');
    },
    onError: (error) => {
      setMessage(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      setMessage("New passwords don't match.");
      return;
    }

    try {
      await updateUser({
        variables: {
          id: user?.id,
          username,
          email,
          password: currentPassword,
          newPassword: newPassword || undefined,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={userStyles.userProfileContainer}>
      {/* Profile Panel */}
      <div className={`${userStyles.profileBox} cosmic-panel`}>
        <div className={pageStyles.subtitle}>
          <h2>Account Settings</h2>
        </div>

        <form onSubmit={handleSubmit} className={`${formStyles.form} w-full`}>
          <div className={userStyles.formGroup}>
            <label>
              Username:
              <input
                className={formStyles.input}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={!currentPassword}
                title={!currentPassword ? "Enter current password to enable" : ""}
              />
            </label>
          </div>

          <div className={userStyles.formGroup}>
            <label>
              Email:
              <input
                className={formStyles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!currentPassword}
                title={!currentPassword ? "Enter current password to enable" : ""}
              />
            </label>
          </div>

          <hr className="my-4 border-gray-600" />

          <div className={userStyles.formGroup}>
            <label>
              Current Password:
              <input
                className={formStyles.input}
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>
          </div>

          <div className={userStyles.formGroup}>
            <label>
              New Password:
              <input
                className={formStyles.input}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
          </div>

          <div className={userStyles.formGroup}>
            <label>
              Confirm New Password:
              <input
                className={formStyles.input}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>

          {message && <p className="mt-2 text-sm text-red-400">{message}</p>}

          <button type="submit" className={buttonStyles.primary}>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
