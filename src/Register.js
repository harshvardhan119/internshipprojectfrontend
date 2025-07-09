// src/Register.js
import { useState } from 'react';
import API from './Api';

function Register({ setRegistered }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { email, password });
      alert('Registration successful! You can now log in.');
      setRegistered(true); // switch to login
    } catch (err) {
      alert('Registration failed. Try another email.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={registerHandler} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
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
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Register
        </button>
      </form>

      <div className="mt-4 text-center">
        <p>
          Already have an account?{' '}
          <button
            onClick={() => setRegistered(true)}
            className="text-blue-500 underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
