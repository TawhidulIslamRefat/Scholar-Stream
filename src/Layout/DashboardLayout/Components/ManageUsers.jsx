import React, { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import LoadingDashboard from "../../../Components/LoadingDashboard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiFilter,
  FiUser,
  FiTrash2,
  FiShield,
  FiSettings,
  FiMail,
  FiRefreshCw,
  FiChevronDown,
  FiAlertCircle,
  FiUsers,
  FiAward,
  FiStar,
  FiEye,
  FiMoreVertical,
  FiCheckCircle,
  FiXCircle
} from "react-icons/fi";

const ManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axiosSecure.get("/users");
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch users error:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Error",
        text: "Failed to load system users.",
        confirmButtonColor: "#3B82F6",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        (u.name || "").toLowerCase().includes(searchStr) ||
        (u.email || "").toLowerCase().includes(searchStr);

      const matchesRole = filterRole === "All" || u.role === filterRole;

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, filterRole]);

  const stats = useMemo(() => {
    return {
      total: users.length,
      admin: users.filter(u => u.role === 'Admin').length,
      moderator: users.filter(u => u.role === 'Moderator').length,
      student: users.filter(u => u.role === 'Student').length
    };
  }, [users]);

  const handleRoleChange = (id, newRole) => {
    Swal.fire({
      title: "Confirm Role Update",
      text: `Are you sure you want to promote this user to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#6B7280",
      confirmButtonText: `Yes, Promote`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/users/role/${id}`, { role: newRole }, {
            headers: { "x-user-email": user.email },
          });
          setUsers((prev) =>
            prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
          );
          Swal.fire({
            icon: "success",
            title: "Access Updated",
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
          });
        } catch (error) {
          Swal.fire("Error", "Could not update user privileges.", error);
        }
      }
    });
  };

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Remove User?",
      text: `Warning: This will permanently delete ${name} from the system.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Delete Account",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/users/${id}`);
          setUsers((prev) => prev.filter((u) => u._id !== id));
          Swal.fire({
            icon: "success",
            title: "Account Terminated",
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
          });
        } catch (error) {
          Swal.fire("Error", "Failed to remove account.", error);
        }
      }
    });
  };

  const getRoleBadge = (role) => {
    const configs = {
      Admin: { color: "bg-rose-100 text-rose-700 border-rose-200", icon: FiShield, label: "Admin" },
      Moderator: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: FiSettings, label: "Moderator" },
      Student: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: FiUser, label: "Student" },
    };
    const config = configs[role] || configs.Student;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-tight ${config.color}`}>
        <Icon />
        {config.label}
      </span>
    );
  };

  if (loading) return <LoadingDashboard />;

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen space-y-8">
      <title>Manage Users | ScholarPoint</title>

      <div className="bg-linear-to-r from-gray-900 via-blue-950 to-gray-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 flex items-center gap-3">
            <FiUsers className="text-blue-400" /> System Governance
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Manage user accounts, adjust system privileges, and monitor the community of scholars and moderators.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Total Accounts", value: stats.total, icon: FiUsers, color: "from-blue-500 to-indigo-600" },
          { label: "Administrators", value: stats.admin, icon: FiShield, color: "from-rose-400 to-red-600" },
          { label: "Moderators", value: stats.moderator, icon: FiSettings, color: "from-amber-400 to-orange-500" },
          { label: "Students", value: stats.student, icon: FiUser, color: "from-emerald-400 to-teal-500" }
        ].map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            key={i} className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow group"
          >
            <div className={`p-3.5 sm:p-4 rounded-xl bg-linear-to-br ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">{stat.label}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text" placeholder="Search accounts by name or email..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm font-medium"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 md:min-w-[200px]">
            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              className="w-full pl-11 pr-10 py-3 bg-gray-50 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-blue-500 text-sm font-bold text-gray-700 cursor-pointer"
              value={filterRole} onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="All">All Identities</option>
              <option value="Student">Student</option>
              <option value="Moderator">Moderator</option>
              <option value="Admin">Administrator</option>
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button onClick={fetchUsers} className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors border-none cursor-pointer active:scale-95" title="Refresh">
            <FiRefreshCw className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredUsers.length === 0 ? (
          <div className="bg-white py-20 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center px-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FiAlertCircle className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">No Users Found</h3>
            <p className="text-gray-500 text-sm max-w-xs">No accounts match your current search or filter parameters.</p>
          </div>
        ) : (
          <>
            <div className="hidden xl:block bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50/50 text-gray-500 uppercase text-xs font-bold tracking-wide border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-5">Profile</th>
                      <th className="px-6 py-5">Unique Identifier</th>
                      <th className="px-6 py-5">Current Rank</th>
                      <th className="px-6 py-5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <AnimatePresence mode='popLayout'>
                      {filteredUsers.map((u) => {
                        const isMySelf = u.email === user.email;
                        return (
                          <motion.tr
                            layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            key={u._id} className="hover:bg-blue-50/30 transition-colors group"
                          >
                            <td className="px-6 py-6 border-none">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200 shadow-sm group-hover:scale-110 transition-transform">
                                  {u.name?.charAt(0) || "U"}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-bold text-gray-800 text-sm leading-tight flex items-center gap-2 truncate">
                                    {u.name} {isMySelf && <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded-md shadow-sm font-bold uppercase">YOU</span>}
                                  </p>
                                  <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5"><FiMail className="w-3 shrink-0" /> {u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-6 border-none font-mono text-[11px] text-gray-500">
                              {u._id}
                            </td>
                            <td className="px-6 py-6 border-none">
                              {getRoleBadge(u.role)}
                            </td>
                            <td className="px-6 py-6 border-none">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => { setSelectedUser(u); setShowDetails(true); }}
                                  className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors cursor-pointer border-none bg-transparent" title="View Details"
                                >
                                  <FiEye className="w-5 h-5" />
                                </button>

                                {!isMySelf && (
                                  <div className="relative group/menu">
                                    <button className="p-2 hover:bg-gray-100 text-gray-400 rounded-lg cursor-pointer border-none bg-transparent">
                                      <FiMoreVertical className="w-5 h-5" />
                                    </button>
                                    <div className="absolute right-0 top-full mt-1 bg-white shadow-2xl border border-gray-200 rounded-2xl py-2 w-48 z-50 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all ring-1 ring-black/5">
                                      {[
                                        { key: 'Admin', label: 'Make Administrator', icon: FiShield, color: 'text-rose-600' },
                                        { key: 'Moderator', label: 'Make Moderator', icon: FiSettings, color: 'text-blue-600' },
                                      ].map((action) => (
                                        <button
                                          key={action.key} onClick={() => handleRoleChange(u._id, action.key)}
                                          disabled={u.role === action.key}
                                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold hover:bg-gray-50 ${action.color} disabled:opacity-30 disabled:pointer-events-none cursor-pointer border-none bg-transparent text-left`}
                                        >
                                          <action.icon /> {action.label}
                                        </button>
                                      ))}
                                      <div className="h-px bg-gray-100 my-1"></div>
                                      <button
                                        onClick={() => handleDelete(u._id, u.name)}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold hover:bg-rose-50 text-rose-500 cursor-pointer border-none bg-transparent text-left"
                                      >
                                        <FiTrash2 /> Delete Account
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode='popLayout'>
                {filteredUsers.map((u) => {
                  const isMySelf = u.email === user.email;
                  return (
                    <motion.div
                      layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      key={u._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4 relative overflow-hidden group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100 shadow-xs">
                            {u.name?.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-gray-800 text-sm leading-tight flex items-center gap-2">
                              {u.name} {isMySelf && <FiStar className="text-amber-400 fill-amber-400 w-3 h-3" />}
                            </h4>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-tight flex items-center gap-1 mt-1"><FiMail className="w-2.5" /> {u.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => { setSelectedUser(u); setShowDetails(true); }} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border-none bg-transparent cursor-pointer active:scale-95"><FiEye className="w-5 h-5" /></button>
                          {!isMySelf && (
                            <button onClick={() => handleDelete(u._id, u.name)} className="p-2.5 text-gray-300 hover:bg-rose-50 hover:text-rose-500 rounded-xl transition-colors border-none bg-transparent cursor-pointer active:scale-95"><FiTrash2 className="w-5 h-5" /></button>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/50 space-y-3">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wide text-gray-500">
                          <span>Identity ID</span>
                          <span className="font-mono">#{u._id.slice(-6).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-gray-100">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Current Rank</span>
                          {getRoleBadge(u.role)}
                        </div>
                      </div>

                      {!isMySelf && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRoleChange(u._id, 'Admin')}
                            disabled={u.role === 'Admin'}
                            className="flex-1 py-2.5 bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-tight rounded-xl hover:bg-rose-600 hover:text-white transition-all border-none cursor-pointer disabled:opacity-30"
                          >
                            Make Admin
                          </button>
                          <button
                            onClick={() => handleRoleChange(u._id, 'Moderator')}
                            disabled={u.role === 'Moderator'}
                            className="flex-1 py-2.5 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-tight rounded-xl hover:bg-blue-600 hover:text-white transition-all border-none cursor-pointer disabled:opacity-30"
                          >
                            Make Moderator
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {showDetails && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDetails(false)} className="absolute inset-0 bg-gray-900/70 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} className="bg-white rounded-[2rem] sm:rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 scrollbar-hide">
              <div className="p-6 sm:p-10 space-y-8">
                <div className="flex justify-between items-start sticky top-0 bg-white/80 backdrop-blur-md -my-2 py-2 z-10 transition-all">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">User Identity</h3>
                    <p className="text-gray-500 text-sm sm:text-base">Review profile and system privileges</p>
                  </div>
                  <button onClick={() => setShowDetails(false)} className="p-2 hover:bg-rose-50 rounded-full text-rose-400 transition-colors cursor-pointer border-none bg-transparent">
                    <FiXCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-8">
                    <section>
                      <h4 className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wide mb-4 border-b border-blue-50 pb-2"><FiUser className="w-3" /> Core Identity</h4>
                      <div className="space-y-4 px-1">
                        <DetailItem label="Full Registered Name" value={selectedUser.name} />
                        <DetailItem label="Official Email Address" value={selectedUser.email} />
                        <DetailItem label="Global Identifier" value={selectedUser._id} />
                      </div>
                    </section>
                  </div>
                  <div className="space-y-8">
                    <section>
                      <h4 className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wide mb-4 border-b border-emerald-50 pb-2"><FiShield className="w-3" /> System Access</h4>
                      <div className="space-y-4 px-1">
                        <DetailItem label="Current Permission Level" value={selectedUser.role} />
                        <DetailItem label="Account Status" value="Verified Member" />
                      </div>
                    </section>

                    <section className="bg-blue-600 p-6 rounded-[1.5rem] text-white shadow-xl shadow-blue-100 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="flex justify-between items-center mb-4 relative z-10">
                        <span className="text-xs font-bold uppercase tracking-wide text-blue-100">Governance</span>
                        <FiCheckCircle className="text-blue-100" />
                      </div>
                      <div className="relative z-10">
                        <p className="text-2xl font-bold">Authorized Record</p>
                        <p className="text-xs font-bold text-blue-200 uppercase mt-1">Managed Community Entity</p>
                      </div>
                    </section>
                  </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-3 sticky bottom-0 bg-white/80 backdrop-blur-md -my-2 py-4 z-10 border-t border-gray-100">
                  <button onClick={() => setShowDetails(false)} className="flex-1 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all cursor-pointer border-none shadow-sm active:scale-95">Close Portal</button>
                  {!(selectedUser.email === user.email) && (
                    <button onClick={() => { setShowDetails(false); handleRoleChange(selectedUser._id, selectedUser.role === 'Admin' ? 'Moderator' : 'Admin'); }} className="flex-1 py-4 bg-blue-600 text-white font-bold uppercase tracking-wider text-sm rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all cursor-pointer active:scale-95">Update Privileges</button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};


const DetailItem = ({ label, value }) => (
  <div className="space-y-0.5">
    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</p>
    <div className="text-sm font-bold text-gray-700 break-words">{value || "Unspecified"}</div>
  </div>
);

export default ManageUsers;
