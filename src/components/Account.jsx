import React, { useState } from 'react';
import { register, login } from '../db.js';

function AccountPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      await register(username, password);
      setIsLoggedIn(true);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await login(username, password);
      setIsLoggedIn(true);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <h2>Register</h2>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleRegister}>Register</button>

          <h2>Login</h2>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default AccountPage;