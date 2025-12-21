import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (user?.email) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/applications/user/${user.email}`
      );
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to load applications", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (applicationId) => {
    const result = await Swal.fire({
      title: "Delete Application?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:3000/applications/${applicationId}`, {
          method: "DELETE",
        });
        setApplications(
          applications.filter((app) => app._id !== applicationId)
        );
        Swal.fire("Deleted!", "Application has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete application", error);
      }
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewData.comment.trim()) {
      Swal.fire("Error", "Please add a comment", "warning");
      return;
    }

    try {
      const reviewPayload = {
        scholarshipId: selectedApplication.scholarshipId,
        scholarshipName: selectedApplication.scholarshipName,
        universityName: selectedApplication.universityName,
        reviewerName: user.displayName,
        reviewerEmail: user.email,
        rating: reviewData.rating,
        comment: reviewData.comment,
        reviewDate: new Date().toISOString(),
      };

      await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewPayload),
      });

      setShowReviewModal(false);
      setReviewData({ rating: 5, comment: "" });
      Swal.fire("Success", "Review submitted successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to submit review", error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await fetch(
        `http://localhost:3000/applications/${selectedApplication._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        }
      );

      const updatedApplications = applications.map((app) =>
        app._id === selectedApplication._id ? { ...app, ...editData } : app
      );
      setApplications(updatedApplications);
      setShowEditModal(false);
      Swal.fire("Success", "Application updated successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update application", error);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          colors[status] || colors.pending
        }`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1) || "Pending"}
      </span>
    );
  };

  const handlePayment = async (application) => {
    try {
      const paymentInfo = {
        applicationFees: application.applicationFees,
        applicationId: application._id,
        applicantEmail: application.applicantEmail,
        scholarshipName: application.scholarshipName,
        universityName: application.universityName, 
      };

      const res = await axios.post(
        "http://localhost:3000/create-checkout-session",
        paymentInfo
      );

      window.location.assign(res.data.url);
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
      Swal.fire("Error", "Payment failed", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Applications</h2>
        <p className="text-gray-600 mt-1">
          Manage your scholarship applications
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No Applications Yet
          </h3>
          <p className="text-gray-500">
            You haven't applied for any scholarships yet.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  University
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Address
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Subject
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Fees
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Feedback
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                  Payment
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">
                      {application.universityName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {application.scholarshipName}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {application.universityAddress || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {application.subjectCategory || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-green-600">
                    ${application.applicationFees || 0}
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(application.applicationStatus)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                    {application.feedback || "No feedback yet"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {application.paymentStatus === "paid" ? (
                      <span className="text-green-600 font-semibold text-xs">
                        Paid
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePayment(application)}
                        className="px-3 py-1 bg-green-500 text-white text-xs rounded"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-center flex-wrap">
                      <button
                        onClick={() => {
                          setSelectedApplication(application);
                          setShowDetailsModal(true);
                        }}
                        className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                      >
                        Details
                      </button>

                      {application.applicationStatus === "pending" && (
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setEditData({
                              subjectCategory: application.subjectCategory,
                            });
                            setShowEditModal(true);
                          }}
                          className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                      )}

                      {application.applicationStatus === "pending" && (
                        <button
                          onClick={() => handleDelete(application._id)}
                          className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      )}

                      {application.applicationStatus === "completed" && (
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setShowReviewModal(true);
                          }}
                          className="px-3 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600"
                        >
                          Review
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Application Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Scholarship:</span>{" "}
                  {selectedApplication.scholarshipName}
                </div>
                <div>
                  <span className="font-medium">University:</span>{" "}
                  {selectedApplication.universityName}
                </div>
                <div>
                  <span className="font-medium">Applied Date:</span>{" "}
                  {new Date(
                    selectedApplication.appliedDate
                  ).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Status:</span>{" "}
                  {getStatusBadge(selectedApplication.applicationStatus)}
                </div>
                <div>
                  <span className="font-medium">Fees:</span> $
                  {selectedApplication.applicationFees}
                </div>
                <div>
                  <span className="font-medium">Payment:</span>{" "}
                  {selectedApplication.paymentStatus || "Pending"}
                </div>
                <div>
                  <span className="font-medium">Feedback:</span>{" "}
                  {selectedApplication.feedback || "No feedback yet"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReviewModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add Review</h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">
                  Reviewing: {selectedApplication.scholarshipName}
                </p>
                <p className="text-xs text-gray-500">
                  University: {selectedApplication.universityName}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-1 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() =>
                        setReviewData({ ...reviewData, rating: star })
                      }
                      className={`text-2xl transition-colors ${
                        star <= reviewData.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } hover:text-yellow-400`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <p className="text-center text-xs text-gray-500 mt-1">
                  {reviewData.rating} out of 5 stars
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Comment
                </label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, comment: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                  rows="4"
                  placeholder="Share your experience with this scholarship program..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="flex-1 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedApplication && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-200 rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit Application</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={editData.subjectCategory}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      subjectCategory: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubmit}
                  className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
