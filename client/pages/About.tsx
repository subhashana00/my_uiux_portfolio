import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, MapPin, Calendar, Award, CheckCircle, Mail, Menu, X, FileText, Linkedin, Github, Code, Palette, GraduationCap, Building, Star, Briefcase, Download, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useToast } from "@/hooks/use-toast";

export default function About() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [showVerticalNav, setShowVerticalNav] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    experience: false,
    skills: false
  });

  const heroRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      const windowWidth = window.innerWidth;
      
      // Update mobile state
      setIsMobile(windowWidth < 768);
      
      // Determine scroll direction
      const direction = scrollTop > lastScrollY ? 'down' : 'up';
      setScrollDirection(direction);
      
      // Show vertical nav when scrolling down and past 200px - ONLY on desktop
      setShowVerticalNav(direction === 'down' && scrollTop > 200 && windowWidth >= 768);
      
      // Only apply parallax on larger screens to prevent mobile issues
      if (windowWidth > 768) {
        setScrollY(scrollTop);
      } else {
        setScrollY(0); // Disable parallax on mobile
      }
      setScrollProgress(Math.min(scrollPercent * 100, 100));
      
      lastScrollY = scrollTop;
      
      // Check visibility of elements
      const checkVisibility = (ref: React.RefObject<HTMLElement>, key: keyof typeof isVisible) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          
          if (isInView && !isVisible[key]) {
            setIsVisible(prev => ({ ...prev, [key]: true }));
          }
        }
      };
      
      checkVisibility(heroRef, 'hero');
      checkVisibility(experienceRef, 'experience');
      checkVisibility(skillsRef, 'skills');
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Also check on resize
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isVisible]);

  const { toast } = useToast();

  // CV Download Function - Reliable Anchor Tag Method
  const downloadCV = () => {
    const cvUrl = 'https://drive.google.com/uc?export=download&id=1dvw2UKuxrCdCgMlxvCDWy4s1KdkNXpA3';
    
    try {
      // Show downloading toast with custom styling
      toast({
        title: "Initiating Download...",
        description: (
          <div className="flex items-center gap-3 p-2">
            <div className="w-6 h-6 border-2 border-[#007BFF] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[14px] tracking-[1.23px] font-medium">Preparing your CV download</span>
          </div>
        ),
        duration: 2000,
        className: "border-2 border-black rounded-[12px] shadow-[4px_4px_0_0_#000] bg-white",
      });

      // Create temporary anchor element for download
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = 'Prabhath_Subhashana_CV.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success toast with custom styling
      setTimeout(() => {
        toast({
          title: "Download Started!",
          description: (
            <div className="flex items-center gap-3 p-2">
              <div className="w-6 h-6 bg-green-500 border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0_0_#000]">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-[14px] tracking-[1.23px] font-medium">CV download has been initiated successfully</span>
            </div>
          ),
          duration: 4000,
          className: "border-2 border-black rounded-[12px] shadow-[4px_4px_0_0_#000] bg-[#FCF9F8]",
        });
      }, 1000);

    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Download Failed",
        description: (
          <div className="flex items-center gap-3 p-2">
            <div className="w-6 h-6 bg-red-500 border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0_0_#000]">
              <X className="w-4 h-4 text-white" />
            </div>
            <span className="text-[14px] tracking-[1.23px] font-medium">Sorry, there was an error starting the download. Please try again or contact support.</span>
          </div>
        ),
        variant: "destructive",
        duration: 5000,
        className: "border-2 border-red-500 rounded-[12px] shadow-[4px_4px_0_0_#ff0000] bg-red-50",
      });
    }
  };

  // Custom Behance Icon Component
  const BehanceIcon = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.497 1.19.9.26 1.54.65 1.93 1.17.39.52.585 1.17.585 1.95 0 .75-.14 1.4-.425 1.96-.285.56-.68 1.03-1.188 1.41-.508.38-1.108.67-1.8.87-.69.2-1.44.3-2.25.3H0V4.51h6.938v-.007zM3.495 8.847h2.862c.577 0 1.03-.133 1.36-.4.33-.267.495-.7.495-1.3 0-.622-.165-1.055-.495-1.3-.33-.245-.783-.367-1.36-.367H3.495v3.367zm0 4.833h3.362c.693 0 1.215-.167 1.567-.5.35-.33.527-.853.527-1.567 0-.67-.177-1.18-.53-1.53-.353-.35-.874-.527-1.564-.527H3.495v4.124zM21.439 6.064c.966 0 1.844.155 2.635.465.79.31 1.463.744 2.017 1.304.554.56.98 1.24 1.286 2.04.305.8.458 1.697.458 2.693v.515H17.93c.058 1.177.29 1.988.696 2.434.407.446.856.67 1.348.67.653 0 1.151-.24 1.495-.72.344-.48.517-.98.517-1.503h3.62c-.02.972-.234 1.87-.641 2.697-.407.826-.955 1.508-1.644 2.048-.69.54-1.504.948-2.442 1.224-.938.276-1.938.414-3 .414-1.072 0-2.05-.153-2.933-.458-.884-.305-1.644-.738-2.284-1.297-.64-.56-1.136-1.247-1.488-2.056-.352-.81-.528-1.734-.528-2.772 0-1.106.193-2.084.579-2.934.386-.85.919-1.563 1.599-2.139.68-.576 1.486-1.01 2.418-1.302.932-.292 1.943-.438 3.033-.438zm-3.971 5.939h6.659c-.038-.67-.322-1.222-.853-1.657-.531-.435-1.146-.653-1.846-.653-.729 0-1.38.218-1.955.653-.575.435-.934.987-1.005 1.657zM17.367 1.661c.191 0 .363.028.516.085.153.057.284.143.393.26.109.116.194.26.255.43.061.17.092.37.092.6 0 .23-.031.43-.092.6-.061.17-.146.314-.255.43-.109.117-.24.203-.393.26-.153.057-.325.085-.516.085-.191 0-.363-.028-.516-.085-.153-.057-.284-.143-.393-.26-.109-.116-.194-.26-.255-.43-.061-.17-.092-.37-.092-.6 0-.23.031-.43.092-.6.061-.17.146-.314.255-.43.109-.117.24-.203.393-.26.153-.057.325-.085.516-.085z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* CSS for paint drip animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes paintDrip {
            0% { transform: translateY(0) scale(1); opacity: 0.6; }
            50% { transform: translateY(2px) scale(1.2); opacity: 0.8; }
            100% { transform: translateY(4px) scale(0.8); opacity: 0.3; }
          }
        `
      }} />
      
      {/* Scroll Progress Bar - Paint Brush Style */}
      <div className="fixed top-0 left-0 w-full h-2 z-[60] bg-gray-200 shadow-sm">
        <div 
          className="h-full bg-gradient-to-r from-[#007BFF] via-purple-500 to-orange-400 transition-all duration-300 ease-out relative overflow-hidden"
          style={{ 
            width: `${scrollProgress}%`,
            clipPath: 'polygon(0% 0%, 96% 0%, 100% 40%, 98% 80%, 94% 100%, 0% 100%)',
            filter: 'drop-shadow(0 1px 4px rgba(0, 123, 255, 0.4))'
          }}
        >
          {/* Paint brush texture effect */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: `repeating-linear-gradient(
                90deg,
                transparent 0px,
                rgba(255,255,255,0.3) 1px,
                transparent 3px,
                transparent 6px
              )`
            }}
          />
          {/* Glowing tip effect */}
          <div 
            className="absolute right-0 top-0 h-full w-4 bg-white opacity-50 blur-sm"
            style={{
              clipPath: 'polygon(0% 10%, 100% 30%, 100% 70%, 0% 90%)'
            }}
          />
          {/* Paint drip effect */}
          <div 
            className="absolute right-2 bottom-0 w-1 h-1 bg-white opacity-60 rounded-full"
            style={{
              animation: `${scrollProgress > 10 ? 'paintDrip 2s ease-in-out infinite' : 'none'}`
            }}
          />
        </div>
      </div>
      
      {/* Header */}
      <header className={`bg-[#FCF9F8] px-4 sm:px-6 lg:px-[154px] py-4 sm:py-6 lg:py-[31px] transition-all duration-500 ease-in-out z-50 ${
        // Sticky on mobile, conditional visibility on desktop
        isMobile 
          ? 'sticky top-0' 
          : `relative ${showVerticalNav ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center justify-center w-[80px] h-[45px] sm:w-[100px] sm:h-[55px] lg:w-[131px] lg:h-[70px] bg-black text-white text-sm sm:text-lg lg:text-xl font-medium hover:bg-[#007BFF] transition-colors">
              PS.
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <Link
              to="/about"
              className="text-white text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-black bg-[#007BFF] shadow-[3px_3px_0_0_#000000] -translate-x-0.5 -translate-y-0.5 transition-all duration-300"
            >
              About Me
            </Link>
            <Link
              to="/projects"
              className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
            >
              Projects
            </Link>
            <Link
              to="/freelance"
              className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
            >
              Freelance
            </Link>
          </nav>

          {/* Desktop Contact Button */}
          <Link to="/contact">
            <Button
              variant="outline"
              className="hidden md:flex border-black bg-[#FCF9F8] hover:bg-[#007BFF] hover:text-white shadow-[2px_2px_0_0_#000] text-[14px] lg:text-[16px] font-medium px-[30px] lg:px-[50px] py-[15px] lg:py-[20px] rounded-none"
            >
              Contact Me
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 bg-[#FCF9F8] border-t-2 border-black p-4 z-50 shadow-[0_4px_8px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col space-y-4">
              <Link
                to="/about"
                className="text-[#007BFF] text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-[#007BFF] bg-white shadow-[3px_3px_0_0_#007BFF] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Me
              </Link>
              <Link
                to="/projects"
                className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/freelance"
                className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Freelance
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="border-black bg-[#FCF9F8] hover:bg-[#007BFF] hover:text-white shadow-[2px_2px_0_0_#000] text-[16px] font-medium px-[30px] py-[15px] rounded-none w-full justify-center mt-2"
                >
                  Contact Me
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Vertical Navigation - Right Side - Hidden on mobile */}
      <nav className={`fixed right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ease-in-out hidden md:block ${
        showVerticalNav ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'
      }`}>
        <div className="bg-white border-2 border-black rounded-[15px] lg:rounded-[20px] shadow-[3px_3px_0_0_#000] lg:shadow-[4px_4px_0_0_#000] p-2 sm:p-3 lg:p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center mb-4 lg:mb-6">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-black text-white text-xs sm:text-sm font-medium hover:bg-[#007BFF] transition-colors rounded-lg">
              PS.
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2 sm:space-y-3 lg:space-y-4">
            <Link
              to="/about"
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-[#007BFF] bg-[#007BFF] text-white rounded-lg hover:bg-white hover:text-[#007BFF] transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="About Me"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium">About</span>
            </Link>
            <Link
              to="/projects"
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="Projects"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium group-hover:text-white">Projects</span>
            </Link>
            <Link
              to="/freelance"
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="Freelance"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium group-hover:text-white">Freelance</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="Contact Me"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium group-hover:text-white">Contact</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="bg-[#FCF9F8] py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Main About Card */}
            <div className="bg-white border-2 border-black rounded-[20px] shadow-[8px_8px_0_0_#000] overflow-hidden mb-8 lg:mb-12">
              <div className="grid lg:grid-cols-2 gap-0">
                
                {/* Left side - Content */}
                <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-[#007BFF] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <GraduationCap className="w-4 h-4" />
                        Software Engineering Student
                      </div>
                      
                      <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-medium leading-tight text-black mb-6">
                        About <span className="relative">Me<span className="absolute bottom-0 left-0 w-full h-2 bg-[#007BFF]/20"></span></span>
                      </h1>
                    </div>

                    <p className="text-[16px] leading-[28px] tracking-[1.23px] text-gray-700 max-w-lg">
                      I'm Prabhath Subhashana, a BSc Software Engineering undergraduate and UI/UX Designer passionate about creating engaging, user-centered digital experiences. With over 2 years of hands-on experience in design and development, I specialize in transforming complex problems into intuitive, beautiful solutions that bridge the gap between aesthetics and functionality.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#007BFF]" />
                        <span className="text-[14px] tracking-[1.23px] text-gray-600">Gampaha, Western Province, Sri Lanka</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-[#007BFF]" />
                        <span className="text-[14px] tracking-[1.23px] text-gray-600">Expected graduation: August 2027</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-[#007BFF]" />
                        <span className="text-[14px] tracking-[1.23px] text-gray-600">ICBT Campus (Cardiff Metropolitan University)</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        onClick={downloadCV}
                        variant="outline"
                        className="border-black bg-white hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] text-[16px] font-medium px-[40px] py-[24px] rounded-lg transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#007BFF]"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download CV
                      </Button>
                      <Link to="/contact">
                        <Button
                          variant="outline"
                          className="border-[#007BFF] bg-[#007BFF] text-white hover:bg-white hover:text-[#007BFF] shadow-[4px_4px_0_0_#007BFF] text-[16px] font-medium px-[40px] py-[24px] rounded-lg transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#007BFF]"
                        >
                          <Mail className="w-5 h-5 mr-2" />
                          Let's Connect
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right side - Profile Image & Stats */}
                <div className="relative p-8 sm:p-12 lg:p-16 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                  {/* Decorative elements */}
                  <div className="absolute top-8 left-8 w-6 h-6 bg-[#007BFF] rounded-full"></div>
                  <div className="absolute top-12 right-12 w-8 h-8 border-2 border-black transform rotate-45"></div>
                  <div className="absolute bottom-12 left-12 w-4 h-4 bg-black"></div>
                  
                  <div className="relative">
                    {/* Main profile image container */}
                    <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[350px] lg:h-[350px] mx-auto">
                      <div className="w-full h-full border-4 border-black rounded-[20px] overflow-hidden shadow-[6px_6px_0_0_#000] bg-white p-2">
                        <div className="w-full h-full rounded-[12px] overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <img
                            src="/images/profile/aa.png"
                            alt="Prabhath Subhashana"
                            className="w-full h-full object-cover object-center scale-110 hover:scale-115 transition-transform duration-500"
                            onError={(e) => {
                              // Fallback if image doesn't exist
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.parentElement!.innerHTML = `
                                <div class="w-full h-full flex items-center justify-center">
                                  <div class="text-center">
                                    <div class="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                      <span class="text-white text-4xl font-bold">PS</span>
                                    </div>
                                    <h3 class="text-xl font-semibold text-gray-800">Prabhath Subhashana</h3>
                                    <p class="text-gray-600">UI/UX Designer</p>
                                  </div>
                                </div>
                              `;
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stats cards below profile image */}
                    <div className="flex justify-center gap-6 mt-8">
                      <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                        <div className="text-center">
                          <span className="text-2xl font-bold text-[#007BFF] block">2+</span>
                          <p className="text-sm font-medium text-black mt-1">Years Experience</p>
                        </div>
                      </div>
                      
                      <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0_0_#000] p-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <div className="text-center">
                          <span className="text-2xl font-bold text-[#007BFF] block">10+</span>
                          <p className="text-sm font-medium text-black mt-1">Projects Completed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center mb-12">
              <p className="text-sm text-gray-600 mb-6 tracking-[1.23px]">Connect with me</p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://linkedin.com/in/prabhath-subhashana-6b694a20a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://behance.net/prabathsubasha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="Behance Portfolio"
                >
                  <BehanceIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/subhashana00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="mailto:prabathsubashana18@gmail.com"
                  className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-[39px] font-medium leading-tight text-black mb-6">
                Journey & Experience
              </h2>
              <p className="text-[14px] sm:text-[16px] leading-[26px] sm:leading-[30px] tracking-[1.23px] text-black max-w-2xl mx-auto">
                My educational background and professional experience
              </p>
            </div>

            {/* Main Experience Cards */}
            <div className="space-y-8 mb-12">
              
              {/* Current Education - Featured */}
              <div className="bg-[#FCF9F8] border-2 border-black rounded-[20px] shadow-[6px_6px_0_0_#000] p-8 lg:p-10 hover:shadow-[8px_8px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
                  <div className="w-16 h-16 bg-[#007BFF] border-2 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,0.3)]">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl lg:text-2xl font-medium text-black mb-2">BSc (Hons) Software Engineering</h3>
                        <p className="text-[14px] tracking-[1.23px] text-gray-700">ICBT Campus (Cardiff Metropolitan University)</p>
                      </div>
                      <div className="flex items-center gap-3 mt-3 sm:mt-0">
                        <span className="text-sm font-medium text-[#007BFF] tracking-[1.23px]">IN PROGRESS</span>
                        <span className="text-sm text-gray-600 tracking-[1.23px]">2024 - 2027</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 border border-black rounded-full h-3">
                          <div className="bg-[#007BFF] h-full rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-[#007BFF]">75% Complete</span>
                    </div>
                    <p className="text-[13px] tracking-[1.23px] text-gray-600">Expected graduation: August 2027</p>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="grid lg:grid-cols-2 gap-6">
                
                {/* Recent Work */}
                <div className="bg-[#FCF9F8] border-2 border-black rounded-[20px] shadow-[6px_6px_0_0_#000] p-8 hover:shadow-[8px_8px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-purple-500 border-2 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,0.3)]">
                      <Code className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-black">UI/UX Designer (Intern)</h3>
                      <p className="text-sm text-purple-600 font-medium tracking-[1.23px]">May 2025 - Aug 2025</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-[14px] tracking-[1.23px] text-gray-700 font-medium mb-3">Uvexzon – Remote</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-[13px] tracking-[1.23px] text-gray-700">
                        <span className="text-purple-500 font-bold mt-1">•</span>
                        <span>Designed Swish Strokes mobile app & landing page</span>
                      </li>
                      <li className="flex items-start gap-2 text-[13px] tracking-[1.23px] text-gray-700">
                        <span className="text-purple-500 font-bold mt-1">•</span>
                        <span>Created CulturaJoin event management platform</span>
                      </li>
                      <li className="flex items-start gap-2 text-[13px] tracking-[1.23px] text-gray-700">
                        <span className="text-purple-500 font-bold mt-1">•</span>
                        <span>Led complete Uvexzon website redesign</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Previous Work */}
                <div className="bg-[#FCF9F8] border-2 border-black rounded-[20px] shadow-[6px_6px_0_0_#000] p-8 hover:shadow-[8px_8px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-orange-500 border-2 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,0.3)]">
                      <Building className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-black">Pharmacy Regulatory & IT Assistant</h3>
                      <p className="text-sm text-orange-600 font-medium tracking-[1.23px]">Aug 2022 - Dec 2024</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-[14px] tracking-[1.23px] text-gray-700 font-medium mb-3">Pharma Associates – Colombo-14</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-[13px] tracking-[1.23px] text-gray-700">
                        <span className="text-orange-500 font-bold mt-1">•</span>
                        <span>Assisted NMRA with drug licensing & approval processes</span>
                      </li>
                      <li className="flex items-start gap-2 text-[13px] tracking-[1.23px] text-gray-700">
                        <span className="text-orange-500 font-bold mt-1">•</span>
                        <span>Streamlined workflows through IT solutions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education Foundation */}
              <div className="bg-[#FCF9F8] border-2 border-black rounded-[20px] shadow-[6px_6px_0_0_#000] p-8 hover:shadow-[8px_8px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-green-500 border-2 border-black rounded-full flex items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,0.3)]">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-black mb-1">St. Peter's College, Colombo – 4</h3>
                        <p className="text-[14px] tracking-[1.23px] text-gray-700">Secondary Education</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2 sm:mt-0">
                        <span className="text-sm font-medium text-green-600 tracking-[1.23px]">COMPLETED</span>
                        <span className="text-sm text-gray-600 tracking-[1.23px]">2014 - 2019</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="text-center bg-[#FCF9F8] border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] p-6 hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-2xl lg:text-3xl font-medium text-[#007BFF] mb-2">3+</div>
                <div className="text-[12px] lg:text-[13px] font-medium text-black uppercase tracking-[1.23px]">Years Experience</div>
              </div>
              <div className="text-center bg-[#FCF9F8] border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] p-6 hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-2xl lg:text-3xl font-medium text-purple-500 mb-2">10+</div>
                <div className="text-[12px] lg:text-[13px] font-medium text-black uppercase tracking-[1.23px]">Projects</div>
              </div>
              <div className="text-center bg-[#FCF9F8] border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] p-6 hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-2xl lg:text-3xl font-medium text-green-500 mb-2">2</div>
                <div className="text-[12px] lg:text-[13px] font-medium text-black uppercase tracking-[1.23px]">Industries</div>
              </div>
              <div className="text-center bg-[#FCF9F8] border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] p-6 hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
                <div className="text-2xl lg:text-3xl font-medium text-orange-500 mb-2">75%</div>
                <div className="text-[12px] lg:text-[13px] font-medium text-black uppercase tracking-[1.23px]">Progress</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-[#FCF9F8] py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-10 w-16 h-16 border-4 border-black rounded-full opacity-10"></div>
        <div className="absolute top-32 right-16 w-8 h-8 bg-[#007BFF] transform rotate-45 opacity-15"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-purple-500 rounded-full opacity-15"></div>
        <div className="absolute bottom-32 right-8 w-6 h-6 border-2 border-black opacity-10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-3 bg-white border-2 border-black rounded-full px-6 py-3 shadow-[4px_4px_0_0_#000] mb-8 transform hover:scale-105 transition-transform duration-300">
                <Star className="w-5 h-5 text-[#007BFF]" />
                <span className="text-[14px] font-medium tracking-[1.23px] text-black">MY TOOLKIT</span>
                <Star className="w-5 h-5 text-[#007BFF]" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-medium leading-tight text-black mb-6">
                Skills & <span className="relative">Expertise<span className="absolute bottom-0 left-0 w-full h-3 bg-[#007BFF]/20"></span></span>
              </h2>
              <p className="text-[14px] sm:text-[16px] leading-[26px] sm:leading-[30px] tracking-[1.23px] text-black max-w-2xl mx-auto">
                Technologies and tools I work with to bring ideas to life
              </p>
            </div>

            {/* Main Skills Grid - Balanced 3 Column Layout */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              
              {/* Design Tools */}
              <div className="bg-white border-2 border-black rounded-[20px] shadow-[6px_6px_0_0_#000] p-6 lg:p-8 group hover:shadow-[8px_8px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full transform translate-x-12 -translate-y-12 opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-black rounded-[16px] flex items-center justify-center shadow-[3px_3px_0_0_#000] group-hover:scale-110 transition-transform duration-300">
                      <Palette className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-black mb-1">Design Tools</h3>
                      <p className="text-[12px] tracking-[1.23px] text-gray-600 uppercase font-medium">Visual Creation</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-[#FCF9F8] border border-black rounded-[8px] p-3 shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">F</span>
                        </div>
                        <div>
                          <h4 className="text-[13px] font-medium text-black">Figma & FigJam</h4>
                          <p className="text-[11px] text-gray-600">UI/UX Design</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#FCF9F8] border border-black rounded-[8px] p-3 shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">AI</span>
                        </div>
                        <div>
                          <h4 className="text-[13px] font-medium text-black">Figma AI & Make</h4>
                          <p className="text-[11px] text-gray-600">AI-Powered Design</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#FCF9F8] border border-black rounded-[8px] p-3 shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">CC</span>
                        </div>
                        <div>
                          <h4 className="text-[13px] font-medium text-black">Adobe Creative Suite</h4>
                          <p className="text-[11px] text-gray-600">Creative Tools</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Frontend Development */}
              <div className="bg-white border-2 border-black rounded-[20px] shadow-[6px_6px_0_0_#000] p-6 lg:p-8 group hover:shadow-[8px_8px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full transform translate-x-12 -translate-y-12 opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-black rounded-[16px] flex items-center justify-center shadow-[3px_3px_0_0_#000] group-hover:scale-110 transition-transform duration-300">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-black mb-1">Frontend</h3>
                      <p className="text-[12px] tracking-[1.23px] text-gray-600 uppercase font-medium">Client-Side</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-[#FCF9F8] border border-black rounded-[8px] p-3 shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">H</span>
                        </div>
                        <div>
                          <h4 className="text-[13px] font-medium text-black">HTML & CSS</h4>
                          <p className="text-[11px] text-gray-600">Web Fundamentals</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#FCF9F8] border border-black rounded-[8px] p-3 shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">JS</span>
                        </div>
                        <div>
                          <h4 className="text-[13px] font-medium text-black">JavaScript</h4>
                          <p className="text-[11px] text-gray-600">Dynamic Programming</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#FCF9F8] border border-black rounded-[8px] p-3 shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">R</span>
                        </div>
                        <div>
                          <h4 className="text-[13px] font-medium text-black">React & TypeScript</h4>
                          <p className="text-[11px] text-gray-600">Modern Frameworks</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Backend & Database */}
              <div className="bg-white border-2 border-black rounded-[20px] shadow-[6px_6px_0_0_#000] p-6 lg:p-8 group hover:shadow-[8px_8px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden md:col-span-2 lg:col-span-1">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full transform translate-x-12 -translate-y-12 opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-black rounded-[16px] flex items-center justify-center shadow-[3px_3px_0_0_#000] group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-black mb-1">Backend</h3>
                      <p className="text-[12px] tracking-[1.23px] text-gray-600 uppercase font-medium">Server-Side</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-[#FCF9F8] border border-black rounded-[8px] p-3 shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">N</span>
                        </div>
                        <div>
                          <h4 className="text-[13px] font-medium text-black">Node.js & Express</h4>
                          <p className="text-[11px] text-gray-600">Server Runtime</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#FCF9F8] border border-black rounded-[8px] p-3 shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">P</span>
                        </div>
                        <div>
                          <h4 className="text-[13px] font-medium text-black">Python & Java</h4>
                          <p className="text-[11px] text-gray-600">Programming Languages</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#FCF9F8] border border-black rounded-[8px] p-3 shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">DB</span>
                        </div>
                        <div>
                          <h4 className="text-[13px] font-medium text-black">SQL & .NET MVC</h4>
                          <p className="text-[11px] text-gray-600">Database & Framework</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Proficiency Section */}
            <div className="bg-white border-2 border-black rounded-[20px] shadow-[6px_6px_0_0_#000] p-8 lg:p-10 mb-12 hover:shadow-[8px_8px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-medium text-black mb-2 flex items-center justify-center gap-2">
                  <Star className="w-6 h-6 text-[#007BFF]" />
                  Skill Proficiency
                  <Star className="w-6 h-6 text-[#007BFF]" />
                </h3>
                <p className="text-[14px] tracking-[1.23px] text-gray-600">My expertise level in different technologies</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0_0_#000]">
                    <Palette className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-lg font-medium text-black mb-3">UI/UX Design</h4>
                  <div className="w-full bg-gray-200 border border-black rounded-full h-3 mb-2">
                    <div className="bg-[#007BFF] h-full rounded-full transition-all duration-1000" style={{ width: '90%' }}></div>
                  </div>
                  <span className="text-[12px] text-[#007BFF] font-medium">90% Expert</span>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0_0_#000]">
                    <Code className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-lg font-medium text-black mb-3">Frontend Development</h4>
                  <div className="w-full bg-gray-200 border border-black rounded-full h-3 mb-2">
                    <div className="bg-cyan-500 h-full rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-[12px] text-cyan-600 font-medium">65% Advanced</span>
                </div>
                
                <div className="text-center md:col-span-2 lg:col-span-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0_0_#000]">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-lg font-medium text-black mb-3">Backend Development</h4>
                  <div className="w-full bg-gray-200 border border-black rounded-full h-3 mb-2">
                    <div className="bg-green-500 h-full rounded-full transition-all duration-1000" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-[12px] text-green-600 font-medium">45% Intermediate</span>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
              <div className="text-center bg-white border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] p-6 hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#007BFF] border-2 border-black rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-medium text-[#007BFF] mb-1">5+</div>
                <div className="text-[12px] lg:text-[13px] font-medium text-black uppercase tracking-[1.23px]">Design Tools</div>
              </div>
              <div className="text-center bg-white border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] p-6 hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-12 h-12 bg-cyan-500 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-medium text-cyan-500 mb-1">8+</div>
                <div className="text-[12px] lg:text-[13px] font-medium text-black uppercase tracking-[1.23px]">Technologies</div>
              </div>
              <div className="text-center bg-white border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] p-6 hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-12 h-12 bg-green-500 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-medium text-green-500 mb-1">3</div>
                <div className="text-[12px] lg:text-[13px] font-medium text-black uppercase tracking-[1.23px]">Categories</div>
              </div>
              <div className="text-center bg-white border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] p-6 hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-12 h-12 bg-purple-500 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-medium text-purple-500 mb-1">2+</div>
                <div className="text-[12px] lg:text-[13px] font-medium text-black uppercase tracking-[1.23px]">Years Experience</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/projects">
                  <Button
                    variant="outline"
                    className="border-black bg-white hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] text-[16px] font-medium px-[40px] py-[24px] rounded-lg transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#000]"
                  >
                    View My Projects
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/freelance">
                  <Button
                    variant="outline"
                    className="border-[#007BFF] bg-[#007BFF] text-white hover:bg-white hover:text-[#007BFF] shadow-[4px_4px_0_0_#007BFF] text-[16px] font-medium px-[40px] py-[24px] rounded-lg transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#007BFF]"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Let's Work Together
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-[43px]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/in/prabhath-subhashana-6b694a20a"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://behance.net/prabathsubasha"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                title="Behance Portfolio"
              >
                <BehanceIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://github.com/subhashana00"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="mailto:prabathsubashana18@gmail.com"
                className="w-10 h-10 sm:w-12 sm:h-12 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                title="Email"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-[14px] sm:text-[15px] leading-[24px] sm:leading-[27px] tracking-[1.23px] text-black">
                Created by Prabhath Subhashana
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <WhatsAppFloat 
        phoneNumber="+94716903566"
        message="Hi Prabhath! I saw your about page and would like to discuss working together on a project."
      />
    </div>
  );
}
