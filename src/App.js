
import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setLoggedIn(true);
  }, []);

  if (loggedIn) return <Dashboard />;

  return (
    <>
      {showLogin ? (
        <>
          <Login
            setLoggedIn={setLoggedIn}
            switchToRegister={() => setShowLogin(false)}
          />
          <div className="text-center mt-4">
            <p>
              Don’t have an account?{' '}
              <button
                className="text-blue-500 underline"
                onClick={() => setShowLogin(false)}
              >
                Register
              </button>
            </p>
          </div>
        </>
      ) : (
        <>
          <Register
            setRegistered={() => setShowLogin(true)} 
          />
          <div className="text-center mt-4">
            <p>
              Already have an account?{' '}
              <button
                className="text-blue-500 underline"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
            </p>
          </div>
        </>
      )}
    </>
  );
}

export default App;
