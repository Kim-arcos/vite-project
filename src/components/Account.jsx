import React, { useState } from 'react';
//import { register, login } from '../db.js';

function AccountPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await register(firstName, lastName, registerEmail, registerPassword);
      setIsLoggedIn(true);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await login(loginEmail, loginPassword);
      setIsLoggedIn(true);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
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