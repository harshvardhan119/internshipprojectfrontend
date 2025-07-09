import { FiChevronDown } from 'react-icons/fi';

import { HiOutlineSearch } from 'react-icons/hi';

export default function Topbar({ onToggleSidebar }) {
  return (
    <div className="flex items-center justify-between px-6 py-3 shadow-sm bg-white sticky top-0 z-10">
     

      
      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-1/3">
        <HiOutlineSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search for anything..."
          className="bg-transparent outline-none ml-2 w-full text-sm"
        />
      </div>

      
      <div className="flex items-center gap-6">
        
        <img src='/Images/calendar-2.png' alt='avtar' ></img>
      
        <img src='/Images/message-question.png' alt='avtar'></img>
        <div className="relative">
          <img src='/Images/notification.png' alt='avtar'></img>
          
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500" />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-semibold text-gray-700">Palak Jain</span>
          <span className="text-xs text-gray-500">Rajasthan, India</span>
        </div>
        <FiChevronDown className="text-gray-500" />
      </div>
    </div>
  );
}
