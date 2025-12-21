import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const Profile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getRoleGradient = () => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-gradient-to-r from-red-500 to-pink-500";
      case "moderator":
        return "bg-gradient-to-r from-blue-500 to-indigo-500";
      case "student":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  const getRoleBadge = () => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-700 border-red-200";
      case "moderator":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "student":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Hero Profile Section */}
      <div className={`${getRoleGradient()} rounded-xl p-8 text-white shadow-lg`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={user?.photoURL || "https://i.ibb.co/2y9YpJH/user-placeholder.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {user?.displayName || "User"}
            </h1>
            <p className="text-white/90 text-lg mb-3">{user?.email}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                {role}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                Active Member
              </span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold">
              {user?.metadata?.creationTime ? 
                new Date(user.metadata.creationTime).getFullYear() : 
                "2024"
              }
            </div>
            <div className="text-white/80 text-sm">Member Since</div>
          </div>
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Personal Info</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="text-gray-900 font-medium">{user?.displayName || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-gray-900 font-medium break-all">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Role</p>
              <span className={`inline-block px-2 py-1 rounded-md text-sm font-medium border ${getRoleBadge()}`}>
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Email Verified</span>
              <span className="text-green-600 font-medium text-sm">✓ Verified</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Last Login</span>
              <span className="text-gray-900 font-medium text-sm">Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Member Since</div>
            <div className="font-semibold text-gray-900">
              {user?.metadata?.creationTime ? 
                new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric'
                }) : 
                "Recently"
              }
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Account Type</div>
            <div className="font-semibold text-gray-900">{role}</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Status</div>
            <div className="font-semibold text-green-600">Active</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Verification</div>
            <div className="font-semibold text-green-600">Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
