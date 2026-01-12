import React, { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import UpdateScholarshipModal from "./UpdateScholarshipModal";
import {
    FiEdit,
    FiSearch,
    FiFilter,
    FiSearch as FiSearchIcon,
    FiBook,
    FiGlobe,
    FiAward,
    FiDollarSign,
    FiCalendar,
    FiRefreshCw,
    FiMoreVertical,
    FiMapPin,
    FiGrid,
    FiList,
    FiActivity
} from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import LoadingDashboard from "../../../Components/LoadingDashboard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";

const ManageScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchScholarships();
    }, [axiosSecure]);

    const fetchScholarships = () => {
        setLoading(true);
        axiosSecure
            .get("/top-scholarships")
            .then(({ data }) => setScholarships(data))
            .catch((err) => {
                console.error("Failed to load scholarships:", err);
                Swal.fire("Error", "Unable to fetch scholarships", "error");
            })
            .finally(() => setLoading(false));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This scholarship will be permanently deleted from the registry!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Yes, delete it!",
            background: "#ffffff",
            customClass: {
                title: "text-xl font-bold text-gray-800",
                htmlContainer: "text-gray-600",
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/scholarships/${id}`)
                    .then(() => {
                        setScholarships(scholarships.filter((item) => item._id !== id));
                        Swal.fire({
                            title: "Deleted!",
                            text: "The record has been purged from the system.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    })
                    .catch((err) => {
                        console.error("Failed to delete scholarship:", err);
                        Swal.fire("Error", "Internal system failure during deletion.", "error");
                    });
            }
        });
    };

    // Filter Logic
    const filteredScholarships = useMemo(() => {
        return scholarships.filter(item => {
            const matchesSearch = item.scholarshipName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.universityName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filterCategory === "all" || item.scholarshipCategory === filterCategory;
            return matchesSearch && matchesFilter;
        });
    }, [scholarships, searchQuery, filterCategory]);

    const stats = useMemo(() => [
        { label: "Total Asset Pool", value: scholarships.length, icon: FiInventory, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Partner Universities", value: [...new Set(scholarships.map(s => s.universityName))].length, icon: FiMapPin, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Global Presence", value: [...new Set(scholarships.map(s => s.universityCountry))].length, icon: FiGlobe, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "High Impact (Rank <50)", value: scholarships.filter(s => parseInt(s.universityWorldRank) <= 50).length, icon: FiAward, color: "text-amber-600", bg: "bg-amber-50" },
    ], [scholarships]);

    if (loading) return <LoadingDashboard />;

    return (
        <div className="p-0 sm:p-6 lg:p-10 xl:p-12 bg-[#F8FAFC] min-h-screen space-y-6 sm:space-y-8 lg:space-y-10">
            <title>Inventory | ScholarPoint Admin</title>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-linear-to-r from-gray-900 via-blue-950 to-gray-900 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                        <FiActivity className="animate-pulse" /> Scholarship Hub
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div className="space-y-3 sm:space-y-4">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight sm:leading-none">Scholarship <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-300">Inventory</span></h1>
                            <p className="text-blue-100/70 text-xs sm:text-base lg:text-lg max-w-xl font-medium leading-relaxed italic">
                                Manage, audit, and optimize the global repository of scholarship opportunities for high-potential students worldwide.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={fetchScholarships}
                                className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10 text-white cursor-pointer active:scale-95 group"
                            >
                                <FiRefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-100 flex items-center gap-4 sm:gap-5 hover:border-blue-200 transition-colors group"
                    >
                        <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 duration-300`}>
                            <stat.icon className="w-5 h-5 sm:w-6" />
                        </div>
                        <div>
                            <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">{stat.label}</p>
                            <h4 className="text-xl sm:text-2xl font-bold text-gray-800">{stat.value}</h4>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between pb-2">
                <div className="relative flex-1 lg:max-w-md group">
                    <FiSearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search name or university..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-3.5 sm:py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-sm sm:text-base text-gray-700 shadow-sm"
                    />
                </div>
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar items-center">
                    {["all", "Full Fund", "Partial Fund", "Full Tuition"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-4 sm:px-6 py-3 sm:py-4 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all active:scale-95 ${filterCategory === cat
                                ? "bg-gray-900 text-white shadow-lg shadow-gray-200"
                                : "bg-white text-gray-500 border border-gray-100 hover:border-gray-200"
                                }`}
                        >
                            {cat === "all" ? "All Collections" : cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-2xl shadow-blue-900/5 border border-white/50 overflow-hidden">

                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Asset Index</th>
                                <th className="px-6 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Institutional Profile</th>
                                <th className="px-6 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Scholarship Identity</th>
                                <th className="px-6 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Global Rank</th>
                                <th className="px-6 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Degree Level</th>
                                <th className="px-6 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Administrative Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <AnimatePresence mode="popLayout">
                                {filteredScholarships.map((item, index) => (
                                    <motion.tr
                                        key={item._id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="group hover:bg-blue-50/30 transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                                #{index + 1}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md ring-2 ring-white ring-offset-2 ring-offset-transparent group-hover:ring-blue-100 transition-all shrink-0">
                                                    <img src={item.universityImage} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-gray-800 truncate text-[15px]">{item.universityName}</p>
                                                    <p className="text-xs font-bold text-gray-400 flex items-center gap-1">
                                                        <FiMapPin className="text-emerald-500" /> {item.universityCountry}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="max-w-[280px]">
                                                <p className="font-black text-gray-900 mb-1 leading-tight group-hover:text-blue-700 transition-colors">{item.scholarshipName}</p>
                                                <div className="flex gap-2">
                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100">{item.scholarshipCategory}</span>
                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 border border-purple-100">{item.degree}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-sm font-black px-3 py-1.5 rounded-xl ${parseInt(item.universityWorldRank) <= 50 ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                                                    <FiAward className="inline mr-1" /> {item.universityWorldRank}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-100 inline-block px-3 py-1.5 rounded-lg group-hover:bg-white transition-colors">{item.degree}</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => setSelectedScholarship(item)}
                                                    className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer border-none active:scale-95"
                                                    title="Edit Record"
                                                >
                                                    <FiEdit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all cursor-pointer border-none active:scale-95"
                                                    title="Purge Record"
                                                >
                                                    <MdOutlineDeleteOutline className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                <div className="lg:hidden p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <AnimatePresence mode="popLayout">
                        {filteredScholarships.map((item, index) => (
                            <motion.div
                                key={item._id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-gray-50/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-100 relative overflow-hidden group active:bg-blue-50/50 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex gap-3 sm:gap-4 items-center min-w-0">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg ring-2 ring-white shrink-0">
                                            <img src={item.universityImage} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="min-w-0">
                                            <span className="text-[9px] sm:text-[10px] font-black text-gray-400 bg-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border border-gray-100 mb-1 inline-block">#{index + 1}</span>
                                            <h3 className="text-xs sm:text-sm font-bold text-gray-800 truncate">{item.universityName}</h3>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            onClick={() => setSelectedScholarship(item)}
                                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white shadow-sm border border-gray-200 text-blue-600 flex items-center justify-center active:scale-90"
                                        >
                                            <FiEdit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white shadow-sm border border-gray-200 text-rose-500 flex items-center justify-center active:scale-90"
                                        >
                                            <MdOutlineDeleteOutline className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <h4 className="text-sm sm:text-base font-black text-gray-900 leading-tight group-hover:text-blue-700 transition-colors line-clamp-2">{item.scholarshipName}</h4>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        <span className="text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-1 rounded-lg bg-blue-100 text-blue-700">{item.scholarshipCategory}</span>
                                        <span className="text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-1 rounded-lg bg-purple-100 text-purple-700">{item.degree}</span>
                                        <span className="text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 flex items-center gap-1">
                                            <FiMapPin className="text-[9px] sm:text-[10px]" /> {item.universityCountry}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-gray-200/50">
                                    <div>
                                        <p className="text-[8px] sm:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Global Standing</p>
                                        <p className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1.5 sm:gap-2">
                                            <FiAward className="text-amber-500" /> Rank #{item.universityWorldRank}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] sm:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Due Date</p>
                                        <p className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-1.5 sm:gap-2">
                                            <FiCalendar className="text-blue-500" /> {item.applicationDeadline}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredScholarships.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-gray-50/30"
                    >
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-inner">
                            <FiSearch className="w-8 h-8 text-blue-200" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Inventory Null</h3>
                        <p className="text-gray-400 font-medium max-w-xs mx-auto">We couldn't find any scholarship matching your current filters or search query.</p>
                    </motion.div>
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

const FiInventory = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
);

export default ManageScholarships;
