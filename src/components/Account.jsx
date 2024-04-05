import React, { useState, useEffect } from 'react';

function AccountPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleRegister = async () => {
    try {
      if (!loginEmail || !loginPassword) {
        throw new Error('Please fill out all fields');
      }
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email: registerEmail, password: registerPassword }),
      });
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      const { token } = await response.json();
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      if (!loginEmail || !loginPassword) {
        throw new Error('Email and password are required');
      }
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
        if (!response.ok) {
        throw new Error('Invalid email or password');
      }
      const { token } = await response.json();
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setFirstName('');
    setLastName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setLoginEmail('');
    setLoginPassword('');
  };
 

  return (
    <div className="form-container">
      {!isLoggedIn ? (
        <div className="form-group">
          <h2>Register</h2>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
          <button onClick={handleRegister}>Register</button>

          <h2>Login</h2>
          <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {registerEmail}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default AccountPage;