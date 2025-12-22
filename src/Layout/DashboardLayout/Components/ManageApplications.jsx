import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingDashboard from "../../../Components/LoadingDashboard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/applications")
      .then(({ data }) => setApplications(data))
      .catch((error) => {
        console.error("Error fetching applications:", error);
        Swal.fire("Error", "Failed to load applications", "error");
      })
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const updateStatus = (id, status) => {
    setUpdatingStatus(true);
    axiosSecure
      .patch(`/applications/${id}`, { applicationStatus: status })
      .then(() => {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, applicationStatus: status } : app
          )
        );
        Swal.fire("Success", `Status updated to ${status}`, "success");
      })
      .catch((error) => Swal.fire("Error", "Failed to update status", error))
      .finally(() => setUpdatingStatus(false));
  };

  const handleStatusUpdate = (app, newStatus) => {
    setSelectedApp(app);
    updateStatus(app._id, newStatus);
  };


  const submitFeedback = () => {
    if (!feedback.trim()) {
      Swal.fire("Error", "Please enter feedback", "warning");
      return;
    }

    axiosSecure
      .patch(`/applications/${selectedApp._id}`, { feedback })
      .then(() => {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === selectedApp._id ? { ...app, feedback } : app
          )
        );
        setFeedback("");
        setShowFeedback(false);
        Swal.fire("Success", "Feedback added successfully", "success");
      })
      .catch((error) => Swal.fire("Error", "Failed to add feedback", error));
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
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

  if (loading) {
    return <LoadingDashboard></LoadingDashboard>;
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <title>Manage Application</title>
      <div className="mb-4 sm:mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border">
          <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-3 sm:gap-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center sm:mr-3 shrink-0">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                Scholarship Applications
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Manage student applications
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-lg sm:text-xl font-bold text-blue-600">
                {applications.length}
              </div>
              <div className="text-xs sm:text-sm text-blue-700">Total</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-lg sm:text-xl font-bold text-green-600">
                {
                  applications.filter(
                    (app) => app.applicationStatus === "completed"
                  ).length
                }
              </div>
              <div className="text-xs sm:text-sm text-green-700">Approved</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg text-center">
              <div className="text-lg sm:text-xl font-bold text-yellow-600">
                {
                  applications.filter(
                    (app) => app.applicationStatus === "pending"
                  ).length
                }
              </div>
              <div className="text-xs sm:text-sm text-yellow-700">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center border">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
            No Applications
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            No scholarship applications submitted yet.
          </p>
        </div>
      ) : (
        <>
          <div className="block lg:hidden space-y-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-lg shadow-sm border p-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0">
                      {app.applicantName?.charAt(0)?.toUpperCase() || "S"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {app.applicantName}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {app.applicantEmail}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-500">University:</span>
                      <div className="font-medium text-gray-900 truncate">
                        {app.universityName}
                      </div>
                      <div className="text-gray-500 truncate">
                        {app.scholarshipName}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Subject:</span>
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {app.subjectCategory || "General"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Amount:</span>
                      <div className="font-semibold text-green-600">
                        ${app.applicationFees || 0}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Payment:</span>
                      <div className="mt-1">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            app.paymentStatus === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {app.paymentStatus === "paid" ? "Paid" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-500 text-xs">Status:</span>
                      <div className="mt-1">
                        {getStatusBadge(app.applicationStatus)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t">
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setShowDetails(true);
                      }}
                      className="px-3 py-1.5 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </button>
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setFeedback(app.feedback || "");
                        setShowFeedback(true);
                      }}
                      className="px-3 py-1.5 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      Feedback
                    </button>

                    <div className="flex gap-1 flex-wrap">
                      {app.applicationStatus !== "processing" && (
                        <button
                          onClick={() => handleStatusUpdate(app, "processing")}
                          disabled={updatingStatus}
                          className="px-3 py-1.5 bg-linear-to-r from-blue-500 to-blue-600 text-white text-xs rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-1 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          {updatingStatus ? "..." : "Processing"}
                        </button>
                      )}
                      {app.applicationStatus !== "completed" && (
                        <button
                          onClick={() => handleStatusUpdate(app, "completed")}
                          disabled={updatingStatus}
                          className="px-3 py-1.5 bg-linear-to-r from-green-500 to-green-600 text-white text-xs rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center gap-1 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {updatingStatus ? "..." : "Complete"}
                        </button>
                      )}
                      {app.applicationStatus !== "rejected" && (
                        <button
                          onClick={() => handleStatusUpdate(app, "rejected")}
                          disabled={updatingStatus}
                          className="px-3 py-1.5 bg-linear-to-r from-red-500 to-red-600 text-white text-xs rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center gap-1 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          {updatingStatus ? "..." : "Reject"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Student
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      University
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Subject
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Payment
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                            {app.applicantName?.charAt(0)?.toUpperCase() || "S"}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {app.applicantName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {app.applicantEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">
                          {app.universityName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {app.scholarshipName}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {app.subjectCategory || "General"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-green-600">
                          ${app.applicationFees || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(app.applicationStatus)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            app.paymentStatus === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {app.paymentStatus === "paid" ? "Paid" : "Pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setShowDetails(true);
                            }}
                            className="px-3 py-1.5 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </button>
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setFeedback(app.feedback || "");
                              setShowFeedback(true);
                            }}
                            className="px-3 py-1.5 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            Feedback
                          </button>
                        
                          <div className="flex gap-1 flex-wrap">
                            {app.applicationStatus !== "processing" && (
                              <button
                                onClick={() => handleStatusUpdate(app, "processing")}
                                disabled={updatingStatus}
                                className="px-3 py-1.5 bg-linear-to-r from-blue-500 to-blue-600 text-white text-xs rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-1 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                {updatingStatus ? "..." : "Processing"}
                              </button>
                            )}
                            {app.applicationStatus !== "completed" && (
                              <button
                                onClick={() => handleStatusUpdate(app, "completed")}
                                disabled={updatingStatus}
                                className="px-3 py-1.5 bg-linear-to-r from-green-500 to-green-600 text-white text-xs rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center gap-1 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {updatingStatus ? "..." : "Complete"}
                              </button>
                            )}
                            {app.applicationStatus !== "rejected" && (
                              <button
                                onClick={() => handleStatusUpdate(app, "rejected")}
                                disabled={updatingStatus}
                                className="px-3 py-1.5 bg-linear-to-r from-red-500 to-red-600 text-white text-xs rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center gap-1 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                {updatingStatus ? "..." : "Reject"}
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {showDetails && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Application Details
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                      Student Information
                    </h4>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Name:</span>{" "}
                        {selectedApp.applicantName}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span>{" "}
                        {selectedApp.applicantEmail}
                      </div>
                      <div>
                        <span className="font-medium">Applied:</span>{" "}
                        {new Date(selectedApp.appliedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                      Academic Details
                    </h4>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-2 text-sm">
                      <div>
                        <span className="font-medium">University:</span>{" "}
                        {selectedApp.universityName}
                      </div>
                      <div>
                        <span className="font-medium">Scholarship:</span>{" "}
                        {selectedApp.scholarshipName}
                      </div>
                      <div>
                        <span className="font-medium">Subject:</span>{" "}
                        {selectedApp.subjectCategory}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                      Financial & Status
                    </h4>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Amount:</span>{" "}
                        <span className="text-green-600 font-semibold">
                          ${selectedApp.applicationFees}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Status:</span>{" "}
                        {getStatusBadge(selectedApp.applicationStatus)}
                      </div>
                      <div>
                        <span className="font-medium">Payment:</span>
                        <span
                          className={`ml-2 px-2 py-1 rounded text-xs ${
                            selectedApp.paymentStatus === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {selectedApp.paymentStatus === "paid"
                            ? "Paid"
                            : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                      Feedback
                    </h4>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-gray-700 text-sm">
                        {selectedApp.feedback || "No feedback provided yet."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 space-y-4">
                <div className="bg-linear-to-br from-gray-50 via-white to-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">
                        Update Application Status
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Change the current status of this application
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      onClick={() => handleStatusUpdate(selectedApp, "processing")}
                      disabled={updatingStatus || selectedApp.applicationStatus === "processing"}
                      className={`group relative overflow-hidden px-6 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                        selectedApp.applicationStatus === "processing"
                          ? "bg-blue-100 text-blue-800 border-2 border-blue-300 cursor-not-allowed shadow-inner"
                          : "bg-linear-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-2xl"
                      } disabled:opacity-50 disabled:transform-none`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>
                          {updatingStatus ? "Updating..." : selectedApp.applicationStatus === "processing" ? "Currently Processing" : "Set to Processing"}
                        </span>
                      </div>
                      {selectedApp.applicationStatus !== "processing" && (
                        <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleStatusUpdate(selectedApp, "completed")}
                      disabled={updatingStatus || selectedApp.applicationStatus === "completed"}
                      className={`group relative overflow-hidden px-6 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                        selectedApp.applicationStatus === "completed"
                          ? "bg-green-100 text-green-800 border-2 border-green-300 cursor-not-allowed shadow-inner"
                          : "bg-linear-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-2xl"
                      } disabled:opacity-50 disabled:transform-none`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>
                          {updatingStatus ? "Updating..." : selectedApp.applicationStatus === "completed" ? "Already Completed" : "Mark as Completed"}
                        </span>
                      </div>
                      {selectedApp.applicationStatus !== "completed" && (
                        <div className="absolute inset-0 bg-linear-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleStatusUpdate(selectedApp, "rejected")}
                      disabled={updatingStatus || selectedApp.applicationStatus === "rejected"}
                      className={`group relative overflow-hidden px-6 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                        selectedApp.applicationStatus === "rejected"
                          ? "bg-red-100 text-red-800 border-2 border-red-300 cursor-not-allowed shadow-inner"
                          : "bg-linear-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 shadow-lg hover:shadow-2xl"
                      } disabled:opacity-50 disabled:transform-none`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>
                          {updatingStatus ? "Updating..." : selectedApp.applicationStatus === "rejected" ? "Already Rejected" : "Reject Application"}
                        </span>
                      </div>
                      {selectedApp.applicationStatus !== "rejected" && (
                        <div className="absolute inset-0 bg-linear-to-r from-red-600 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                      <span className="text-sm font-medium text-gray-700">Current Status:</span>
                      <span className="ml-2">{getStatusBadge(selectedApp.applicationStatus)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowDetails(false)}
                  className="w-full px-6 py-4 bg-linear-to-r from-gray-500 to-gray-600 text-white rounded-2xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFeedback && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Add Feedback
                </h3>
                <button
                  onClick={() => setShowFeedback(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-4 bg-blue-50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-3 shrink-0">
                    {selectedApp.applicantName?.charAt(0)?.toUpperCase() || "S"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                      {selectedApp.applicantName}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 truncate">
                      {selectedApp.universityName}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Feedback Message
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                  rows="4"
                  placeholder="Provide feedback about the application..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowFeedback(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={submitFeedback}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;
