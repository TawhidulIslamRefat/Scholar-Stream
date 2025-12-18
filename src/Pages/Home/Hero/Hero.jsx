import { Link } from "react-router";

const Hero = () => {
  return (
    <div>
      <div className="w-full bg-[#d7edf7] ">
        {/* Hero Section */}
        <section className="w-9/12 mx-auto px-6  py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#0A2540] leading-snug">
              Your Path to College & Trade School Scholarships Starts Here
            </h1>

            <p className="text-[#4A5568] text-lg leading-relaxed max-w-md font-medium">
              Discover scholarships for college and trade school in one simple place. Find opportunities that match your goals and apply with confidence.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-3">
              <Link className="bg-primary hover:bg-green-900 text-white font-medium px-6 py-3 rounded-full shadow hover:opacity-90">
                Search Scholarship
              </Link>
            </div>
          </div>

          {/* Right - Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://themephi.net/html/eduan/eduan/assets/img/banner/2/banner-bg.png"
              alt="Graduate Girl"
              className="w-[480px] lg:w-[550px] object-cover drop-shadow-xl"
            />
          </div>

          {/* Floating Icons (decorations) */}
          <img
            src="https://img.icons8.com/?size=100&id=qS5UPI1W6LYl&format=png&color=000000"
            className="absolute top-10 left-5 w-6 opacity-70"
          />
          <img
            src="https://img.icons8.com/?size=100&id=24511&format=png&color=000000"
            className="absolute top-20 right-10 w-6 opacity-70"
          />
          <img
            src="https://img.icons8.com/?size=100&id=32540&format=png&color=000000"
            className="absolute bottom-10 left-10 w-6 opacity-70"
          />
        </section>

        {/* Info Boxes */}
        <section className=" w-9/12 mx-auto px-6  grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
          {/* Box 1 */}
          <div className="p-6 bg-white rounded-3xl shadow-md  hover:shadow-2xl transition">
            <div className="text-[#10B981] text-4xl mb-4">💡</div>
            <h3 className="text-xl font-semibold text-[#0A2540] mb-2">
                Looking for Scholarships?
            </h3>
            <p className="text-[#4A5568] text-sm leading-relaxed font-medium">
               Our platform helps students find scholarships tailored to their needs. Get guidance, tips, and updates to make your application stand out.
            </p>
          </div>

          {/* Box 2 */}
          <div className="p-6 bg-white rounded-3xl shadow-md  hover:shadow-2xl transition">
            <div className="text-[#3B82F6] text-4xl mb-4">🧭</div>
            <h3 className="text-xl font-semibold text-[#0A2540] mb-2">
              Your Scholarship Journey Starts Here
            </h3>
            <p className="text-[#4A5568] text-sm leading-relaxed font-medium">
              Explore thousands of scholarships, get personalized advice, and apply with confidence. We make finding the right opportunity easy.
            </p>
          </div>

          {/* Box 3 */}
          <div className="p-6 bg-white rounded-3xl shadow-md  hover:shadow-2xl transition">
            <div className="text-[#F59E0B] text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-[#0A2540] mb-2">
                Struggling to Find the Right Scholarship?
            </h3>
            <p className="text-[#4A5568] text-sm leading-relaxed font-medium">
              Discover scholarships that match your profile. Get expert guidance, tips, and updates to boost your chances of success.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
