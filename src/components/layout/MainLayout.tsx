import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../contexts/AuthContext';

const MainLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return null; // User not authenticated, handled by route guards
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header onMenuButtonClick={() => setSidebarOpen(true)} user={user} />
        
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
          <Outlet />
        </main>
        
        <footer className="border-t border-gray-200 p-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} DomDom Management System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;