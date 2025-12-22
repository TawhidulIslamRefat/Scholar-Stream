import { Link } from "react-router";

const Hero = () => {
  return (
    <div>
      <div className="w-full bg-[#d7edf7]">
        <section className="w-full md:w-9/12  mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center relative">
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A2540] leading-snug px-2 sm:px-0">
              Your Path to College & Trade School Scholarships Starts Here
            </h1>

            <p className="text-[#4A5568] text-base sm:text-lg leading-relaxed max-w-full lg:max-w-md font-medium px-2 sm:px-0">
              Discover scholarships for college and trade school in one simple place. Find opportunities that match your goals and apply with confidence.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-3">
              <Link 
                to='/all-scholarship' 
                className="bg-primary hover:bg-green-900 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow hover:opacity-90 text-sm sm:text-base transition-all duration-200"
              >
                Search Scholarship
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end order-first lg:order-last">
            <img
              src="https://themephi.net/html/eduan/eduan/assets/img/banner/2/banner-bg.png"
              alt="Graduate Girl"
              className="w-[280px] sm:w-[350px] md:w-[420px] lg:w-[480px] xl:w-[550px] object-cover drop-shadow-xl"
            />
          </div>

          <img
            src="https://img.icons8.com/?size=100&id=qS5UPI1W6LYl&format=png&color=000000"
            className="absolute top-6 sm:top-10 left-3 sm:left-5 w-4 sm:w-6 opacity-70 hidden sm:block"
          />
          <img
            src="https://img.icons8.com/?size=100&id=24511&format=png&color=000000"
            className="absolute top-12 sm:top-20 right-6 sm:right-10 w-4 sm:w-6 opacity-70 hidden sm:block"
          />
          <img
            src="https://img.icons8.com/?size=100&id=32540&format=png&color=000000"
            className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 w-4 sm:w-6 opacity-70 hidden sm:block"
          />
        </section>
        
        <section className="w-full md:max-w-9/12  mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 pb-6 sm:pb-10">
          <div className="p-4 sm:p-6 bg-white rounded-3xl shadow-md hover:shadow-2xl transition">
            <div className="text-[#10B981] text-3xl sm:text-4xl mb-3 sm:mb-4">💡</div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#0A2540] mb-2">
              Looking for Scholarships?
            </h3>
            <p className="text-[#4A5568] text-xs sm:text-sm leading-relaxed font-medium">
              Our platform helps students find scholarships tailored to their needs. Get guidance, tips, and updates to make your application stand out.
            </p>
          </div>
          
          <div className="p-4 sm:p-6 bg-white rounded-3xl shadow-md hover:shadow-2xl transition">
            <div className="text-[#3B82F6] text-3xl sm:text-4xl mb-3 sm:mb-4">🧭</div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#0A2540] mb-2">
              Your Scholarship Journey Starts Here
            </h3>
            <p className="text-[#4A5568] text-xs sm:text-sm leading-relaxed font-medium">
              Explore thousands of scholarships, get personalized advice, and apply with confidence. We make finding the right opportunity easy.
            </p>
          </div>

          <div className="p-4 sm:p-6 bg-white rounded-3xl shadow-md hover:shadow-2xl transition sm:col-span-2 md:col-span-1">
            <div className="text-[#F59E0B] text-3xl sm:text-4xl mb-3 sm:mb-4">🎯</div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#0A2540] mb-2">
              Struggling to Find the Right Scholarship?
            </h3>
            <p className="text-[#4A5568] text-xs sm:text-sm leading-relaxed font-medium">
              Discover scholarships that match your profile. Get expert guidance, tips, and updates to boost your chances of success.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
