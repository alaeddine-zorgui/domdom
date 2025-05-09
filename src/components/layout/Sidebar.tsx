import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  Factory, 
  Users, 
  ShoppingCart, 
  FileText, 
  Settings, 
  Bell, 
  BookOpen,
  X,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const { user } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Inventory', path: '/inventory', icon: <Package size={20} /> },
    { name: 'BOM', path: '/bom', icon: <ClipboardList size={20} /> },
    { name: 'Production', path: '/production', icon: <Factory size={20} /> },
    { name: 'Employees', path: '/employees', icon: <Users size={20} /> },
    { name: 'Sales', path: '/sales', icon: <ShoppingCart size={20} /> },
    { name: 'Documents', path: '/documents', icon: <FileText size={20} /> },
    { name: 'Reports', path: '/reports', icon: <BarChart3 size={20} /> },
    { name: 'Reminders', path: '/reminders', icon: <Bell size={20} /> },
  ];

  // Admin only settings
  const adminItems = [
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:sticky inset-y-0 left-0 z-50 md:z-0 flex flex-col w-64 h-screen bg-white border-r border-gray-200 pt-5 transform transition-transform duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-600 text-white font-bold text-xl">
              D
            </div>
            <h1 className="ml-2 text-xl font-bold text-gray-900">DomDom</h1>
          </div>
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 mt-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
              {user?.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 mt-6 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center px-2 py-2 text-sm font-medium rounded-md group transition-colors",
                isActive 
                  ? "bg-primary-50 text-primary-700" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
              end
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}

          {user?.role === 'admin' && (
            <>
              <div className="border-t border-gray-200 my-4"></div>
              {adminItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center px-2 py-2 text-sm font-medium rounded-md group transition-colors",
                    isActive 
                      ? "bg-primary-50 text-primary-700" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </>
          )}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <NavLink
            to="/documentation"
            className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
          >
            <BookOpen size={20} className="mr-3" />
            Documentation
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;