import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import LoadingDashboard from "../../../Components/LoadingDashboard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const roleBadge = (role) => {
  if (role === "Admin") return "bg-red-100 text-red-700";
  if (role === "Moderator") return "bg-blue-100 text-blue-700";
  return "bg-green-100 text-green-700";
};

const ManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("All");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((error) => {
        console.error("Fetch users error:", error);
        Swal.fire(
          "Error",
          error.response?.data?.message || "Unable to load users",
          "error"
        );
      })
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const filteredUsers =
    filterRole === "All" ? users : users.filter((u) => u.role === filterRole);

  const handleRoleChange = (id, newRole) => {
    Swal.fire({
      title: "Change Role?",
      text: `Make this user ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Change",
    }).then((confirm) => {
      if (!confirm.isConfirmed) return;

      axiosSecure
        .patch(
          `/users/role/${id}`,
          { role: newRole },
          {
            headers: { "x-user-email": user.email },
          }
        )
        .then(() => {
          setUsers((prev) =>
            prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
          );
          Swal.fire("Updated!", "User role updated successfully", "success");
        })
        .catch((error) => {
          console.error("Role change error:", error);
          Swal.fire(
            "Error",
            error.response?.data?.message ||
              error.message ||
              "Failed to change role",
            "error"
          );
        });
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    }).then((confirm) => {
      if (!confirm.isConfirmed) return;

      axiosSecure
        .delete(`/users/${id}`)
        .then(() => {
          setUsers((prev) => prev.filter((u) => u._id !== id));
          Swal.fire("Deleted!", "User removed successfully", "success");
        })
        .catch((error) => {
          console.error("Delete user error:", error);
          Swal.fire(
            "Error",
            error.response?.data?.message ||
              error.message ||
              "Failed to delete user",
            "error"
          );
        });
    });
  };

  if (loading) return <LoadingDashboard></LoadingDashboard>;

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Manage Users</h1>

        <select
          className="border px-3 py-2 rounded-md mt-3 md:mt-0 text-sm sm:text-base"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="Student">Student</option>
          <option value="Moderator">Moderator</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="block lg:hidden space-y-4">
        {filteredUsers.map((u, idx) => {
          const isMySelf = u.email === user.email;

          return (
            <div
              key={u._id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-500">
                        #{idx + 1}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${roleBadge(
                          u.role
                        )}`}
                      >
                        {u.role}
                      </span>
                    </div>
                    <h3 className="text-base font-medium text-gray-900 truncate">
                      {u.name}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">{u.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  {!isMySelf && u.role !== "Admin" && (
                    <button
                      onClick={() => handleRoleChange(u._id, "Admin")}
                      className="px-3 py-2 text-xs font-medium bg-green-600 hover:bg-green-700 text-white rounded-md"
                    >
                      Make Admin
                    </button>
                  )}

                  {!isMySelf && u.role === "Student" && (
                    <button
                      onClick={() => handleRoleChange(u._id, "Moderator")}
                      className="px-3 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    >
                      Make Moderator
                    </button>
                  )}

                  {isMySelf ? (
                    <span className="text-sm text-gray-400 italic px-3 py-2">
                      You
                    </span>
                  ) : (
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="px-3 py-2 text-xs font-medium bg-red-600 hover:bg-red-700 text-white rounded-md"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-200 text-gray-700 text-lg">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u, idx) => {
              const isMySelf = u.email === user.email;

              return (
                <tr
                  key={u._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-5 text-[16px] font-medium">{idx + 1}</td>
                  <td className="p-5 font-medium text-[16px]">{u.name}</td>
                  <td className="p-5 text-gray-600 font-medium text-[15px]">
                    {u.email}
                  </td>
                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-[14px] font-semibold ${roleBadge(
                        u.role
                      )}`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2 justify-center flex-wrap">
                      {!isMySelf && u.role !== "Admin" && (
                        <button
                          onClick={() => handleRoleChange(u._id, "Admin")}
                          className="px-3 py-2 text-[12px] font-medium bg-green-600 hover:bg-green-700 text-white rounded-md text-xs"
                        >
                          Make Admin
                        </button>
                      )}

                      {!isMySelf && u.role === "Student" && (
                        <button
                          onClick={() => handleRoleChange(u._id, "Moderator")}
                          className="px-3 py-2 font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs"
                        >
                          Make Moderator
                        </button>
                      )}

                      {isMySelf ? (
                        <span className="text-[15px] text-gray-400 italic">
                          You
                        </span>
                      ) : (
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="px-3 py-2 font-medium bg-red-600 hover:bg-red-700 text-white rounded-md text-xs"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
