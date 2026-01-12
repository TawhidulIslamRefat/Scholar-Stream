import React, { useEffect, useState, useMemo } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import LoadingDashboard from "../../../Components/LoadingDashboard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiFilter,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiEye,
  FiBook,
  FiChevronDown,
  FiRefreshCw,
  FiAlertCircle,
  FiEdit,
  FiTrash2,
  FiCreditCard,
  FiStar,
  FiBriefcase
} from "react-icons/fi";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      fetchApplications();
    }
  }, [user, axiosSecure]);

  const fetchApplications = () => {
    setLoading(true);
    axiosSecure
      .get(`/applications/user/${user.email}`)
      .then(({ data }) => setApplications(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to load applications", "error");
      })
      .finally(() => setLoading(false));
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        (app.scholarshipName || "").toLowerCase().includes(searchStr) ||
        (app.universityName || "").toLowerCase().includes(searchStr);
      const matchesStatus = statusFilter === "all" || app.applicationStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const stats = useMemo(() => [
    { label: "Total Applied", value: applications.length, icon: FiBook, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending Review", value: applications.filter(a => (a.applicationStatus || 'pending') === 'pending').length, icon: FiClock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Approved Items", value: applications.filter(a => a.applicationStatus === 'completed').length, icon: FiCheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Fees Settled", value: applications.filter(a => a.paymentStatus === 'paid').length, icon: FiCreditCard, color: "text-indigo-600", bg: "bg-indigo-50" }
  ], [applications]);

  const handleDelete = (applicationId) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to remove this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/applications/${applicationId}`)
          .then(() => {
            setApplications((prev) => prev.filter((app) => app._id !== applicationId));
            Swal.fire("Removed", "Application has been deleted successfully.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Failed to delete application", "error");
          });
      }
    });
  };

  const handleSubmitReview = () => {
    if (!reviewData.comment.trim()) {
      Swal.fire("Note", "Please provide a comment for your review.", "info");
      return;
    }
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
    axiosSecure
      .post("/reviews", reviewPayload)
      .then(() => {
        setShowReviewModal(false);
        setReviewData({ rating: 5, comment: "" });
        Swal.fire("Thank You", "Your feedback has been submitted.", "success");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to submit review", "error");
      });
  };

  const handleEditSubmit = () => {
    axiosSecure
      .patch(`/applications/${selectedApplication._id}`, editData)
      .then(() => {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === selectedApplication._id ? { ...app, ...editData } : app
          )
        );
        setShowEditModal(false);
        Swal.fire("Success", "Application updated successfully", "success");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update application", "error");
      });
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: "bg-amber-100/80 text-amber-700 border-amber-200",
      processing: "bg-blue-100/80 text-blue-700 border-blue-200",
      completed: "bg-emerald-100/80 text-emerald-700 border-emerald-200",
      rejected: "bg-rose-100/80 text-rose-700 border-rose-200",
    }[status || "pending"];

    return (
      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border uppercase tracking-wider ${config}`}>
        {status === 'completed' ? 'Approved' : (status || 'pending')}
      </span>
    );
  };

  const handlePayment = (application) => {
    const paymentInfo = {
      applicationFees: application.applicationFees,
      applicationId: application._id,
      applicantEmail: application.applicantEmail,
      scholarshipName: application.scholarshipName,
      universityName: application.universityName,
    };

    axiosSecure
      .post("/create-checkout-session", paymentInfo)
      .then((res) => {
        window.location.assign(res.data.url);
      })
      .catch((err) => {
        console.error("Payment error:", err.response?.data || err.message);
        Swal.fire("Payment Notice", "Encountered an issue redirecting to payment gateway.", "error");
      });
  };

  if (loading) return <LoadingDashboard />;

  return (
    <div className="p-0 sm:p-8 bg-[#F1F5F9] min-h-screen space-y-6">
      <title>My Applications | ScholarPoint</title>
      <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-50 blur-2xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <FiBriefcase className="w-4 h-4" /> Personal Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight">
            Manage <span className="text-primary">Applications</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2 max-w-xl font-medium">
            Review and track the progress of your scholarship submissions. Maintain your documents and engage with feedback.
          </p>
        </div>
        <div className="flex gap-3 relative z-10">
          <button onClick={fetchApplications} className="flex items-center gap-2 px-5 py-3 bg-indigo-50 text-primary rounded-xl font-bold text-sm hover:bg-indigo-100 transition-colors border-none cursor-pointer active:scale-95">
            <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <div
            key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4 hover:border-indigo-300 transition-all group"
          >
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-105 transition-transform`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">{stat.label}</p>
              <h3 className="text-xl font-extrabold text-slate-800 leading-none">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
        <div className="relative flex-1 group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input
            type="text" placeholder="Search by program or university..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-lg border border-transparent focus:border-indigo-200 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-sm font-medium text-slate-700"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="relative min-w-[160px]">
            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              className="w-full pl-11 pr-10 py-3 bg-slate-50 rounded-lg appearance-none outline-none border border-transparent focus:border-indigo-200 focus:bg-white text-sm font-bold text-slate-600 cursor-pointer"
              value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Status: All</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="bg-white py-16 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center px-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <FiAlertCircle className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No applications found</h3>
            <p className="text-slate-500 text-sm max-w-xs mt-1">Start your journey by applying for scholarships in the main directory.</p>
          </div>
        ) : (
          <>
            <div className="hidden xl:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4">Institution & Program</th>
                      <th className="px-6 py-4">Subject</th>
                      <th className="px-6 py-4">Financials</th>
                      <th className="px-6 py-4">Current Status</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <AnimatePresence mode='popLayout text-xs'>
                      {filteredApplications.map((app) => (
                        <motion.tr
                          layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          key={app._id} className="hover:bg-slate-50/80 transition-colors group"
                        >
                          <td className="px-6 py-5">
                            <div>
                              <p className="font-bold text-slate-800 text-sm">{app.universityName}</p>
                              <p className="text-xs text-primary font-medium mt-0.5">{app.scholarshipName}</p>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-xs font-bold text-slate-600">{app.subjectCategory || "General"}</p>
                            <p className="text-[10px] text-slate-400 font-medium">Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>
                          </td>
                          <td className="px-6 py-5">
                            <p className="font-bold text-slate-800 text-sm">${app.applicationFees || 0}</p>
                            <span className={`text-[10px] font-bold uppercase tracking-tight ${app.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                              {app.paymentStatus === "paid" ? "Payment Confirmed" : "Awaiting Fees"}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            {getStatusBadge(app.applicationStatus)}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-center gap-1.5 font-bold">
                              <button onClick={() => { setSelectedApplication(app); setShowDetailsModal(true); }} className="p-2.5 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors border-none bg-transparent cursor-pointer" title="View Details">
                                <FiEye className="w-4 h-4" />
                              </button>

                              {app.paymentStatus !== "paid" && (
                                <button onClick={() => handlePayment(app)} className="p-2.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors border-none bg-transparent cursor-pointer" title="Pay Now">
                                  <FiCreditCard className="w-4 h-4" />
                                </button>
                              )}

                              {app.applicationStatus === "pending" && (
                                <>
                                  <button onClick={() => { setSelectedApplication(app); setEditData({ subjectCategory: app.subjectCategory }); setShowEditModal(true); }} className="p-2.5 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors border-none bg-transparent cursor-pointer" title="Edit">
                                    <FiEdit className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => handleDelete(app._id)} className="p-2.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors border-none bg-transparent cursor-pointer" title="Remove">
                                    <FiTrash2 className="w-4 h-4" />
                                  </button>
                                </>
                              )}

                              {app.applicationStatus === "completed" && (
                                <button onClick={() => { setSelectedApplication(app); setShowReviewModal(true); }} className="p-2.5 hover:bg-purple-50 text-purple-600 rounded-lg transition-colors border-none bg-transparent cursor-pointer" title="Review">
                                  <FiStar className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode='popLayout'>
                {filteredApplications.map((app) => (
                  <motion.div
                    layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    key={app._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-slate-800 text-sm leading-tight truncate">{app.universityName}</h4>
                        <p className="text-[11px] text-primary font-bold mt-0.5 truncate uppercase tracking-tighter">{app.scholarshipName}</p>
                      </div>
                      <div className="ml-2">
                        {getStatusBadge(app.applicationStatus)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Subject</p>
                        <p className="text-xs font-bold text-slate-700">{app.subjectCategory || "General"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Fees</p>
                        <p className="text-xs font-extrabold text-slate-800">${app.applicationFees || 0}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => { setSelectedApplication(app); setShowDetailsModal(true); }} className="flex-1 py-2.5 bg-indigo-50 text-indigo-600 text-[11px] font-bold uppercase rounded-lg hover:bg-indigo-100 border-none cursor-pointer">Details</button>

                      {app.paymentStatus !== "paid" && (
                        <button onClick={() => handlePayment(app)} className="flex-1 py-2.5 bg-emerald-50 text-emerald-600 text-[11px] font-bold uppercase rounded-lg hover:bg-emerald-100 border-none cursor-pointer">Pay Now</button>
                      )}

                      {app.applicationStatus === "pending" && (
                        <>
                          <button onClick={() => { setSelectedApplication(app); setEditData({ subjectCategory: app.subjectCategory }); setShowEditModal(true); }} className="px-3 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 border-none cursor-pointer"><FiEdit className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(app._id)} className="px-3 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 border-none cursor-pointer"><FiTrash2 className="w-4 h-4" /></button>
                        </>
                      )}

                      {app.applicationStatus === "completed" && (
                        <button onClick={() => { setSelectedApplication(app); setShowReviewModal(true); }} className="flex-1 py-2.5 bg-purple-50 text-purple-600 text-[11px] font-bold uppercase rounded-lg hover:bg-purple-100 border-none cursor-pointer">Add Review</button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {showDetailsModal && selectedApplication && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDetailsModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 p-6 sm:p-8 space-y-8 scrollbar-hide border border-slate-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-800">Application Overview</h3>
                  <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mt-1">Ref ID: {selectedApplication._id}</p>
                </div>
                <button onClick={() => setShowDetailsModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors border-none bg-transparent cursor-pointer">
                  <FiXCircle className="w-8 h-8" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase mb-2">Institutional Details</p>
                    <div className="space-y-4">
                      <DetailBlock label="University Name" value={selectedApplication.universityName} />
                      <DetailBlock label="Scholarship Program" value={selectedApplication.scholarshipName} />
                      <DetailBlock label="Subject Field" value={selectedApplication.subjectCategory} />
                      <DetailBlock label="Campus Location" value={selectedApplication.universityAddress} />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase mb-2">Process Summary</p>
                    <div className="space-y-4">
                      <DetailBlock label="Submission Date" value={new Date(selectedApplication.appliedDate).toLocaleDateString()} />
                      <DetailBlock label="Application Fees" value={`$${selectedApplication.applicationFees}`} />
                      <DetailBlock label="Payment Status" value={selectedApplication.paymentStatus?.toUpperCase() || "PENDING"} />
                    </div>
                  </div>

                  <div className="p-5 mt-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-[11px] font-bold text-slate-400 uppercase mb-3 px-1">Officer Feedback</p>
                    <p className="text-sm font-medium text-slate-700 italic px-1 leading-relaxed">
                      "{selectedApplication.feedback || "No administrative notes yet. Status will be updated as review progresses."}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button onClick={() => setShowDetailsModal(false)} className="w-full py-4 bg-slate-800 text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-slate-900 transition-all border-none cursor-pointer">
                  Done Viewing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReviewModal && selectedApplication && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowReviewModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 p-8 space-y-6 border border-slate-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-purple-600">
                  <FiStar className="w-8 h-8 fill-current" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-800">Share Your Experience</h3>
                <p className="text-slate-500 text-sm mt-1">Draft a review for {selectedApplication.universityName}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                      className={`text-2xl transition-all border-none bg-transparent cursor-pointer p-1 ${star <= reviewData.rating ? 'text-amber-400 scale-110' : 'text-slate-200 hover:text-amber-200'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1">Comments</label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all outline-none resize-none min-h-[120px] text-sm font-medium text-slate-700"
                    placeholder="Describe the application process or campus experience..."
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowReviewModal(false)} className="flex-1 py-3.5 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors border-none bg-transparent cursor-pointer">Discard</button>
                <button onClick={handleSubmitReview} className="flex-1 py-3.5 bg-purple-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-purple-700 transition-all border-none cursor-pointer">Submit Feedback</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditModal && selectedApplication && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowEditModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 p-8 space-y-6 border border-slate-200">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                  <FiEdit className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-800">Edit Application Details</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1">Primary Subject Field</label>
                  <input
                    type="text"
                    value={editData.subjectCategory}
                    onChange={(e) => setEditData({ ...editData, subjectCategory: e.target.value })}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-amber-100 outline-none text-sm font-bold text-slate-700 transition-all shadow-xs"
                    placeholder="e.g. Computer Science & Engineering"
                  />
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                  <FiAlertCircle className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Changes are permitted only while application is 'Pending'. This update resets the officer review timestamp.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowEditModal(false)} className="flex-1 py-3.5 text-sm font-bold text-slate-400 hover:text-slate-600 border-none bg-transparent cursor-pointer">Cancel</button>
                <button onClick={handleEditSubmit} className="flex-1 py-3.5 bg-amber-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-amber-600 transition-all border-none cursor-pointer">Update Records</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};


const DetailBlock = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{label}</p>
    <p className="text-sm font-extrabold text-slate-700 mt-0.5">{value || "Not Provided"}</p>
  </div>
);

export default MyApplications;