import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { useState, useEffect } from 'react';
import TaskBoard from './components/TaskBoard';
import API from './Api';

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        await API.get('/auth/me');
        setIsValid(true);
      } catch {
        setIsValid(false);
        localStorage.removeItem('token');
        window.location.reload(); 
      }
    };
    validateToken();
  }, []);

  if (!isValid) return null;

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col">
        <Topbar onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
          <TaskBoard />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
