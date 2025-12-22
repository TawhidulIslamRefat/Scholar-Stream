import React, { useEffect, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import LoadingDashboard from "../../../Components/LoadingDashboard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/reviews")
      .then(({ data }) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error("Failed to fetch reviews:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch reviews. Please try again.",
        });
      })
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const handleDelete = (id, userName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete review by ${userName}? This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/reviews/${id}`)
          .then(() => {
            setReviews((prevReviews) =>
              prevReviews.filter((review) => review._id !== id)
            );
            Swal.fire("Deleted!", "The review has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Failed to delete review:", error);
            Swal.fire(
              "Error!",
              "Failed to delete review. Please try again.",
              "error"
            );
          });
      }
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
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
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <title>All Reviews</title>
      <div className="max-w-8xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                All Reviews
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Manage and moderate user reviews
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-blue-50 px-3 sm:px-4 py-2 rounded-lg">
                <span className="text-blue-800 font-semibold text-sm sm:text-base">
                  Total Reviews: {reviews.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="block lg:hidden">
            {reviews.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-4xl sm:text-6xl mb-4">📝</div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                  No reviews yet
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  Reviews will appear here once users start submitting them.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="p-4 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
                          <img
                            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-gray-200"
                            src={
                              review.userPhoto ||
                              "https://i.ibb.co/2y9YpJH/user-placeholder.png"
                            }
                            alt={review.userName}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm sm:text-base font-medium text-gray-900 truncate">
                            {review.userName}
                          </div>
                          <div className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                            {review.userEmail}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">University:</span>
                          <div className="font-medium text-gray-900 truncate">
                            {review.universityName}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Rating:</span>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700">
                              ({review.rating}/5)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-gray-500 text-sm">Comment:</span>
                        <div className="text-sm text-gray-900 font-medium mt-1 line-clamp-3">
                          {review.comment}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div>
                          <div className="text-xs sm:text-sm text-gray-900 font-medium">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(review.date).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>

                        <button
                          onClick={() => handleDelete(review._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 text-lg">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Comment
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews.map((review) => (
                  <tr
                    key={review._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                            src={
                              review.userPhoto ||
                              "https://i.ibb.co/2y9YpJH/user-placeholder.png"
                            }
                            alt={review.userName}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-[16px] font-medium text-gray-900">
                            {review.userName}
                          </div>
                          <div className="text-sm font-medium text-gray-500">
                            {review.userEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-[15px] font-medium text-gray-900">
                        {review.universityName}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="ml-2 text-[15px] font-medium text-gray-700">
                          ({review.rating}/5)
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs font-medium">
                        <div className="truncate">{review.comment}</div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {new Date(review.date).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-[15px] font-medium transition-colors duration-200 flex items-center space-x-1"
                        >
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {reviews.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No reviews yet
                </h3>
                <p className="text-gray-500">
                  Reviews will appear here once users start submitting them.
                </p>
              </div>
            )}
          </div>
        </div>

        {reviews.length > 0 && (
          <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-gray-100 rounded-lg shadow-sm border p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                {reviews.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Total Reviews
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-sm border p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-yellow-600">
                {(
                  reviews.reduce((sum, review) => sum + review.rating, 0) /
                  reviews.length
                ).toFixed(1)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Average Rating
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-sm border p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {reviews.filter((review) => review.rating >= 4).length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Positive Reviews
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg shadow-sm border p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-red-600">
                {reviews.filter((review) => review.rating <= 2).length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Negative Reviews
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
