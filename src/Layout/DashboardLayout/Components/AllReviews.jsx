import React, { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import LoadingDashboard from "../../../Components/LoadingDashboard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiSearch,
    FiFilter,
    FiStar,
    FiTrash2,
    FiCalendar,
    FiBookOpen,
    FiMessageSquare,
    FiMail,
    FiTrendingUp,
    FiCheckCircle,
    FiAlertTriangle,
    FiClock,
    FiChevronDown,
    FiRefreshCw,
    FiUser
} from "react-icons/fi";

const AllReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [ratingFilter, setRatingFilter] = useState("all");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchReviews();
    }, [axiosSecure]);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const { data } = await axiosSecure.get("/reviews");
            setReviews(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
            Swal.fire({
                icon: "error",
                title: "Connection Error",
                text: "Could not load reviews. Please check your network.",
                confirmButtonColor: "#3B82F6",
            });
        } finally {
            setLoading(false);
        }
    };

    const filteredReviews = useMemo(() => {
        return reviews.filter((review) => {
            const searchStr = searchTerm.toLowerCase();
            const matchesSearch =
                (review.userName || "").toLowerCase().includes(searchStr) ||
                (review.userEmail || "").toLowerCase().includes(searchStr) ||
                (review.universityName || "").toLowerCase().includes(searchStr);

            const matchesRating = ratingFilter === "all" || review.rating === parseInt(ratingFilter);

            return matchesSearch && matchesRating;
        });
    }, [reviews, searchTerm, ratingFilter]);

    const averageRating = useMemo(() => {
        if (reviews.length === 0) return 0;
        return (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1);
    }, [reviews]);

    const handleDelete = (id, userName) => {
        Swal.fire({
            title: "Delete Review?",
            text: `Are you sure you want to remove the review by ${userName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/reviews/${id}`);
                    setReviews((prev) => prev.filter((r) => r._id !== id));
                    Swal.fire({
                        icon: "success",
                        title: "Review Removed",
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                    });
                } catch (error) {
                    Swal.fire("Error!", "Failed to delete review.", error);
                }
            }
        });
    };

    const renderStars = (rating) => (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <FiStar key={star} className={`w-3.5 h-3.5 ${star <= rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}`} />
            ))}
        </div>
    );

    if (loading) return <LoadingDashboard />;

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen space-y-8">
            <title>All Reviews | ScholarPoint</title>

            <div className="bg-linear-to-r from-gray-900 via-blue-950 to-gray-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3 flex items-center gap-3">
                        <FiMessageSquare className="text-blue-400" /> Community Reviews
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-lg max-w-2xl leading-relaxed">
                        Monitor student feedback and maintain the transparency of our scholarship ecosystem.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                    { label: "Total Reviews", value: reviews.length, icon: FiMessageSquare, color: "from-blue-500 to-indigo-600" },
                    { label: "Average Rating", value: `${averageRating}/5.0`, icon: FiTrendingUp, color: "from-amber-400 to-orange-500" },
                    { label: "Positive Feedback", value: reviews.filter(r => r.rating >= 4).length, icon: FiCheckCircle, color: "from-emerald-400 to-teal-500" },
                    { label: "Critical Reviews", value: reviews.filter(r => r.rating <= 2).length, icon: FiAlertTriangle, color: "from-rose-400 to-pink-500" }
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
                    <div className="relative flex-1 md:min-w-[180px]">
                        <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                            className="w-full pl-11 pr-10 py-3 bg-gray-50 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-blue-500 text-sm font-bold text-gray-700 cursor-pointer"
                            value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}
                        >
                            <option value="all">Any Rating</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <button onClick={fetchReviews} className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl transition-colors border-none cursor-pointer active:scale-95" title="Refresh">
                        <FiRefreshCw className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

    
            <div className="space-y-4">
                {filteredReviews.length === 0 ? (
                    <div className="bg-white py-20 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center px-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <FiMessageSquare className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">No Reviews Found</h3>
                        <p className="text-gray-500 max-w-xs">Try adjusting your search or filter settings to find what you're looking for.</p>
                    </div>
                ) : (
                    <>
                        <div className="hidden xl:block bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50/50 text-gray-400 uppercase text-[10px] font-black tracking-widest border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-5">Reviewer</th>
                                            <th className="px-6 py-5">Scholarship Entity</th>
                                            <th className="px-6 py-5">Rating</th>
                                            <th className="px-6 py-5">Comment</th>
                                            <th className="px-6 py-5 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        <AnimatePresence mode='popLayout'>
                                            {filteredReviews.map((review) => (
                                                <motion.tr
                                                    layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                    key={review._id} className="hover:bg-blue-50/30 transition-colors group"
                                                >
                                                    <td className="px-6 py-6 border-none">
                                                        <div className="flex items-center gap-3">
                                                            <img
                                                                src={review.userPhoto || "https://i.ibb.co/2y9YpJH/user-placeholder.png"}
                                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-50"
                                                                alt={review.userName}
                                                            />
                                                            <div>
                                                                <p className="font-bold text-gray-800 text-sm leading-tight">{review.userName}</p>
                                                                <p className="text-xs text-gray-400 flex font-medium items-center gap-1"><FiMail className="w-3" /> {review.userEmail}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-6 border-none font-medium text-gray-700 text-sm">
                                                        <p className="line-clamp-1">{review.universityName}</p>
                                                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">
                                                            <FiCalendar /> {new Date(review.date).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-6 border-none">
                                                        {renderStars(review.rating)}
                                                        <span className="text-[10px] font-bold text-blue-500 mt-1 block uppercase tracking-tighter">Score: {review.rating}/5</span>
                                                    </td>
                                                    <td className="px-6 py-6 border-none max-w-md">
                                                        <p className="text-sm text-gray-600 line-clamp-2 italic ">"{review.comment}"</p>
                                                    </td>
                                                    <td className="px-6 py-6 border-none text-center">
                                                        <button
                                                            onClick={() => handleDelete(review._id, review.userName)}
                                                            className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer border-none bg-transparent active:scale-95" title="Delete Review"
                                                        >
                                                            <FiTrash2 className="w-5 h-5" />
                                                        </button>
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
                                {filteredReviews.map((review) => (
                                    <motion.div
                                        layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                        key={review._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4 relative group"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={review.userPhoto || "https://i.ibb.co/2y9YpJH/user-placeholder.png"}
                                                    className="w-12 h-12 rounded-xl object-cover ring-4 ring-gray-50 shadow-xs"
                                                    alt={review.userName}
                                                />
                                                <div>
                                                    <h4 className="font-black text-gray-800 text-sm leading-tight">{review.userName}</h4>
                                                    <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1 mt-0.5"><FiMail className="w-2.5" /> {review.userEmail}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(review._id, review.userName)}
                                                className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors border-none bg-transparent cursor-pointer active:scale-95"
                                            >
                                                <FiTrash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100/50 space-y-3">
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1.5"><FiBookOpen className="w-3" /> Institution</p>
                                                <p className="text-xs font-bold text-gray-700 line-clamp-1">{review.universityName}</p>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Rating</p>
                                                    {renderStars(review.rating)}
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center justify-end gap-1"><FiCalendar className="w-2.5" /> Date</p>
                                                    <p className="text-[10px] font-bold text-gray-700">{new Date(review.date).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-1">
                                            <p className="text-sm  text-gray-600 font-medium italic leading-relaxed line-clamp-3">
                                                "{review.comment}"
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AllReviews;
