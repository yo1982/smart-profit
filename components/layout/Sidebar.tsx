import React from 'react';
import { View } from '../../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  viewName: View;
  label: string;
  // FIX: Changed type from JSX.Element to React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
  icon: React.ReactNode;
  currentView: View;
  setCurrentView: (view: View) => void;
  setSidebarOpen: (isOpen: boolean) => void;
}> = ({ viewName, label, icon, currentView, setCurrentView, setSidebarOpen }) => {
  const isActive = currentView === viewName;
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setCurrentView(viewName);
        setSidebarOpen(false); // Close sidebar on mobile after navigation
      }}
      className={`flex items-center px-4 py-3 my-1 transition-colors duration-200 transform rounded-lg ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-200 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {icon}
      <span className="mx-4 font-medium">{label}</span>
    </a>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isSidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <div className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex flex-col w-64 px-4 py-8 bg-gray-800 border-r rtl:border-r-0 rtl:border-l overflow-y-auto transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-center mb-8">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            <span className="ml-3 text-2xl font-bold text-white">PPMS</span>
        </div>

        <nav className="flex-1">
          <NavItem
            viewName="dashboard"
            label="Dashboard"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>}
            currentView={currentView}
            setCurrentView={setCurrentView}
            setSidebarOpen={setSidebarOpen}
          />
          <NavItem
            viewName="products"
            label="Products"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>}
            currentView={currentView}
            setCurrentView={setCurrentView}
            setSidebarOpen={setSidebarOpen}
          />
          <NavItem
            viewName="inventory"
            label="Inventory"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 7l8 5 8-5"></path></svg>}
            currentView={currentView}
            setCurrentView={setCurrentView}
            setSidebarOpen={setSidebarOpen}
          />
          <NavItem
            viewName="pricing"
            label="AI Pricing"
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>}
            currentView={currentView}
            setCurrentView={setCurrentView}
            setSidebarOpen={setSidebarOpen}
          />
        </nav>
      </aside>
       <div className="hidden lg:block lg:w-64 lg:flex-shrink-0"></div>
    </>
  );
};

export default Sidebar;
