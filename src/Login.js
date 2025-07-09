// src/Login.js
import { useState } from 'react';
import API from './Api';

function Login({ setLoggedIn, switchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setLoggedIn(true);
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={loginHandler} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>

      <div className="mt-4">
        <p>
          Don’t have an account?{' '}
          <button onClick={switchToRegister} className="text-blue-500 underline">
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
