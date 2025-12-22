import React, { useState, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import { Link } from "react-router";
import LoadingDashboard from "../../../Components/LoadingDashboard";

const Overview = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (roleLoading) {
    return <LoadingDashboard></LoadingDashboard>;
  }

  const userRole = role?.toLowerCase().replace(/"/g, "").trim();

  const getRoleColor = () => {
    switch (userRole) {
      case "admin":
        return "bg-gradient-to-br from-red-500 to-pink-600";
      case "moderator":
        return "bg-gradient-to-br from-blue-500 to-indigo-600";
      case "student":
        return "bg-gradient-to-br from-green-500 to-emerald-600";
      default:
        return "bg-gradient-to-br from-gray-500 to-gray-600";
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getQuickActions = () => {
    switch (userRole) {
      case "admin":
        return [
          { title: "Add Scholarship", desc: "Create new opportunity", link: "/dashboard/add-scholarship", color: "bg-red-50 hover:bg-red-100 text-red-700" },
          { title: "Manage Users", desc: "User administration", link: "/dashboard/manage-users", color: "bg-blue-50 hover:bg-blue-100 text-blue-700" },
          { title: "Analytics", desc: "View insights", link: "/dashboard/analytics", color: "bg-green-50 hover:bg-green-100 text-green-700" }
        ];
      case "moderator":
        return [
          { title: "Manage Applications", desc: "Review submissions", link: "/dashboard/manage-applications", color: "bg-blue-50 hover:bg-blue-100 text-blue-700" },
          { title: "All Reviews", desc: "Moderate feedback", link: "/dashboard/all-reviews", color: "bg-yellow-50 hover:bg-yellow-100 text-yellow-700" }
        ];
      case "student":
        return [
          { title: "Browse Scholarships", desc: "Find opportunities", link: "/all-scholarship", color: "bg-green-50 hover:bg-green-100 text-green-700" },
          { title: "My Applications", desc: "Track progress", link: "/dashboard/my-applications", color: "bg-blue-50 hover:bg-blue-100 text-blue-700" },
          { title: "My Reviews", desc: "Share feedback", link: "/dashboard/my-reviews", color: "bg-yellow-50 hover:bg-yellow-100 text-yellow-700" }
        ];
      default:
        return [];
    }
  };

  const getSystemStatus = () => {
    return [
      { 
        title: "System Health", 
        status: "Excellent", 
        color: "text-green-600", 
        bgColor: "bg-green-50",
        description: "All systems operational"
      },
      { 
        title: "Database", 
        status: "Online", 
        color: "text-blue-600", 
        bgColor: "bg-blue-50",
        description: "Connection stable"
      },
      { 
        title: "Server Load", 
        status: "Normal", 
        color: "text-yellow-600", 
        bgColor: "bg-yellow-50",
        description: "CPU usage: 45%"
      },
      { 
        title: "Security", 
        status: "Protected", 
        color: "text-purple-600", 
        bgColor: "bg-purple-50",
        description: "No threats detected"
      }
    ];
  };

  const getRecentUpdates = () => {
    switch (userRole) {
      case "admin":
        return [
          { title: "New scholarship program launched", time: "2 hours ago", type: "success" },
          { title: "User registration increased by 15%", time: "1 day ago", type: "info" },
          { title: "Monthly report generated", time: "2 days ago", type: "neutral" }
        ];
      case "moderator":
        return [
          { title: "5 new applications to review", time: "1 hour ago", type: "info" },
          { title: "Application deadline approaching", time: "3 hours ago", type: "warning" },
          { title: "Review feedback submitted", time: "1 day ago", type: "success" }
        ];
      case "student":
        return [
          { title: "New scholarship matches your profile", time: "30 minutes ago", type: "success" },
          { title: "Application deadline in 3 days", time: "2 hours ago", type: "warning" },
          { title: "Profile updated successfully", time: "1 day ago", type: "neutral" }
        ];
      default:
        return [];
    }
  };

  const systemStatus = getSystemStatus();
  const recentUpdates = getRecentUpdates();
  const quickActions = getQuickActions();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className={`${getRoleColor()} rounded-2xl p-8 text-white shadow-lg`}>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-3xl font-bold mb-2">
              {getGreeting()}, {user?.displayName || "User"}!
            </h1>
            <p className="text-white/90 text-lg">
              Welcome to your {userRole} dashboard
            </p>
          </div>
          <div className="text-center md:text-right">
            <div className="text-white/90 text-sm mb-1">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-2xl font-bold">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemStatus.map((status, index) => (
            <div key={index} className={`${status.bgColor} rounded-lg p-4`}>
              <div className="text-center">
                <div className={`text-lg font-bold ${status.color} mb-1`}>
                  {status.status}
                </div>
                <div className="text-gray-700 text-sm font-medium mb-1">
                  {status.title}
                </div>
                <div className="text-gray-600 text-xs">
                  {status.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className={`grid grid-cols-1 ${quickActions.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`${action.color} p-4 rounded-lg transition-colors duration-200 block`}
            >
              <div className="font-medium mb-1">{action.title}</div>
              <div className="text-sm opacity-80">{action.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Updates</h2>
        <div className="space-y-4">
          {recentUpdates.map((update, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                update.type === 'success' ? 'bg-green-500' : 
                update.type === 'warning' ? 'bg-yellow-500' : 
                update.type === 'info' ? 'bg-blue-500' : 'bg-gray-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{update.title}</p>
                <p className="text-gray-500 text-sm">{update.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;