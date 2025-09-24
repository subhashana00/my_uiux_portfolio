import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, ArrowLeft, Search, FileX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
    
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#FCF9F8] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        
        {/* Main 404 Card */}
        <div className={`bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] lg:shadow-[8px_8px_0_0_#000] p-6 sm:p-8 lg:p-12 mb-6 sm:mb-8 transition-all duration-1000 ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-12 scale-95'
        }`}>
          
          {/* Decorative elements */}
          <div className={`flex items-center justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-black transform rotate-45"></div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-2 border-black rounded-full flex items-center justify-center">
              <FileX className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-black" />
            </div>
            <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-black"></div>
          </div>

          {/* 404 Number */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-black mb-4 sm:mb-6">
              4<span className="text-[#007BFF]">0</span>4
            </h1>
          </div>

          {/* Error Message */}
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-black mb-3 sm:mb-4">
              Oops! Page not found
            </h2>
            <p className="text-sm sm:text-[16px] leading-[22px] sm:leading-[26px] tracking-[1.23px] text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Current Path Display */}
          <div className={`bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">Requested path:</p>
            <code className="text-sm sm:text-base text-black font-mono break-all">
              {location.pathname}
            </code>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-900 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Back to Home Button */}
          <Link
            to="/"
            className="bg-[#007BFF] hover:bg-[#0056b3] text-white border-2 border-black rounded-[12px] sm:rounded-[15px] shadow-[3px_3px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 px-6 sm:px-8 py-3 sm:py-4 font-medium text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            Return to Home
          </Link>

          {/* Go Back Button */}
          <button
            onClick={() => window.history.back()}
            className="bg-white hover:bg-gray-50 text-black border-2 border-black rounded-[12px] sm:rounded-[15px] shadow-[3px_3px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 px-6 sm:px-8 py-3 sm:py-4 font-medium text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className={`mt-8 sm:mt-12 transition-all duration-1000 delay-1100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Or visit these popular sections:
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              to="/about"
              className="bg-white hover:bg-gray-50 text-black border border-black rounded-lg px-4 py-2 text-sm hover:shadow-[2px_2px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
            >
              About
            </Link>
            <Link
              to="/projects"
              className="bg-white hover:bg-gray-50 text-black border border-black rounded-lg px-4 py-2 text-sm hover:shadow-[2px_2px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
            >
              Projects
            </Link>
            <Link
              to="/contact"
              className="bg-white hover:bg-gray-50 text-black border border-black rounded-lg px-4 py-2 text-sm hover:shadow-[2px_2px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
