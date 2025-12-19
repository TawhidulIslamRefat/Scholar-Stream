import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const roleBadge = (role) => {
  if (role === "Admin") return "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg";
  if (role === "Moderator") return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg";
  return "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg";
};

const getRoleIcon = (role) => {
  if (role === "Admin") return "👑";
  if (role === "Moderator") return "🛡️";
  return "🎓";
};

const Profile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 flex justify-center items-center">
        <div className="text-center">
          <div className="relative mb-4">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-linear-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            My Profile
          </h1>
          <p className="text-gray-600 text-lg">Your personal information and account details</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-500">
          {/* Header Section with Gradient */}
          <div className=" h-32 relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
          </div>

          {/* Profile Content */}
          <div className="px-8 py-8 -mt-16 relative">
            <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8">
              {/* Avatar Section */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-3xl bg-linear-to-r from-white to-gray-100 p-1 shadow-2xl">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/2y9YpJH/user-placeholder.png"}
                    alt="User Avatar"
                    className="w-full h-full rounded-3xl object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className={`absolute -bottom-3 -right-3 w-12 h-12 ${roleBadge(role)} rounded-2xl flex items-center justify-center text-xl shadow-xl`}>
                  {getRoleIcon(role)}
                </div>
              </div>

              {/* User Information */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-4xl font-bold text-gray-800 mb-3">
                  {user?.displayName || "Welcome User"}
                </h2>
                <p className="text-xl text-gray-600 mb-4">{user?.email}</p>
                <div className={`inline-flex items-center gap-3 px-6 py-3 ${roleBadge(role)} rounded-2xl font-semibold text-lg`}>
                  <span className="text-2xl">{getRoleIcon(role)}</span>
                  <span>{role}</span>
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Personal Info Card */}
              <div className="bg-linear-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                    👤
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 ml-4">Personal Info</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">Name</p>
                    <p className="text-lg font-medium text-blue-900">
                      {user?.displayName || "Not Provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">Email</p>
                    <p className="text-lg font-medium text-blue-900 break-all">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Status Card */}
              <div className="bg-linear-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                    ✅
                  </div>
                  <h3 className="text-xl font-bold text-green-800 ml-4">Account Status</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-lg font-medium text-green-900">Active</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-1">Verification</p>
                    <p className="text-lg font-medium text-green-900">✓ Verified</p>
                  </div>
                </div>
              </div>

              {/* Role & Permissions Card */}
              <div className="bg-linear-to-br from-purple-50 to-pink-100 rounded-2xl p-6 border border-purple-200/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                    {getRoleIcon(role)}
                  </div>
                  <h3 className="text-xl font-bold text-purple-800 ml-4">Role & Access</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-1">Current Role</p>
                    <p className="text-lg font-medium text-purple-900">{role}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-1">Access Level</p>
                    <p className="text-lg font-medium text-purple-900">
                      {role === "Admin" ? "Full Access" : 
                       role === "Moderator" ? "Management" : "Standard"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="mt-12 bg-linear-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200/50">
              <div className="text-center">
                <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg">
                  ℹ️
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Account Information</h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  Profile information is managed by the system and cannot be edited directly. 
                  For any changes or updates, please contact the system administrator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
