import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import "../css/login.css"

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
        const loginEmail = document.getElementById('email-txt').value;
        const loginPassword = document.getElementById('password').value;
      // Perform authentication logic (replace this with your actual authentication process)
      // For simplicity, let's assume the login is successful
      const response = await fetch('https://karchu.onrender.com/v1/user/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      console.log("finished this!!");

      if (response.ok) {
        const user = await response.json();
        console.log("User: ",user);
        // console.log(user.name, user.password);

        // Dispatch the LOGIN action to update the global state
        dispatch({ type: 'LOGIN', payload: { userId: user._id, userName: loginEmail, userPassword: loginPassword } });

        // Redirect to the dashboard after login
        navigate('/transactions');
      } else {
        // Handle authentication failure
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

//   const handleForgotPassword = () => {
//     navigate("/forgot-password"); // Navigate to the forgot password route
//   };

  return (
    <div>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              id="email-txt"
              placeholder="Email Address"
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
            />
            <br />
            <br />
            <button type="submit">LOG IN</button>
          </form>
          <br />
          <a
            href="#"
            className="forgot-password"
          >
            FORGOT PASSWORD?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;