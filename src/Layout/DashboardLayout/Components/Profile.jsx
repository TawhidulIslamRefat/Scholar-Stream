import React, { useState, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import LoadingDashboard from "../../../Components/LoadingDashboard";
import { FiEdit2, FiCamera, FiUser, FiSave, FiX, FiMail, FiCalendar, FiShield, FiCheckCircle } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Profile = () => {
  const { user, updateUser, setUser } = useAuth();
  const { role, roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  if (roleLoading) {
    return <LoadingDashboard />;
  }

  const getRoleGradient = () => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-gradient-to-r from-red-600 to-pink-600";
      case "moderator":
        return "bg-gradient-to-r from-blue-600 to-indigo-600";
      case "student":
        return "bg-gradient-to-r from-green-600 to-emerald-600";
      default:
        return "bg-gradient-to-r from-gray-600 to-gray-700";
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUser({
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      const updatedUser = {
        ...user,
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      };
      setUser(updatedUser);
      try {
        await axiosSecure.patch(`/users/${user.email}`, {
          name: formData.displayName,
          photo: formData.photoURL
        });
      } catch (backendErr) {
        console.warn("Backend update failed or endpoint not found:", backendErr);
      }

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile information has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Failed to update profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-11/12 mx-auto space-y-8 pb-10">
      <title>Profile | {user?.displayName}</title>
      <div className={`relative overflow-hidden rounded-3xl shadow-2xl ${getRoleGradient()} p-8 sm:p-12 text-white transition-all duration-300`}>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-black/10 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1.5 bg-white/30 backdrop-blur-sm shadow-xl">
              <img
                src={user?.photoURL || "https://i.ibb.co/2y9YpJH/user-placeholder.png"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-white shadow-inner bg-gray-200"
              />
            </div>
            <div className="absolute bottom-2 right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <FiCheckCircle className="text-white w-3 h-3 sm:w-4 sm:h-4" />
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] cursor-pointer"
            >
              <FiCamera className="w-8 h-8 text-white" />
            </button>
          </div>

          <div className="text-center md:text-left flex-1 space-y-3">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-3 justify-center md:justify-start">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight shadow-black/10 drop-shadow-lg">
                {user?.displayName || "User"}
              </h1>
              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
                {role}
              </div>
            </div>

            <p className="text-white/90 text-lg flex items-center justify-center md:justify-start gap-2 font-medium">
              <FiMail className="w-5 h-5 opacity-75" />
              {user?.email}
            </p>

            <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-white text-gray-900 px-6 py-2.5 rounded-full font-bold shadow-lg hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 group"
              >
                <FiEdit2 className="w-4 h-4 group-hover:text-primary transition-colors" />
                Edit Profile
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center min-w-[140px]">
            <div className="flex justify-center mb-2 text-white/80">
              <FiCalendar className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold mb-1">
              {user?.metadata?.creationTime ?
                new Date(user.metadata.creationTime).getFullYear() :
                "2024"
              }
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-75">Member Since</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300 relative group">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 rounded-l-3xl group-hover:w-3 transition-all"></div>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FiUser className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Personal Details</h3>
          </div>

          <div className="space-y-6">
            <div className="group/item">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block group-hover/item:text-blue-500 transition-colors">Full Name</label>
              <div className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">{user?.displayName || "Not Set"}</div>
            </div>
            <div className="group/item">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block group-hover/item:text-blue-500 transition-colors">Digital Identity (Email)</label>
              <div className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">{user?.email}</div>
            </div>
            <div className="group/item">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block group-hover/item:text-blue-500 transition-colors">Unique ID</label>
              <div className="text-sm font-mono text-gray-500 bg-gray-50 p-2 rounded-lg truncate">{user?.uid}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300 relative group">
          <div className="absolute top-0 left-0 w-2 h-full bg-green-500 rounded-l-3xl group-hover:w-3 transition-all"></div>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
              <FiShield className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Account Status</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <span className="font-medium text-gray-600">Current Role</span>
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize ${role === 'Admin' ? 'bg-red-100 text-red-600' :
                  role === 'Moderator' ? 'bg-purple-100 text-purple-600' :
                    'bg-green-100 text-green-600'
                }`}>
                {role}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <span className="font-medium text-gray-600">Verification</span>
              <div className="flex items-center gap-2 text-green-600 font-bold">
                <FiCheckCircle />
                <span>Verified Account</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <span className="font-medium text-gray-600">Last Sign In</span>
              <span className="text-gray-900 font-semibold">{user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'Today'}</span>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Edit Profile</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors text-gray-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="p-8 space-y-6">

              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={formData.photoURL || "https://i.ibb.co/2y9YpJH/user-placeholder.png"}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-md">
                    <FiCamera className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Display Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.displayName}
                      onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-900"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Photo URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCamera className="text-gray-400" />
                    </div>
                    <input
                      type="url"
                      value={formData.photoURL}
                      onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-gray-900"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <div className="relative opacity-60">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={user?.email || ""}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1 ml-1">Email cannot be changed</p>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 px-6 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-6 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="animate-pulse">Saving...</span>
                  ) : (
                    <>
                      <FiSave className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
