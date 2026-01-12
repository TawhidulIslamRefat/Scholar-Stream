import React, { useEffect, useState, useMemo } from "react";
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
  FiMessageSquare,
  FiMoreVertical,
  FiMapPin,
  FiMail,
  FiUser,
  FiCalendar,
  FiDollarSign,
  FiBook,
  FiChevronDown,
  FiRefreshCw,
  FiAlertCircle
} from "react-icons/fi";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchApplications();
  }, [axiosSecure]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data } = await axiosSecure.get("/applications");
      setApplications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      Swal.fire({
        icon: "error",
        title: "Connection Error",
        text: "Failed to load applications. Please check your connection.",
        confirmButtonColor: "#3B82F6",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch =
        (app.applicantName || "").toLowerCase().includes(searchStr) ||
        (app.applicantEmail || "").toLowerCase().includes(searchStr) ||
        (app.universityName || "").toLowerCase().includes(searchStr);

      const matchesStatus = statusFilter === "all" || app.applicationStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const updateStatus = async (id, status) => {
    setUpdatingStatus(true);
    try {
      await axiosSecure.patch(`/applications/${id}`, { applicationStatus: status });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, applicationStatus: status } : app
        )
      );
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: `Status set to ${status}`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not update status.",
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleStatusUpdate = (app, newStatus) => {
    Swal.fire({
      title: "Confirm Update",
      text: `Change status to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#6B7280",
    }).then((res) => {
      if (res.isConfirmed) updateStatus(app._id, newStatus);
    });
  };

  const submitFeedback = async () => {
    if (!feedback.trim()) return;
    try {
      await axiosSecure.patch(`/applications/${selectedApp._id}`, { feedback });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === selectedApp._id ? { ...app, feedback } : app
        )
      );
      setFeedback("");
      setShowFeedback(false);
      Swal.fire("Success", "Feedback added", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to save feedback");
    }
  };

  const getStatusInfo = (status) => {
    const config = {
      pending: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: FiClock, label: "Pending" },
      processing: { color: "bg-blue-100 text-blue-700 border-blue-200", icon: FiRefreshCw, label: "Processing" },
      completed: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: FiCheckCircle, label: "Approved" },
      rejected: { color: "bg-rose-100 text-rose-700 border-rose-200", icon: FiXCircle, label: "Rejected" },
    }[status || "pending"];

    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-tight ${config.color}`}>
        <Icon className={status === "processing" ? "animate-spin" : ""} />
        {config.label}
      </span>
    );
  };

  if (loading) return <LoadingDashboard />;

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen space-y-8">
      <title>Manage Applications | ScholarPoint</title>

      {/* Header Section */}
      <div className="bg-linear-to-r from-gray-900 via-blue-950 to-gray-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 flex items-center gap-3">
            <FiBook className="text-blue-400" /> Scholarship Applications
          </h1>
          <p className="text-gray-300 text-sm sm:text-lg max-w-2xl leading-relaxed">
            Review, evaluate, and manage student submissions. Guide the next generation of scholars towards their dreams.
          </p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Total Applications", value: applications.length, icon: FiBook, color: "from-blue-500 to-indigo-600" },
          { label: "Pending Review", value: applications.filter(a => (a.applicationStatus || 'pending') === 'pending').length, icon: FiClock, color: "from-amber-400 to-orange-500" },
          { label: "Approved Items", value: applications.filter(a => a.applicationStatus === 'completed').length, icon: FiCheckCircle, color: "from-emerald-400 to-teal-500" },
          { label: "Rejected Applications", value: applications.filter(a => a.applicationStatus === 'rejected').length, icon: FiXCircle, color: "from-rose-400 to-pink-500" }
        ].map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            key={i} className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow group"
          >
            <div className={`p-3.5 sm:p-4 rounded-xl bg-linear-to-br ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-xl sm:text-2xl font-black text-gray-800">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters & Control Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text" placeholder="Search by name, email, or university..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm font-medium"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 md:min-w-[200px]">
            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              className="w-full pl-11 pr-10 py-3 bg-gray-50 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-blue-500 text-sm font-bold text-gray-700 cursor-pointer"
              value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button onClick={fetchApplications} className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors border-none cursor-pointer active:scale-95" title="Refresh">
            <FiRefreshCw className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="bg-white py-20 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center px-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <FiAlertCircle className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">No Applications Found</h3>
            <p className="text-gray-500 max-w-xs">Try adjusting your search or filter settings to find what you're looking for.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View (Hidden on mobile/tablet) */}
            <div className="hidden xl:block bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50/50 text-gray-400 uppercase text-[10px] font-black tracking-widest border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-5">Applicant</th>
                      <th className="px-6 py-5">Scholarship Info</th>
                      <th className="px-6 py-5">Financials</th>
                      <th className="px-6 py-5">Status</th>
                      <th className="px-6 py-5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <AnimatePresence mode='popLayout'>
                      {filteredApplications.map((app) => (
                        <motion.tr
                          layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          key={app._id} className="hover:bg-blue-50/30 transition-colors group"
                        >
                          <td className="px-6 py-6 border-none">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                                {app.applicantName?.charAt(0) || "S"}
                              </div>
                              <div>
                                <p className="font-bold text-gray-800 text-sm leading-tight">{app.applicantName}</p>
                                <p className="text-xs text-gray-400 flex font-medium items-center gap-1"><FiMail className="w-3" /> {app.applicantEmail}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-6 border-none">
                            <p className="font-bold text-gray-700 text-sm truncate max-w-[200px]">{app.universityName}</p>
                            <p className="text-xs text-blue-500 font-medium">{app.scholarshipName}</p>
                          </td>
                          <td className="px-6 py-6 border-none font-mono text-sm">
                            <div className="flex flex-col">
                              <span className="font-bold text-green-600 text-base">${app.applicationFees || 0}</span>
                              <span className={`text-[9px] font-black uppercase tracking-tighter ${app.paymentStatus === 'paid' ? 'text-emerald-500' : 'text-amber-500 placeholder-amber-400'}`}>
                                {app.paymentStatus || 'Pending'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-6 border-none">
                            {getStatusInfo(app.applicationStatus)}
                          </td>
                          <td className="px-6 py-6 border-none">
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => { setSelectedApp(app); setShowDetails(true); }} className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors cursor-pointer border-none bg-transparent" title="View Details">
                                <FiEye className="w-5 h-5" />
                              </button>
                              <button onClick={() => { setSelectedApp(app); setFeedback(app.feedback || ""); setShowFeedback(true); }} className="p-2 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors cursor-pointer border-none bg-transparent" title="Add Feedback">
                                <FiMessageSquare className="w-5 h-5" />
                              </button>
                              <div className="relative group/menu">
                                <button className="p-2 hover:bg-gray-100 text-gray-400 rounded-lg cursor-pointer border-none bg-transparent">
                                  <FiMoreVertical className="w-5 h-5" />
                                </button>
                                <div className="absolute right-0 top-full mt-1 bg-white shadow-2xl border border-gray-100 rounded-2xl py-2 w-48 z-50 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all ring-1 ring-black/5">
                                  {[
                                    { key: 'processing', label: 'Start Processing', icon: FiRefreshCw, color: 'text-blue-600' },
                                    { key: 'completed', label: 'Approve Application', icon: FiCheckCircle, color: 'text-emerald-600' },
                                    { key: 'rejected', label: 'Reject Application', icon: FiXCircle, color: 'text-rose-600' }
                                  ].map((action) => (
                                    <button
                                      key={action.key} onClick={() => handleStatusUpdate(app, action.key)}
                                      disabled={app.applicationStatus === action.key}
                                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold hover:bg-gray-50 ${action.color} disabled:opacity-30 disabled:pointer-events-none cursor-pointer border-none bg-transparent text-left`}
                                    >
                                      <action.icon /> {action.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card List (Hidden on desktop) */}
            <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode='popLayout'>
                {filteredApplications.map((app) => (
                  <motion.div
                    layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    key={app._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4 relative overflow-hidden group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100 shadow-xs">
                          {app.applicantName?.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-black text-gray-800 text-sm leading-tight">{app.applicantName}</h4>
                          <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1 mt-0.5"><FiMail className="w-2.5" /> {app.applicantEmail}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setSelectedApp(app); setShowDetails(true); }} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border-none bg-transparent cursor-pointer"><FiEye className="w-5 h-5" /></button>
                        <button onClick={() => { setSelectedApp(app); setFeedback(app.feedback || ""); setShowFeedback(true); }} className="p-2.5 text-purple-600 hover:bg-purple-50 rounded-xl transition-colors border-none bg-transparent cursor-pointer"><FiMessageSquare className="w-5 h-5" /></button>
                      </div>
                    </div>

                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/50 space-y-3">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><FiBook className="w-3" /> Scholarship</p>
                        <p className="text-xs font-bold text-gray-700 line-clamp-1">{app.universityName}</p>
                        <p className="text-[10px] text-blue-500 font-bold mt-0.5">{app.scholarshipName}</p>
                      </div>
                      <div className="flex justify-between items-end pt-2 border-t border-gray-100">
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Financials</p>
                          <p className="text-sm font-black text-emerald-600">${app.applicationFees || 0} <span className="text-[10px] text-gray-400 lowercase font-medium ml-1">fees paid</span></p>
                        </div>
                        {getStatusInfo(app.applicationStatus)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusUpdate(app, 'processing')}
                        disabled={app.applicationStatus === 'processing'}
                        className="flex-1 py-2.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-tight rounded-xl hover:bg-blue-600 hover:text-white transition-all border-none cursor-pointer disabled:opacity-30"
                      >
                        Start Process
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app, 'completed')}
                        disabled={app.applicationStatus === 'completed'}
                        className="flex-1 py-2.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-tight rounded-xl hover:bg-emerald-600 hover:text-white transition-all border-none cursor-pointer disabled:opacity-30"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app, 'rejected')}
                        disabled={app.applicationStatus === 'rejected'}
                        className="flex-1 py-2.5 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-tight rounded-xl hover:bg-rose-600 hover:text-white transition-all border-none cursor-pointer disabled:opacity-30"
                      >
                        Reject
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>

      {/* Details Modal (Mobile Optimized) */}
      <AnimatePresence>
        {showDetails && selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDetails(false)} className="absolute inset-0 bg-gray-900/70 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} className="bg-white rounded-[2rem] sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 scrollbar-hide">
              <div className="p-6 sm:p-10 space-y-8">
                <div className="flex justify-between items-start sticky top-0 bg-white/80 backdrop-blur-md -my-2 py-2 z-10 transition-all">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-gray-800">Application Details</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Review student credentials and choice</p>
                  </div>
                  <button onClick={() => setShowDetails(false)} className="p-2 hover:bg-rose-50 rounded-full text-rose-400 transition-colors cursor-pointer border-none bg-transparent">
                    <FiXCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-8">
                    <section>
                      <h4 className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4 border-b border-blue-50 pb-2"><FiUser className="w-3" /> Student Portfolio</h4>
                      <div className="space-y-4 px-1">
                        <DetailItem label="Full Legal Name" value={selectedApp.applicantName} />
                        <DetailItem label="Personal Email" value={selectedApp.applicantEmail} />
                        <DetailItem label="Application Date" value={new Date(selectedApp.appliedDate || Date.now()).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} />
                      </div>
                    </section>
                    <section>
                      <h4 className="flex items-center gap-2 text-[10px] font-black text-purple-600 uppercase tracking-widest mb-4 border-b border-purple-50 pb-2"><FiBook className="w-3" /> Academic Intent</h4>
                      <div className="space-y-4 px-1">
                        <DetailItem label="Degree Category" value={selectedApp.degree || "Not Specified"} />
                        <DetailItem label="Subject / Field" value={selectedApp.subjectCategory || "General Studies"} />
                      </div>
                    </section>
                  </div>
                  <div className="space-y-8">
                    <section>
                      <h4 className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4 border-b border-emerald-50 pb-2"><FiMapPin className="w-3" /> Destination</h4>
                      <div className="space-y-4 px-1">
                        <DetailItem label="University Name" value={selectedApp.universityName} />
                        <DetailItem label="Award Name" value={selectedApp.scholarshipName} />
                        <DetailItem label="Location" value={`${selectedApp.universityCity || 'International'}, ${selectedApp.universityCountry || ''}`} />
                      </div>
                    </section>
                    <section className="bg-blue-600 p-6 rounded-[1.5rem] text-white shadow-xl shadow-blue-100 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 -mr-4 -mt-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="flex justify-between items-center mb-4 relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">Status & Fees</span>
                        <div className="scale-90 origin-right">
                          {getStatusInfo(selectedApp.applicationStatus)}
                        </div>
                      </div>
                      <div className="relative z-10">
                        <p className="text-3xl font-black flex items-center gap-1.5"><FiDollarSign className="w-6" /> {selectedApp.applicationFees || 0}</p>
                        <p className="text-[10px] font-bold text-blue-200 uppercase mt-1">Non-refundable application fee</p>
                      </div>
                    </section>
                  </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-3 sticky bottom-0 bg-white/80 backdrop-blur-md -my-2 py-4 z-10 border-t border-gray-50">
                  <button onClick={() => setShowDetails(false)} className="flex-1 py-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all cursor-pointer border-none shadow-sm active:scale-95">Back to List</button>
                  <button onClick={() => { setShowDetails(false); setShowFeedback(true); }} className="flex-1 py-4 bg-blue-600 text-white font-black uppercase tracking-wider text-sm rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all cursor-pointer active:scale-95">Submit Feedback</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Feedback Modal (Mobile Optimized) */}
      <AnimatePresence>
        {showFeedback && selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFeedback(false)} className="absolute inset-0 bg-gray-900/70 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl relative z-10 p-8 space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-gray-800 flex items-center gap-2"><FiMessageSquare className="text-blue-500" /> Provide Feedback</h3>
                <button onClick={() => setShowFeedback(false)} className="text-gray-400 hover:text-rose-500 cursor-pointer border-none bg-transparent transition-colors"><FiXCircle className="w-6 h-6" /></button>
              </div>

              <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-100">{selectedApp.applicantName?.charAt(0)}</div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-gray-800 truncate">{selectedApp.applicantName}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5 truncate">{selectedApp.universityName}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Academic Feedback / Reasons</label>
                <textarea
                  value={feedback} onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none resize-none min-h-[160px] text-sm font-medium shadow-inner"
                  placeholder="Explain your decision or ask for more documents..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setShowFeedback(false)} className="flex-1 py-3 text-sm font-bold text-gray-500 hover:text-gray-800 cursor-pointer border-none bg-transparent active:scale-95 transition-all">Discard</button>
                <button onClick={submitFeedback} className="flex-1 py-4 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all cursor-pointer active:scale-95">Save Feedback</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* --- SHARED COMPONENTS --- */

const DetailItem = ({ label, value }) => (
  <div className="space-y-0.5">
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-bold text-gray-700 break-words">{value || "Unspecified"}</p>
  </div>
);

export default ManageApplications;
