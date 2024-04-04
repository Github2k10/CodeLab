import React, { useState } from 'react';
import './Welcome.scss';

const Welcome = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      alert('Please enter your username.');
      return;
    }
    if (email.trim() === '') {
      alert('Please enter your email.');
      return;
    }
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.trim() === '') {
      alert('Please enter your password.');
      return;
    }
    if (!isValidPassword(password)) {
      alert('Password must be between 8 to 18 characters and contain at least one special character and one number.');
      return;
    }
    alert('Form submitted successfully!');
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,18}$/;
    return passwordPattern.test(password);
  };

  return (
    <div className="page-background">
      <div className="welcome-container">
        <div className="welcome-content">
          <h1>Welcome to CodeLab</h1>
          <h2>Create your account</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                minLength={8}
                maxLength={18}
                required
              />
            </div>
            <div className="terms-checkbox">
              <input type="checkbox" id="terms-checkbox" required />
              <label htmlFor="terms-checkbox">
                By signing, I agree to terms and policy.
              </label>
            </div>
            <div className="button-group">
              <button className="sign-up-btn" type="submit">Sign Up</button>
              <button className="sign-in-btn">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
