import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin, FiCalendar, FiDollarSign, FiAward, FiBook,
  FiGlobe, FiStar, FiUser, FiClock,
  FiChevronLeft, FiChevronRight, FiExternalLink, FiDownload,
  FiEye, FiShield, FiUsers, FiTrendingUp, FiCheckCircle,
  FiPhone, FiMail, FiMessageCircle, FiZap, FiTarget
} from "react-icons/fi";
import {
  BsStarFill, BsStar, BsStarHalf, BsShieldCheck,
  BsCalendar3, BsCurrencyDollar, BsGeoAlt, BsAward,
  BsLightning, BsTrophy, BsGem, BsFire
} from "react-icons/bs";
import TopScholarshipCard from "../Home/TopScholarships/TopScholarshipCard/TopScholarshipCard";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { role, roleLoading } = useRole();
  const [scholarship, setScholarship] = useState({});
  const [review, setReview] = useState([]);
  const [relatedScholarships, setRelatedScholarships] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const isViewOnlyMode = role === 'Admin' || role === 'Moderator';
  const canApplyAndReview = user && !isViewOnlyMode;

  const displayedReviews = showAllReviews ? review : review.slice(0, 4);

  const averageRating = review.length > 0
    ? (review.reduce((sum, r) => sum + Number(r.rating), 0) / review.length).toFixed(1)
    : 0;
  const mockStats = {
    totalApplicants: Math.floor(Math.random() * 2000) + 500,
    acceptanceRate: Math.floor(Math.random() * 30) + 15,
    averageGPA: (3.5 + Math.random() * 0.5).toFixed(1),
    completionRate: Math.floor(Math.random() * 20) + 80
  };

  const renderStars = (rating, size = "text-sm") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<BsStarFill key={i} className={`text-yellow-400 ${size}`} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<BsStarHalf key={i} className={`text-yellow-400 ${size}`} />);
      } else {
        stars.push(<BsStar key={i} className={`text-gray-300 ${size}`} />);
      }
    }
    return stars;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scholarshipRes = await axiosSecure.get(`/scholarships/${id}`);
        const scholarshipData = scholarshipRes.data;
        setScholarship(scholarshipData);

        const reviewRes = await axiosSecure.get(
          `/reviewsByName/${encodeURIComponent(scholarshipData.scholarshipName)}`
        );
        setReview(reviewRes.data);

        const relatedRes = await axiosSecure.get(
          `/scholarships?scholarshipCategory=${scholarshipData.scholarshipCategory}&limit=4`
        );
        setRelatedScholarships(relatedRes.data.result.filter(s => s._id !== id));
      } catch (err) {
        Swal.fire("Failed to load scholarship details", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, axiosSecure]);

  const handleAddRating = async (e) => {
    e.preventDefault();
    const reviewInfo = {
      scholarshipId: scholarship._id,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
      rating: e.target.rating.value,
      comment: e.target.comment.value,
      date: new Date().toISOString(),
    };
    try {
      await axiosSecure.post("/reviews", reviewInfo);
      setReview([...review, reviewInfo]);
      Swal.fire("Review Added ✅", "Thanks for your feedback!", "success");
      e.target.reset();
    } catch (err) {
      console.error(err);
      Swal.fire("Error ❌", "Failed to add review", "error");
    }
  };

  if (loading || roleLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
      <title>{scholarship.scholarshipName} - Scholarship Details</title>

      {isViewOnlyMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-indigo-600 via-purple-600 to-blue-600 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-linear-to-r from-white/5 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-full">
                  <FiShield className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="font-semibold text-sm sm:text-base">
                  {role} Dashboard
                </span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/30"></div>
              <span className="font-medium text-sm sm:text-base opacity-90">
                Read-only access • Full scholarship details available
              </span>
              <FiEye className="w-4 h-4 sm:w-5 sm:h-5 opacity-75" />
            </div>
          </div>
        </motion.div>
      )}
      <div className="bg-white shadow-xl border-b border-gray-100">
        <div className="w-[98%] md:w-9/12 mx-auto px-3 sm:px-4 md:px-6 lg:px-0 py-6 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="relative group">
                <div className="aspect-w-16 aspect-h-10 rounded-2xl sm:rounded-3xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 shadow-2xl">
                  <img
                    src={scholarship.universityImage}
                    alt={scholarship.scholarshipName}
                    className="w-full h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-2 bg-linear-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                      <BsTrophy className="w-3 h-3" />
                      <span className="text-xs font-bold">FEATURED</span>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full shadow-lg">
                      <FiCheckCircle className="w-3 h-3" />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-linear-to-r from-primary/10 to-blue-50 text-primary text-sm font-semibold rounded-full border border-primary/20">
                        {scholarship.scholarshipCategory}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <BsLightning className="w-3 h-3" />
                        <span className="font-medium">Fast Track</span>
                      </div>
                    </div>

                    <h1 className="text-2xl xs:text-3xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text">
                      {scholarship.scholarshipName}
                    </h1>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-primary/10 rounded-full">
                          <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        </div>
                        <span className="font-semibold text-sm sm:text-base">
                          {scholarship.universityName}
                        </span>
                      </div>
                      <span className="hidden sm:inline text-gray-400">•</span>
                      <span className="text-sm sm:text-base font-medium ml-6 sm:ml-0">
                        {scholarship.universityCity}, {scholarship.universityCountry}
                      </span>
                    </div>

                    <div className="flex flex-col xs:flex-row xs:items-center gap-3 xs:gap-6">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {renderStars(averageRating, "text-base")}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {averageRating} ({review.length} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <BsShieldCheck className="w-4 h-4" />
                          <span className="font-medium">Verified</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-blue-600">
                          <FiTrendingUp className="w-4 h-4" />
                          <span className="font-medium">Trending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-linear-to-br from-primary/10 via-primary/5 to-green-50 rounded-2xl p-4 border border-primary/20 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/20 rounded-xl">
                        <FiDollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-medium">Application Fee</p>
                        <p className="text-lg sm:text-xl font-bold text-primary">
                          {scholarship.applicationFees > 0 ? `$${scholarship.applicationFees}` : 'FREE'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-linear-to-br from-blue-50 via-blue-25 to-indigo-50 rounded-2xl p-4 border border-blue-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-xl">
                        <FiCalendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-medium">Deadline</p>
                        <p className="text-sm sm:text-base font-bold text-blue-600">
                          {new Date(scholarship.applicationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-linear-to-br from-purple-50 via-purple-25 to-pink-50 rounded-2xl p-4 border border-purple-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-xl">
                        <FiUsers className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-medium">Applicants</p>
                        <p className="text-sm sm:text-base font-bold text-purple-600">
                          {mockStats.totalApplicants}+
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-linear-to-br from-orange-50 via-orange-25 to-yellow-50 rounded-2xl p-4 border border-orange-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-xl">
                        <FiTarget className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-medium">Success Rate</p>
                        <p className="text-sm sm:text-base font-bold text-orange-600">
                          {mockStats.acceptanceRate}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {canApplyAndReview ? (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={`/checkout/${id}`}
                      className="group bg-linear-to-r from-primary via-green-600 to-emerald-600 hover:from-primary/90 hover:via-green-700 hover:to-emerald-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-5 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl text-base sm:text-lg relative overflow-hidden"
                    >
                      <FiZap className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span>Apply Now - Fast Track</span>
                      <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                ) : isViewOnlyMode ? (
                  <div className="w-full bg-linear-to-r from-gray-100 to-gray-200 text-gray-600 font-semibold py-4 sm:py-5 px-6 sm:px-8 rounded-2xl flex items-center justify-center gap-3 border-2 border-dashed border-gray-300 text-base sm:text-lg">
                    <FiEye className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Administrative View Mode</span>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="w-full bg-linear-to-r from-gray-100 to-gray-200 text-gray-700 font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-2xl flex items-center justify-center gap-3 text-base sm:text-lg hover:bg-gray-200 transition-colors shadow-sm hover:shadow-md border border-gray-300"
                  >
                    <FiUser className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Login to Apply</span>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div >
      < div className="w-[98%] md:w-9/12 mx-auto px-1 sm:px-4 md:px-6 lg:px-0 py-6 sm:py-8 lg:py-12" >
        <div className="w-full space-y-6 sm:space-y-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm"
          >
            <div className="flex border-b border-gray-100 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-300 whitespace-nowrap ${activeTab === 'overview'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <FiBook className="w-4 h-4" />
                overview
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-300 whitespace-nowrap ${activeTab === 'reviews'
                  ? 'text-primary border-b-2 border-primary bg-primary/5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <FiStar className="w-4 h-4" />
                Reviews ({review.length})
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <BsGem className="w-5 h-5 text-primary" />
                      Scholarship Description
                    </h3>
                    <p className="text-gray-700 font-medium leading-relaxed text-base sm:text-lg">
                      {scholarship.scholarshipDescription}
                    </p>
                  </div>

                  <div className="bg-linear-to-br from-indigo-50 to-blue-50/50 rounded-2xl p-6 border border-indigo-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <BsAward className="w-5 h-5 text-indigo-600" />
                      Stipend & Coverage
                    </h3>
                    <p className="text-gray-700 font-medium leading-relaxed">
                      {scholarship.stipendCoverage}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <BsLightning className="w-5 h-5 text-amber-500" />
                      Key Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: 'Degree', value: scholarship.degree, icon: BsTrophy, color: 'text-purple-600', bg: 'bg-purple-50' },
                        { label: 'Subject', value: scholarship.subjectCategory, icon: FiBook, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Tuition Fees', value: `$${scholarship.tuitionFees}`, icon: FiDollarSign, color: 'text-green-600', bg: 'bg-green-50' },
                        { label: 'Service Charge', value: `$${scholarship.serviceCharge}`, icon: FiZap, color: 'text-amber-600', bg: 'bg-amber-50' },
                      ].map((item, index) => (
                        <div key={index} className={`flex items-center gap-4 p-4 rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md ${item.bg}`}>
                          <div className={`p-3 rounded-xl bg-white shadow-sm ${item.color}`}>
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{item.label}</p>
                            <p className="font-bold text-gray-900">{item.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col  sm:flex-row items-center gap-8 bg-gray-50 p-6 rounded-2xl">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-2">{averageRating}</div>
                      <div className="flex justify-center mb-2">
                        {renderStars(Number(averageRating), "text-xl")}
                      </div>
                      <p className="text-sm text-gray-500">Based on {review.length} reviews</p>
                    </div>

                    <div className="flex-1 w-full space-y-2">
                      {[5, 4, 3, 2, 1].map(num => {
                        const count = review.filter(r => Math.floor(Number(r.rating)) === num).length;
                        const percent = review.length > 0 ? (count / review.length) * 100 : 0;
                        return (
                          <div key={num} className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-gray-600 w-3">{num}</span>
                            <FiStar className="text-yellow-400 w-3 h-3" />
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 w-8">{Math.round(percent)}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {displayedReviews.map((r, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6  rounded-2xl border border-gray-100 shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={r.userPhoto}
                            alt={r.userName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-bold text-gray-900">{r.userName}</h4>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <span className="font-medium">{new Date(r.date).toLocaleDateString()}</span>
                                  {r.rating >= 4 && (
                                    <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                      <BsShieldCheck className="w-3 h-3" /> Verified
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg">
                                {renderStars(Number(r.rating))}
                                <span className="ml-1 text-sm font-bold text-gray-900">{r.rating}</span>
                              </div>
                            </div>
                            <p className="text-gray-600 font-medium leading-relaxed text-sm">
                              {r.comment.slice(0, 70)} ....
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {review.length === 0 && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FiMessageCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No Reviews Yet</h3>
                        <p className="text-gray-500 font-medium">Be the first to share your experience!</p>
                      </div>
                    )}

                    {review.length > 4 && !showAllReviews && (
                      <button
                        onClick={() => setShowAllReviews(true)}
                        className="w-full py-3 text-primary font-semibold border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors"
                      >
                        Show All Reviews
                      </button>
                    )}
                  </div>

                  {canApplyAndReview && (
                    <div className="bg-gray-50 w-full md:w-6/12 mx-auto p-6 sm:p-8 rounded-3xl border border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="p-2 bg-primary text-white rounded-lg shadow-lg">
                          <FiStar className="w-5 h-5" />
                        </div>
                        Write a Review
                      </h3>
                      <form onSubmit={handleAddRating} className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
                          <div className="relative">
                            <select
                              name="rating"
                              className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none font-medium"
                              required
                            >
                              <option value="5">⭐⭐⭐⭐⭐ Excellent (5)</option>
                              <option value="4">⭐⭐⭐⭐ Good (4)</option>
                              <option value="3">⭐⭐⭐ Average (3)</option>
                              <option value="2">⭐⭐ Poor (2)</option>
                              <option value="1">⭐ Terrible (1)</option>
                            </select>
                            <FiChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Your Experience</label>
                          <textarea
                            name="comment"
                            className="w-full p-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-h-[120px]"
                            placeholder="Tell us about the scholarship application process..."
                            required
                          ></textarea>
                        </div>
                        <button className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-green-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                          Submit Review
                        </button>
                      </form>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        < div className="w-full mx-auto px-1 sm:px-6 lg:px-0 py-16 border-t border-gray-200 mt-12" >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <BsFire className="w-8 h-8 text-orange-500" />
            Related Scholarships
          </h2>
          {
            relatedScholarships.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedScholarships.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TopScholarshipCard scholarship={item} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No related scholarships found at this time.</p>
            )
          }
        </div >

      </div >
    </div>
  );
};

export default ScholarshipDetails;