import { Link } from "react-router";
import { useState, useEffect } from "react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Slider content
  const slides = [
    {
      title: "Your Path to College & Trade School Scholarships Starts Here",
      description: "Discover scholarships for college and trade school in one simple place. Find opportunities that match your goals and apply with confidence.",
      image: "https://themephi.net/html/eduan/eduan/assets/img/banner/2/banner-bg.png",
      bgColor: "from-[#d7edf7] to-[#e8f4f8]"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('top-scholarships');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mb-10">
      <div className={`w-full bg-linear-to-br from-[#d7edf7] to-[#e8f4f8] min-h-[60vh] max-h-[70vh] relative overflow-hidden transition-all duration-1000`}>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-20 h-20 bg-blue-500/10 rounded-full animate-pulse delay-1000"></div>
        </div>

        <section className="w-full md:w-9/12 mx-auto px-4 sm:px-1 py-8 sm:py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center relative h-full">
          
          <div className={`space-y-4 sm:space-y-6 text-center lg:text-left transition-all duration-700 transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A2540] leading-snug px-2 sm:px-0">
              <span className="inline-block animate-slideIn" key={`title-${currentSlide}`}>
                {slides[currentSlide].title}
              </span>
            </h1>

            <p className="text-[#4A5568] text-base sm:text-lg leading-relaxed max-w-full lg:max-w-md font-medium px-2 sm:px-0 animate-slideIn delay-200" key={`desc-${currentSlide}`}>
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3 animate-slideIn delay-400">
              <Link 
                to='/all-scholarship' 
                className="group bg-linear-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl text-sm sm:text-base transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 group-hover:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Scholarships
                </span>
              </Link>
            </div>
          </div>

          <div className={`flex justify-center lg:justify-end order-first lg:order-last relative transition-all duration-700 transform ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="relative group">
              <img
                src={slides[currentSlide].image}
                alt={`Scholarship Slide ${currentSlide + 1}`}
                className="w-[280px] sm:w-[350px] md:w-[420px] lg:w-[480px] xl:w-[550px] object-cover drop-shadow-2xl transition-all duration-500 group-hover:scale-105"
                key={`image-${currentSlide}`}
              />
            </div>
          </div>

          <div className="absolute top-6 sm:top-10 left-3 sm:left-5 w-8 h-8 bg-primary/20 rounded-full  items-center justify-center animate-float cursor-pointer hover:bg-primary/30 transition-colors hidden sm:flex">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          
          <div className="absolute top-12 sm:top-20 right-6 sm:right-10 w-8 h-8 bg-blue-500/20 rounded-full  items-center justify-center animate-float delay-1000 cursor-pointer hover:bg-blue-500/30 transition-colors hidden sm:flex">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </section>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-6">
          <button
            onClick={scrollToNext}
            className="group flex flex-col items-center gap-3 text-[#0A2540] hover:text-primary transition-all duration-300 animate-bounce"
            aria-label="Scroll to next section"
          >
          </button>
        </div>
      </div>

      <section className="w-full md:max-w-9/12 mx-auto px-4 sm:px-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 py-8 sm:py-12 relative md:absolute top-0 right-0  md:top-137 md:right-60">
        <div className="group p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer">
          <div className="text-[#10B981] text-4xl mb-4 group-hover:animate-bounce group-hover:scale-110 transition-transform duration-300">💡</div>
          <h3 className="text-xl font-bold text-[#0A2540] mb-3 group-hover:text-primary transition-colors duration-300">
            Looking for Scholarships?
          </h3>
          <p className="text-[#4A5568] text-sm leading-relaxed font-medium">
            Our platform helps students find scholarships tailored to their needs. Get guidance, tips, and updates to make your application stand out.
          </p>
        </div>
        
        <div className="group p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer">
          <div className="text-[#10B981] text-4xl mb-4 group-hover:animate-bounce group-hover:scale-110 transition-transform duration-300">🧭</div>
          <h3 className="text-xl font-bold text-[#0A2540] mb-3 group-hover:text-primary  transition-colors duration-300">
            Your Scholarship Journey Starts Here
          </h3>
          <p className="text-[#4A5568] text-sm leading-relaxed font-medium">
            Explore thousands of scholarships, get personalized advice, and apply with confidence. We make finding the right opportunity easy.
          </p>
        </div>

        <div className="group p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer">
          <div className="text-[#10B981] text-4xl mb-4 group-hover:animate-bounce group-hover:scale-110 transition-transform duration-300">🎯</div>
          <h3 className="text-xl font-bold text-[#0A2540] mb-3 group-hover:text-primary transition-colors duration-300">
            Struggling to Find the Right Scholarship?
          </h3>
          <p className="text-[#4A5568] text-sm leading-relaxed font-medium">
            Discover scholarships that match your profile. Get expert guidance, tips, and updates to boost your chances of success.
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default Hero;
