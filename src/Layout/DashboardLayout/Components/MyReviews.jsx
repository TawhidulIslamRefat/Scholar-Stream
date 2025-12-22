import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";
import LoadingDashboard from "../../../Components/LoadingDashboard";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [editReview, setEditReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetchReviews();
  }, [user]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/reviews/${user.email}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, scholarshipName) => {
    const result = await Swal.fire({
      title: "Delete Review?",
      text: `Are you sure you want to delete your review for "${scholarshipName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:3000/reviews/${id}`, {
          method: "DELETE",
        });
        setReviews(reviews.filter((r) => r._id !== id));
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete review.", error);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:3000/reviews/${editReview._id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          comment: editReview.comment,
          rating: parseInt(editReview.rating),
        }),
      });

      setReviews(
        reviews.map((r) =>
          r._id === editReview._id ? { ...r, ...editReview, rating: parseInt(editReview.rating) } : r
        )
      );
      setEditReview(null);
      Swal.fire("Updated!", "Your review has been updated.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to update review.", error);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-xl ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return <LoadingDashboard></LoadingDashboard>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-8xl mx-auto">
        
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">My Reviews</h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Track and manage your scholarship reviews
          </p>
          <div className="mt-3 sm:mt-4 inline-flex items-center bg-green-100 text-green-800 px-3 sm:px-4 py-2 rounded-full font-semibold text-sm sm:text-base">
            📝 {reviews.length} Review{reviews.length !== 1 ? 's' : ''} Written
          </div>
        </div>
        {reviews.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">📝</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
              No Reviews Yet
            </h3>
            <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 max-w-md mx-auto">
              You haven't written any reviews yet. Start by applying to scholarships and sharing your experience to help other students!
            </p>
            <Link to='/all-scholarship' className="bg-green-300 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-lg text-sm sm:text-base">
              Browse Scholarships
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                
                <div className="bg-linear-to-r from-green-500 to-[#009A64] p-4 sm:p-6 text-white">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">
                    {review.scholarshipName}
                  </h3>
                  <p className="text-blue-100 font-medium text-sm sm:text-base">
                    {review.universityName}
                  </p>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                    <div className="flex items-center">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="ml-2 text-gray-600 font-medium text-sm sm:text-base">
                        ({review.rating}/5)
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Your Review:</h4>
                    <p className="text-gray-600 leading-relaxed line-clamp-4 text-sm sm:text-base">
                      {review.comment}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={() => setEditReview(review)}
                      className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                    >
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(review._id,review.scholarshipName)}
                      className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                    >
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {reviews.length > 0 && (
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-gray-100 rounded-xl shadow-lg p-4 sm:p-6 text-center border border-gray-100">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                {reviews.length}
              </div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">Total Reviews</div>
            </div>
            <div className="bg-gray-100 rounded-xl shadow-lg p-4 sm:p-6 text-center border border-gray-100">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-2">
                {(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)}
              </div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">Average Rating</div>
            </div>
            <div className="bg-gray-100 rounded-xl shadow-lg p-4 sm:p-6 text-center border border-gray-100">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
                {reviews.filter(review => review.rating >= 4).length}
              </div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">Positive Reviews</div>
            </div>
          </div>
        )}
      </div>
      {editReview && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleUpdate}>
              <div className="bg-linear-to-r from-green-500 to-green-800 p-4 sm:p-6 text-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold">Edit Review</h2>
                  <button
                    type="button"
                    onClick={() => setEditReview(null)}
                    className="text-white hover:text-gray-200 transition-colors p-1"
                  >
                    <span className="text-2xl sm:text-3xl">×</span>
                  </button>
                </div>
                <p className="text-blue-100 mt-2 text-sm sm:text-base">
                  {editReview.scholarshipName}
                </p>
              </div>
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">  
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Rating
                  </label>
                  <div className="grid grid-cols-5 gap-1 sm:gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setEditReview({ ...editReview, rating: star })}
                        className={`p-2 sm:p-3 rounded-lg border-2 transition-all ${
                          editReview.rating >= star
                            ? 'border-yellow-400 bg-yellow-50 text-yellow-600'
                            : 'border-gray-200 bg-gray-50 text-gray-400'
                        }`}
                      >
                        <span className="text-lg sm:text-2xl">★</span>
                        <div className="text-xs font-medium mt-1">{star}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Your Review
                  </label>
                  <textarea
                    rows="4"
                    value={editReview.comment}
                    onChange={(e) =>
                      setEditReview({
                        ...editReview,
                        comment: e.target.value,
                      })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
                    placeholder="Share your experience with this scholarship..."
                    required
                  />
                </div>
              </div>
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  onClick={() => setEditReview(null)}
                  className="px-4 sm:px-6 py-2 sm:py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-black hover:bg-green-700 rounded-lg font-semibold transition-colors shadow-lg text-sm sm:text-base"
                >
                  Update Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
