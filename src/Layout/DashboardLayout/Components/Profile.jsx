import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const Profile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();

  const getRoleStyles = (role) => {
    const styles = {
      Admin: {
        primary: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
        badge: "bg-red-600 text-white",
        icon: "👑"
      },
      Moderator: {
        primary: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        badge: "bg-blue-600 text-white",
        icon: "🛡️"
      },
      Student: {
        primary: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
        badge: "bg-green-600 text-white",
        icon: "🎓"
      }
    };
    return styles[role] || styles.Student;
  };

  const roleStyles = getRoleStyles(role);

  if (roleLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/2y9YpJH/user-placeholder.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-gray-200"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-8 h-8 ${roleStyles.badge} rounded-full flex items-center justify-center text-sm`}>
                    {roleStyles.icon}
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {user?.displayName || "User"}
                </h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <div className="text-center mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${roleStyles.badge}`}>
                  <span className="mr-1">{roleStyles.icon}</span>
                  {role}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Verified</span>
                  <span className="text-sm font-medium text-green-600">✓ Yes</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="text-sm font-medium text-gray-900">
                    {user?.metadata?.creationTime ? 
                      new Date(user.metadata.creationTime).getFullYear() : 
                      "2024"
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="mr-2">👤</span>
                    Personal Information
                  </h2>
                </div>
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <p className="text-gray-900">{user?.displayName || "Not provided"}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <p className="text-gray-900">{user?.email}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Role
                      </label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <p className={`font-medium ${roleStyles.primary}`}>{role}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Status
                      </label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <p className="text-green-600 font-medium">Active & Verified</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="mr-2">📋</span>
                    Account Details
                  </h2>
                </div>
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Member Since
                      </label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <p className="text-gray-900">
                          {user?.metadata?.creationTime ? 
                            new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) : 
                            "Recently joined"
                          }
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Sign In
                      </label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <p className="text-gray-900">
                          {user?.metadata?.lastSignInTime ? 
                            new Date(user.metadata.lastSignInTime).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) : 
                            "Today"
                          }
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Access Level
                      </label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <p className={`font-medium ${roleStyles.primary}`}>
                          {role === "Admin" ? "Full System Access" : 
                           role === "Moderator" ? "Management Access" : 
                           "Standard User Access"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Verification
                      </label>
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <p className="text-green-600 font-medium flex items-center">
                          <span className="mr-1">✓</span>
                          Verified
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
