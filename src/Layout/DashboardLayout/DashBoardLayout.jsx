import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { 
  FaUser, 
  FaPlus, 
  FaCog, 
  FaUsers, 
  FaChartBar, 
  FaGraduationCap, 
  FaClipboardList, 
  FaStar, 
  FaEdit, 
  FaEye, 
  FaCreditCard,
  FaHome,
  FaBars,
  FaTimes
} from "react-icons/fa";
import useRole from "../../Hooks/useRole";

const DashboardLayout = () => {
  const { user } = useAuth();
   const { role, roleLoading } = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
   if (roleLoading) {
    return <p>Loading Dashboard...</p>;
  }

  const userRole = role?.toLowerCase().replace(/"/g, "").trim();
  console.log("DB Role:", role);

  // Role-based navigation items
  const getNavigationItems = () => {
    const commonItems = [
      {
        name: "My Profile",
        path: "/dashboard/profile",
        icon: <FaUser className="w-5 h-5" />,
        roles: ["admin", "moderator", "student"]
      }
    ];

    const adminItems = [
      {
        name: "Add Scholarship",
        path: "/dashboard/add-scholarship",
        icon: <FaPlus className="w-5 h-5" />,
        roles: ["admin"]
      },
      {
        name: "Manage Scholarships",
        path: "/dashboard/manage-scholarships",
        icon: <FaGraduationCap className="w-5 h-5" />,
        roles: ["admin"]
      },
      {
        name: "Manage Users",
        path: "/dashboard/manage-users",
        icon: <FaUsers className="w-5 h-5" />,
        roles: ["admin"]
      },
      {
        name: "Analytics",
        path: "/dashboard/analytics",
        icon: <FaChartBar className="w-5 h-5" />,
        roles: ["admin"]
      }
    ];

    const moderatorItems = [
      {
        name: "Manage Applications",
        path: "/dashboard/manage-applications",
        icon: <FaClipboardList className="w-5 h-5" />,
        roles: ["moderator"]
      },
      {
        name: "All Reviews",
        path: "/dashboard/all-reviews",
        icon: <FaStar className="w-5 h-5" />,
        roles: ["moderator"]
      }
    ];

    const studentItems = [
      {
        name: "My Applications",
        path: "/dashboard/my-applications",
        icon: <FaClipboardList className="w-5 h-5" />,
        roles: ["student"]
      },
      {
        name: "My Reviews",
        path: "/dashboard/my-reviews",
        icon: <FaStar className="w-5 h-5" />,
        roles: ["student"]
      }
    ];

    return [...commonItems, ...adminItems, ...moderatorItems, ...studentItems]
      .filter(item => item.roles.includes(userRole));
  };

  const navigationItems = getNavigationItems();

  const getRoleColor = () => {
    switch(userRole) {
      case 'admin': return 'from-red-600 to-pink-600';
      case 'moderator': return 'from-blue-600 to-indigo-600';
      case 'student': return 'from-green-600 to-emerald-600';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const getRoleBadgeColor = () => {
    switch(userRole) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'moderator': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white shadow-xl w-72 border-r border-gray-200`}>
        
        {/* Sidebar Header */}
        <div className={`bg-linear-to-r ${getRoleColor()} p-6 text-white`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Scholar-Stream</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaUser className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{user?.displayName || 'User'}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor()} bg-white/20 text-white`}>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {/* Dashboard Home */}
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? `bg-linear-to-r ${getRoleColor()} text-white shadow-lg`
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <FaHome className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </NavLink>

          {/* Role-based Navigation Items */}
          {navigationItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? `bg-linear-to-r ${getRoleColor()} text-white shadow-lg`
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Back to Home */}
          <Link
            to="/"
            className="flex items-center space-x-3 p-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
          >
            <FaHome className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">Scholar-Stream Dashboard</p>
            <p className="text-xs text-gray-400">v2.0.0</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaBars className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {userRole === 'admin' && 'Admin Dashboard'}
                  {userRole === 'moderator' && 'Moderator Dashboard'}
                  {userRole === 'student' && 'Student Dashboard'}
                </h1>
                <p className="text-sm text-gray-500">
                  Welcome back, {user?.displayName || 'User'}
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-6">
                {userRole === 'admin' && (
                  <>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">28</p>
                      <p className="text-xs text-gray-500">Scholarships</p>
                    </div>
                  </>
                )}
              </div>

              {/* User Avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="w-5 h-5 text-gray-600" />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
