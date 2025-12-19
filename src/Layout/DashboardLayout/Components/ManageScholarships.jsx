import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UpdateScholarshipModal from "./UpdateScholarshipModal";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/scholarships")
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data);
        setLoading(false);
      });
  }, []);
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
        fetch(`http://localhost:3000/scholarships/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setScholarships(
              scholarships.filter((item) => item._id !== id)
            );

            Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
          });
      }
    });
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-8xl mx-auto p-3">
      <h1 className="text-3xl font-bold text-center mb-8">
        Manage Scholarships
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
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

                <td className="font-semibold text-[16px]">{item.scholarshipName}</td>
                <td className="font-medium">{item.universityName}</td>
                <td className="font-medium">{item.universityCountry}</td>
                <td className="font-medium">{item.universityWorldRank}</td>
                <td className="font-medium">{item.degree}</td>
                <td className="font-medium">{item.applicationDeadline}</td>

                <td className="flex gap-2 h-21  justify-center items-center">
                  <button
                    onClick={() => setSelectedScholarship(item)}
                    className="btn px-3 py-2 bg-primary text-white rounded "
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
