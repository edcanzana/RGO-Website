import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Login = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate()

  const loginUser = () => {
    Axios.post('http://localhost:3002/login', {
      LoginUsername: loginUsername,
      LoginPassword: loginPassword
    }).then((response) => {
      console.log(response);
      // Check response for authentication status or error message
      if (response.data.message) {
        navigateTo('/')
      } else {
        navigateTo('/dashboard')
      }
    }).catch(error => {
      console.error('Error occurred:', error);
      // Handle error from Axios request
      setErrorMessage('An error occurred during login. Please try again.');
    });
  };

  return (
    <div>
      <h2>Log In Page</h2>
      <div>
        <input
          type="text"
          label="Username"
          id="username"
          placeholder="Enter username"
          onChange={(event) => {
            setLoginUsername(event.target.value);
          }}
        />
        <br />
        <input
          type="password"
          label="Password"
          id="password"
          placeholder="Enter password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <br />
      </div>
      <div>
        <button type="Submit" onClick={loginUser}>
          Log-In
        </button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Login;
