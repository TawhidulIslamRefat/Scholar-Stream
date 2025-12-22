import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UpdateScholarshipModal from "./UpdateScholarshipModal";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import LoadingDashboard from "../../../Components/LoadingDashboard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/top-scholarships")
      .then(({ data }) => setScholarships(data))
      .catch((err) => {
        console.error("Failed to load scholarships:", err);
        Swal.fire("Error", "Unable to fetch scholarships", "error");
      })
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This scholarship will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/scholarships/${id}`)
          .then(() => {
            setScholarships(scholarships.filter((item) => item._id !== id));
            Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
          })
          .catch((err) => {
            console.error("Failed to delete scholarship:", err);
            Swal.fire("Error", "Failed to delete scholarship.", "error");
          });
      }
    });
  };

  if (loading) {
    return <LoadingDashboard></LoadingDashboard>;
  }

  return (
    <div className="max-w-8xl mx-auto p-3 sm:p-4 md:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
        Manage Scholarships
      </h1>

      <div className="block lg:hidden space-y-4">
        {scholarships.length === 0 ? (
          <p className="text-center py-6 text-gray-500 text-sm sm:text-base">
            No scholarships found.
          </p>
        ) : (
          scholarships.map((item, index) => (
            <div
              key={item._id}
              className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="shrink-0">
                    <img
                      src={item.universityImage}
                      alt="university"
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-500">
                        #{index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2">
                      {item.scholarshipName}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {item.universityName}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-500">Country:</span>
                    <div className="font-medium text-gray-900 truncate">
                      {item.universityCountry}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">World Rank:</span>
                    <div className="font-medium text-gray-900">
                      {item.universityWorldRank}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Degree:</span>
                    <div className="font-medium text-gray-900 truncate">
                      {item.degree}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Deadline:</span>
                    <div className="font-medium text-gray-900">
                      {item.applicationDeadline}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t justify-center">
                  <button
                    onClick={() => setSelectedScholarship(item)}
                    className="btn px-3 py-2 bg-primary text-white rounded hover:bg-green-700 transition-colors"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    <MdOutlineDeleteOutline className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden lg:block overflow-x-auto bg-white shadow rounded-xl">
        <table className="table w-full">
          <thead className="bg-gray-200">
            <tr className="text-gray-700 text-[17px]">
              <th>#</th>
              <th>Image</th>
              <th>Scholarship Name</th>
              <th>University</th>
              <th>Country</th>
              <th>World Rank</th>
              <th>Degree</th>
              <th>Deadline</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {scholarships.map((item, index) => (
              <tr key={item._id} className="hover">
                <td>{index + 1}</td>

                <td>
                  <img
                    src={item.universityImage}
                    alt="university"
                    className="w-14 h-14 rounded object-cover"
                  />
                </td>

                <td className="font-semibold text-[16px]">
                  {item.scholarshipName}
                </td>
                <td className="font-medium">{item.universityName}</td>
                <td className="font-medium">{item.universityCountry}</td>
                <td className="font-medium">{item.universityWorldRank}</td>
                <td className="font-medium">{item.degree}</td>
                <td className="font-medium">{item.applicationDeadline}</td>

                <td className="flex gap-2 h-21 justify-center items-center">
                  <button
                    onClick={() => setSelectedScholarship(item)}
                    className="btn px-3 py-2 bg-primary text-white rounded"
                  >
                    <FiEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <MdOutlineDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {scholarships.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            No scholarships found.
          </p>
        )}
      </div>
      {selectedScholarship && (
        <UpdateScholarshipModal
          scholarship={selectedScholarship}
          onClose={() => setSelectedScholarship(null)}
          onUpdate={(updated) =>
            setScholarships((prev) =>
              prev.map((s) => (s._id === updated._id ? updated : s))
            )
          }
        />
      )}
    </div>
  );
};

export default ManageScholarships;
