import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [scholarship, setScholarship] = useState({});
  const [review, setReview] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const formatComment = (text, limit = 30) => {
    if (!text) return "";
    return text.match(new RegExp(`.{1,${limit}}`, "g")).join("\n");
  };

  const displayedReviews = showAllReviews ? review : review.slice(0, 3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:3000/scholarships/${id}`).then((res) =>
        res.json()
      ),
      fetch(
        `http://localhost:3000/reviews?name=${scholarship.scholarshipName}`
      ).then((res) => res.json()),
    ])
      .then(([scholarshipData, reviewData]) => {
        setScholarship(scholarshipData);
        setReview(reviewData);
      })
      .finally(() => setLoading(false));
  }, [id,scholarship.scholarshipName]);

  const handleAddRating = (e) => {
    e.preventDefault();
    const reviewInfo = {
      scholarshipId: id,
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
      rating: e.target.rating.value,
      comment: e.target.comment.value,
      date: new Date().toISOString(),
    };
    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reviewInfo),
    })
      .then((res) => res.json())
      .then(() => {
        setReview([...review, reviewInfo]);
        Swal.fire("Review Added ✅", "Thanks for your feedback!", "success");
        e.target.reset();
      });
  };

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:w-11/12 xl:w-9/12 mx-auto py-6 sm:py-8 md:py-10">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-center py-6 sm:py-8 md:py-10">
        Scholarship Details
      </h1>
      <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-10 justify-center">
        <div className="w-full lg:w-1/2">
          <img
            src={scholarship.universityImage}
            alt={scholarship.universityName}
            className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[370px] rounded-xl object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center lg:text-left">
              {scholarship.scholarshipName}
            </h1>
            <p className="text-gray-600 mb-3 text-base sm:text-lg font-medium text-center lg:text-left">
              🎓 {scholarship.universityName} (World Rank #
              {scholarship.universityWorldRank})
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 font-medium text-sm">
            <p className="text-sm sm:text-base md:text-[17px] font-medium">
              📍 Location: {scholarship.universityCity},{" "}
              {scholarship.universityCountry}
            </p>
            <p className="text-sm sm:text-base md:text-[17px] font-medium">
              🎓 Degree: {scholarship.degree}
            </p>
            <p className="text-sm sm:text-base md:text-[17px] font-medium">
              📚 Subject: {scholarship.subjectCategory}
            </p>
            <p className="text-sm sm:text-base md:text-[17px] font-medium">
              🏷 Scholarship Type: {scholarship.scholarshipCategory}
            </p>
            <p className="text-sm sm:text-base md:text-[17px] font-medium">
              💵 Tuition Fees: ${scholarship.tuitionFees}
            </p>
            <p className="text-sm sm:text-base md:text-[17px] font-medium">
              🧾 Application Fees: ${scholarship.applicationFees}
            </p>
            <p className="text-sm sm:text-base md:text-[17px] font-medium">
              ⚙ Service Charge: ${scholarship.serviceCharge}
            </p>
            <p className="text-sm sm:text-base md:text-[17px] font-medium">
              🗓 Deadline: {scholarship.applicationDeadline}
            </p>
            <div className="mt-6 sm:mt-8 md:mt-10"></div>
          </div>
          <div className="text-center lg:text-left">
            <Link
              to={`/checkout/${id}`}
              className="inline-block bg-primary px-3 py-2 sm:px-4 sm:py-2 md:px-2 md:py-1 rounded-sm hover:bg-green-700 hover:text-white text-base sm:text-lg font-medium transition-colors duration-200"
            >
              Apply for Scholarship
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full  mx-auto px-4 sm:px-6 md:px-0">
        <div className="mt-8 sm:mt-10">
          <div className="flex border-b-2 border-gray-300 overflow-x-auto">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-3 sm:px-4 md:px-5 py-2 text-sm sm:text-base md:text-lg font-semibold transition-all whitespace-nowrap
         ${
           activeTab === "description"
             ? "border-b-4 border-primary text-primary"
             : "text-gray-500 hover:text-primary"
         }
         `}
            >
              description
            </button>
            <button
              onClick={() => setActiveTab("coverage")}
              className={`px-3 sm:px-4 md:px-5 py-2 text-sm sm:text-base md:text-lg font-semibold transition-all whitespace-nowrap
         ${
           activeTab === "coverage"
             ? "border-b-4 border-primary text-primary"
             : "text-gray-500 hover:text-primary"
         }
         `}
            >
              coverage
            </button>
          </div>
          <div className="mt-4 sm:mt-6 p-2 sm:p-4 md:p-2">
            {activeTab === "description" && (
              <p className="text-gray-700 font-medium leading-relaxed text-sm sm:text-base">
                {scholarship.scholarshipDescription}
              </p>
            )}
            {activeTab === "coverage" && (
              <p className="text-gray-700 font-medium leading-relaxed text-sm sm:text-base">
                {scholarship.stipendCoverage}
              </p>
            )}
          </div>
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 mt-8 sm:mt-10 text-center">
        Ratings & Reviews
      </h3>

      <div className="w-full mx-auto px-4 sm:px-6 md:px-0">
        {review.length === 0 ? (
          <p className="text-sm sm:text-base md:text-xl text-gray-600 text-center">
            No reviews yet.
          </p>
        ) : (
          <div className="space-y-4">
            {displayedReviews.map((r, index) => (
              <div
                key={index}
                className="w-full p-3 sm:p-4 rounded-lg flex gap-3 sm:gap-4 items-start border-b border-gray-100 last:border-b-0"
              >
                <div className="shrink-0">
                  <img
                    src={r.userPhoto}
                    alt={r.userName}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 mb-1 sm:mb-2 truncate">
                    {r.userName}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <div className="flex items-center">
                      <p className="text-xs sm:text-sm font-bold">
                        {[...Array(Number(r.rating))].map((_, i) => (
                          <span key={i}>⭐</span>
                        ))}
                      </p>
                    </div>
                    <p className="text-xs text-gray-800">
                      {new Date(r.date).toLocaleDateString()}
                    </p>
                  </div>

                  <p className="text-gray-600 text-xs sm:text-sm break-word">
                    {formatComment(r.comment)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {review.length > 3 && !showAllReviews && (
        <div className="text-center mt-4 px-4 sm:px-6 md:px-0">
          <button
            onClick={() => setShowAllReviews(true)}
            className="text-primary text-sm font-semibold hover:underline"
          >
            Show All Reviews
          </button>
        </div>
      )}
      <div className="mt-8 sm:mt-10 md:mt-12 max-w-3xl mx-auto px-4 sm:px-6 md:px-0">
        <div className="bg-white rounded-lg shadow-xl border-2 border-gray-300 p-4 sm:p-6 md:p-8 lg:p-10">
          <form onSubmit={handleAddRating} className="space-y-4 sm:space-y-5">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">
              Rate This Scholarship
            </h3>
            <div>
              <label className="block text-sm sm:text-base md:text-xl font-semibold mb-2">
                Choose Rating
              </label>
              <select
                name="rating"
                className="select select-bordered w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Choose Rating</option>
                <option value="5">⭐ 5 (Excellent)</option>
                <option value="4">⭐ 4 (Good)</option>
                <option value="3">⭐ 3 (Average)</option>
                <option value="2">⭐ 2 (Poor)</option>
                <option value="1">⭐ 1 (Very Bad)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm sm:text-base md:text-xl font-semibold mb-2">
                Comment
              </label>
              <textarea
                name="comment"
                className="textarea textarea-bordered w-full text-sm sm:text-base h-24 sm:h-28 md:h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Write a short review..."
                required
              ></textarea>
            </div>

            <button className="btn bg-primary hover:bg-green-700 text-white w-full text-sm sm:text-base py-2 sm:py-3 transition-colors duration-200">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
