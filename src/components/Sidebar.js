import { useState } from 'react';

import { BsThreeDots } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navLinks = [
    { name: 'Home', icon:<img src="/Images/Home.png" alt="Logo" /> },
    { name: 'Messages', icon: <img src="/Images/message.png" alt="Logo" /> },
    { name: 'Tasks', icon: <img src="/Images/task-square.png" alt="Logo" /> },
    { name: 'Members', icon: <img src="/Images/profile-2user.png" alt="Logo" /> },
    { name: 'Settings', icon: <img src="/Images/setting-2.png" alt="Logo" /> },
  ];

  const projects = [
    { name: 'Mobile App', color: 'bg-green-500', active: true },
    { name: 'Website Redesign', color: 'bg-yellow-400' },
    { name: 'Design System', color: 'bg-purple-400' },
    { name: 'Wireframes', color: 'bg-blue-500' },
  ];

  return (
    <div className={`h-screen bg-white shadow-md flex flex-col justify-between px-4 py-5 transition-all duration-300 ${collapsed ? 'w-20' : 'w-72'}`}>
      <div>
        
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <img src="/Images/Logo.png" alt="Logo" />
           
            {!collapsed && <h1 className="text-lg font-bold text-gray-900">Project M.</h1>}
          </div>
          <button onClick={() => setCollapsed(!collapsed)} className="text-gray-500 text-lg">
            {collapsed ? <FiChevronsRight /> : <FiChevronsLeft />}
          </button>
        </div>

        
        <ul className="space-y-4">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className="flex items-center gap-4 text-gray-700 hover:text-black cursor-pointer"
            >
              <span className="text-xl">{link.icon}</span>
              {!collapsed && <span>{link.name}</span>}
            </li>
          ))}
        </ul>

        
        <div className="mt-8">
          {!collapsed && (
            <div className="flex justify-between items-center mb-4 text-xs font-semibold text-gray-500">
              <span>MY PROJECTS</span>
              <AiOutlinePlus className="cursor-pointer text-sm" />
            </div>
          )}
          <ul className="space-y-2">
            {projects.map((project) => (
              <li
                key={project.name}
                className={`flex items-center justify-between px-2 py-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                  project.active ? 'bg-purple-100' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${project.color}`} />
                  {!collapsed && (
                    <span className="text-sm text-gray-800">{project.name}</span>
                  )}
                </div>
                {!collapsed && <BsThreeDots className="text-gray-400" />}
              </li>
            ))}
          </ul>
        </div>
      </div>

      
      {!collapsed && (
        <div >
          <div className=' w-16 h-16 bg-[#F5F5F5] rounded-full ml-24  '>
          
          <div className="text-yellow-500 text-2xl  px-4 py-4 ">💡</div></div>
        
        <div className="bg-[#F5F5F5] text-center px-3 py-4 rounded-md -mt-7">
          
          
          <p className="text-xs text-gray-600 mb-2">
            We don’t have any notice for you, till then you can share your thoughts with your peers.
          </p>
          <button className="text-black bg-white text-xs px-3 py-1 rounded-md">
            Write a message
          </button>
        </div></div>
      )}
    </div>
  );
}
