import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAuth from "../../Hooks/useAuth";
// import Swal from "sweetalert2";
// import Loading from "../../Components/Loading/Loading";

const PropertyDetails = () => {
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
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(true);
    Promise.all([
      fetch(`http://localhost:3000/scholarships/${id}`).then((res) =>
        res.json()
      ),
      fetch(`http://localhost:3000/reviews/${id}`).then((res) => res.json()),
    ]).then(([scholarshipData, reviewData]) => {
      setScholarship(scholarshipData);
      setReview(reviewData);
    });
    //   .finally(() => setLoading(false));
  }, [id]);

  const handleAddRating = (e) => {
    e.preventDefault();
    const reviewInfo = {
      scholarshipId: id,
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
        // Swal.fire("Review Added ✅", "Thanks for your feedback!", "success");
        e.target.reset();
      });
  };

  //   if (loading) {
  //     return <Loading />;
  //   }
  return (
    <div className="w-9/12 mx-auto py-10">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-center py-10">
        Scholarship Details
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-10 justify-center">
        <div>
          <img
            src={scholarship.universityImage}
            alt={scholarship.universityName}
            className="w-full h-[370px] rounded-xl object-cover"
          />
        </div>
        <div>
          <div>
            {/* Scholarship Header */}
            <h1 className="text-3xl font-bold mb-2 ">
              {scholarship.scholarshipName}
            </h1>
            <p className="text-gray-600 mt- mb-3 text-lg font-medium">
              🎓 {scholarship.universityName} (World Rank #
              {scholarship.universityWorldRank})
            </p>
          </div>
          {/* Key Info Grid */}
          <div className="grid md:grid-cols-2 gap-5 md:gap-6  font-medium text-sm">
            <p className="text-xs sm:text-text-sm md:text-[17px] font-medium">
              📍 Location: {scholarship.universityCity},{" "}
              {scholarship.universityCountry}
            </p>
            <p className="text-xs sm:text-text-sm md:text-[17px] font-medium">
              🎓 Degree: {scholarship.degree}
            </p>
            <p className="text-xs sm:text-text-sm md:text-[17px] font-medium">
              📚 Subject: {scholarship.subjectCategory}
            </p>
            <p className="text-xs sm:text-text-sm md:text-[17px] font-medium">
              🏷 Scholarship Type: {scholarship.scholarshipCategory}
            </p>
            <p className="text-xs sm:text-text-sm md:text-[17px] font-medium">
              💵 Tuition Fees: ${scholarship.tuitionFees}
            </p>
            <p className="text-xs sm:text-text-sm md:text-[17px] font-medium">
              🧾 Application Fees: ${scholarship.applicationFees}
            </p>
            <p className="text-xs sm:text-text-sm md:text-[17px] font-medium">
              ⚙ Service Charge: ${scholarship.serviceCharge}
            </p>
            <p className="text-xs sm:text-text-sm md:text-[17px] font-medium">
              🗓 Deadline: {scholarship.applicationDeadline}
            </p>
            <div className="mt-10"></div>
          </div>
          <div>
            <Link
              to={`/checkout/${id}`}
              className="bg-primary px-1 py-0.5 md:px-2 md:py-1 rounded-sm hover:bg-green-700 hover:text-white text-lg font-medium "
            >
              Apply for Scholarship
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mt-10">
          <div className="flex border-b-2 border-gray-300">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-5 py-2 text-sm md:text-lg font-semibold transition-all
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
              className={`px-5 py-2 text-sm md:text-lg font-semibold transition-all
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
          <div className="mt-6 p-2">
            {activeTab === "description" && (
              <p className="text-gray-700 font-medium loading-relaxed">
                {scholarship.scholarshipDescription}
              </p>
            )}
            {activeTab === "coverage" && (
              <p className="text-gray-700 font-medium loading-relaxed">
                {scholarship.stipendCoverage}
              </p>
            )}
          </div>
        </div>
      </div>

      <h3 className="text-xl sm:text-3xl font-bold mb-4 mt-10 text-center">
        Ratings & Reviews
      </h3>

      <div className="max-w-6xl mx-auto">
        {review.length === 0 ? (
          <p className="text-sm sm:text-xl text-gray-600 text-center xl:text-left">
            No reviews yet.
          </p>
        ) : (
          <div className="space-y-4">
            {displayedReviews.map((r, index) => (
              <div
                key={index}
                className=" 
                 w-[98%] mx-auto lg:mx-0 lg:w-full 
                 p-4 rounded-lg
                 flex gap-4 items-start"
              >
                <div>
                  <img
                    src={r.userPhoto}
                    alt={r.userName}
                    className="w-10 h-10 rounded-full border border-gray-300 "
                  />
                </div>

                <div>
                  <p className="font-semibold text-sm sm:text-lg text-gray-800 mb-2 ">
                    {r.userName}
                  </p>

                  <div className="flex items-center gap-2">
                    <p className=" text-xs  font-bold">
                      {[...Array(Number(r.rating))].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </p>
                    <p className="text-xs  text-gray-800 ">
                      {new Date(r.date).toLocaleDateString()}
                    </p>
                  </div>

                  <p className="text-gray-600  text-xs sm:text-sm">
                    {formatComment(r.comment)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {review.length > 3 && !showAllReviews && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAllReviews(true)}
            className="text-primary text-sm font-semibold hover:underline"
          >
            Show All Reviews
          </button>
        </div>
      )}
      <div className="mt-12 max-w-3xl xl:w-full mx-auto sm:mx-auto bg-white rounded-lg shadow-xl border-2 border-gray-300 p-10">
        <form onSubmit={handleAddRating} className="space-y-5">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">
            Rate This Scholarship
          </h3>
          <label className="text-sm sm:text-xl font-semibold">
            Choose Rating
          </label>
          <select
            name="rating"
            className="select select-bordered w-full my-3 text-xs sm:text-sm"
            required
          >
            <option value="">Choose Rating</option>
            <option value="5">⭐ 5 (Excellent)</option>
            <option value="4">⭐ 4 (Good)</option>
            <option value="3">⭐ 3 (Avarage)</option>
            <option value="2">⭐ 2 (Poor)</option>
            <option value="1">⭐ 1 (Vary Bad)</option>
          </select>
          <label className="text-sm sm:text-xl font-semibold">Comment</label>
          <textarea
            name="comment"
            className="textarea textarea-bordered w-full mt-4 text-xs sm:text-sm"
            placeholder="write a short review ..."
            required
          ></textarea>

          <button className="btn bg-primary w-full text-xs sm:text-sm ">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyDetails;
