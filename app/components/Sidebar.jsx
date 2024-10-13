import React from 'react'

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
      <aside className={`bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-4 text-lg font-semibold">Menu</div>
        <ul className="space-y-4 p-4">
          <li><a href="#" className="hover:bg-gray-700 p-2 block rounded">Dashboard</a></li>
          <li><a href="#" className="hover:bg-gray-700 p-2 block rounded">Settings</a></li>
          <li><a href="#" className="hover:bg-gray-700 p-2 block rounded">Profile</a></li>
          <li><a href="#" className="hover:bg-gray-700 p-2 block rounded">Logout</a></li>
        </ul>
        <button onClick={toggleSidebar} className="md:hidden text-white absolute top-4 right-4">
          Close
        </button>
      </aside>
    );
  };

export default Sidebar
