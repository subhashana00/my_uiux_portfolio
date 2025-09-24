import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowRight, Linkedin, Mail, Menu, X, Github, Zap, Users, Award, MessageCircle, ChevronLeft, ChevronRight, Play, Pause, Eye } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Move roles outside component to prevent recreation on every render
const ROLES = ["UI/UX Designer", "Front-end Developer"];

export default function Index() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [showVerticalNav, setShowVerticalNav] = useState(false);
  
  // Gallery states
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Image loading states
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});
  
  // Refs for scroll animations
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  
  // Animation states
  const [isVisible, setIsVisible] = useState({
    hero: false,
    stats: false,
    quote: false,
    projects: false
  });

  // Initialize typewriter animation
  useEffect(() => {
    // Reset state
    setDisplayedText("");
    setCurrentRoleIndex(0);
    setIsTyping(true);
    
    // Force initial animation start with a slight delay
    const initTimeout = setTimeout(() => {
      setDisplayedText("U"); // Start with first letter to kickstart the effect
    }, 200);
    
    return () => clearTimeout(initTimeout);
  }, []);

  // Project gallery data
  const projectGalleries = {
    swishstrokes: [
      "/images/projects/swishstrokes.png",
      "/images/projects/swish_1.jpeg", 
      "/images/projects/swish_2.jpeg",
      "/images/projects/swish_3.jpeg",
      "/images/projects/swish_4.png"
    ],
    culturajoin: [
      "/images/projects/culturajoin.png",
      "/images/projects/cult_1.png", 
      "/images/projects/cult_3.png",
      "/images/projects/cult_4.png",
      "/images/projects/cult_2.png"
    ],
    uvexzon: [
      "/images/projects/uvex_1.png",
      "/images/projects/uvex_2.png", 
      "/images/projects/uvex_3.png",
      "/images/projects/uvex_4.png",
      "/images/projects/uvex_5.png"
    ],
    virtualtry: [
      '/images/projects/virtual_1.png',
    '/images/projects/virtual_2.png',
    '/images/projects/virtual_3.png',
    '/images/projects/virtual_4.png',
    '/images/projects/virtual_10.png',
    ]
  };

  // Scroll handler for parallax and reveal animations
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
      checkVisibility(statsRef, 'stats');
      checkVisibility(quoteRef, 'quote');
      checkVisibility(projectsRef, 'projects');
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Also check on resize
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isVisible]);

  useEffect(() => {
    if (ROLES.length === 0) return; // Safety check
    
    let timeout: NodeJS.Timeout;
    const currentRole = ROLES[currentRoleIndex];

    if (isTyping) {
      // Typing animation
      if (displayedText.length < currentRole.length) {
        timeout = setTimeout(() => {
          const nextText = currentRole.slice(0, displayedText.length + 1);
          setDisplayedText(nextText);
        }, 150); // Slightly slower for better visibility
      } else {
        // Finished typing, wait then start erasing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      // Erasing animation
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          const nextText = displayedText.slice(0, -1);
          setDisplayedText(nextText);
        }, 75);
      } else {
        // Finished erasing, move to next role
        timeout = setTimeout(() => {
          setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
          setIsTyping(true);
        }, 500);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [displayedText, isTyping, currentRoleIndex]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500); // Blink every 500ms

    return () => clearInterval(cursorInterval);
  }, []);

  // Auto-carousel for gallery
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGalleryOpen && isAutoPlaying && currentProject) {
      interval = setInterval(() => {
        const projectImages = projectGalleries[currentProject as keyof typeof projectGalleries];
        if (projectImages) {
          setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
        }
      }, 3000); // Change image every 3 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGalleryOpen, isAutoPlaying, currentProject, currentImageIndex]);

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isGalleryOpen) return;
      
      switch (event.key) {
        case 'Escape':
          closeGallery();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextImage();
          break;
        case ' ': // Space bar
          event.preventDefault();
          toggleAutoPlay();
          break;
      }
    };

    if (isGalleryOpen) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [isGalleryOpen]);

  // Image preloading effect for critical images
  useEffect(() => {
    const criticalImages = [
      "/images/profile/profile.png", // Hero profile image (corrected extension)
      "/images/projects/swishstrokes.png", // First featured project
      "/images/projects/culturajoin.png", // Second featured project
      "/images/projects/uvex_2.png", // Third featured project - using uvex_2 which exists
      "/images/projects/virtual_10.png", // Fourth featured project
    ];

    const preloadImages = async () => {
      const imagePromises = criticalImages.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => ({ ...prev, [src]: true }));
            resolve();
          };
          img.onerror = () => {
            // Silently handle missing images without console warnings
            setImagesLoaded(prev => ({ ...prev, [src]: false }));
            resolve(); // Don't fail the whole process
          };
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
      } catch (error) {
        // Silently handle preload errors
        console.debug('Image preload completed with some failures');
      }
    };

    preloadImages();
  }, []);

  // Image loading handler
  const handleImageLoad = (src: string) => {
    setImagesLoaded(prev => ({ ...prev, [src]: true }));
  };

  // Image component with loading state and better error handling
  const OptimizedImage = ({ 
    src, 
    alt, 
    className = "", 
    priority = false,
    ...props 
  }: {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    [key: string]: any;
  }) => {
    const [imageError, setImageError] = useState(false);
    const [localLoaded, setLocalLoaded] = useState(false);
    const isPreloaded = imagesLoaded[src];
    const shouldShowImage = isPreloaded || localLoaded;
    
    const handleImageLoad = () => {
      setLocalLoaded(true);
      setImagesLoaded(prev => ({ ...prev, [src]: true }));
    };

    const handleImageError = () => {
      setImageError(true);
      setLocalLoaded(true);
    };
    
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {!shouldShowImage && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-gray-400 text-sm">Image not available</div>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className={`transition-opacity duration-500 ${shouldShowImage ? 'opacity-100' : 'opacity-0'} ${className}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            {...props}
          />
        )}
      </div>
    );
  };

  // Gallery helper functions
  const openGallery = (projectId: string) => {
    setCurrentProject(projectId);
    setCurrentImageIndex(0);
    setIsAutoPlaying(true);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setCurrentProject(null);
    setCurrentImageIndex(0);
    setIsAutoPlaying(false);
  };

  const nextImage = () => {
    if (currentProject) {
      const projectImages = projectGalleries[currentProject as keyof typeof projectGalleries];
      if (projectImages) {
        setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
      }
    }
  };

  const prevImage = () => {
    if (currentProject) {
      const projectImages = projectGalleries[currentProject as keyof typeof projectGalleries];
      if (projectImages) {
        setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
      }
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
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
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .animate-shimmer {
            animation: shimmer 1.5s ease-in-out infinite;
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
              className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
            >
              About Me
            </Link>
            <Link
              to="/projects"
              className="text-black text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
            >
              Projects
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
                className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300"
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
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="About Me"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium group-hover:text-white">About</span>
            </Link>
            <Link
              to="/projects"
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="Projects"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium group-hover:text-white">Projects</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-[#007BFF] bg-[#007BFF] text-white rounded-lg hover:bg-white hover:text-[#007BFF] transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="Contact Me"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium">Contact</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="bg-[#FCF9F8] py-8 sm:py-12 lg:py-16 xl:py-20 relative overflow-hidden z-10"
        style={{
          transform: `translateY(${window.innerWidth > 768 ? Math.min(scrollY * 0.03, 40) : 0}px)`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Main Hero Card */}
            <div className={`bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] lg:shadow-[8px_8px_0_0_#000] overflow-hidden mb-6 sm:mb-8 lg:mb-12 transition-all duration-1000 ${
              isVisible.hero 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}>
              <div className="grid lg:grid-cols-2 gap-0">
                
                {/* Left side - Content */}
                <div className={`p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col justify-center order-2 lg:order-1 transition-all duration-1000 delay-200 ${
                  isVisible.hero 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-8'
                }`}>
                  {/* Greeting Badge */}
                  <div className="inline-flex items-center gap-2 bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 w-fit">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#007BFF] rounded-full animate-pulse"></div>
                    Available for work
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[56px] font-medium leading-tight text-black">
                      Hi, I'm <span className="relative">Prabhath<span className="absolute bottom-0 left-0 w-full h-1 sm:h-2 bg-[#007BFF]/20"></span></span>
                      <br />
                      <span className="text-[#007BFF]">Subhashana</span>
                    </h1>
                    
                    {/* Animated Role Text */}
                    <div className="relative h-[40px] sm:h-[50px] lg:h-[60px] flex items-center">
                      <div className="bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg inline-flex items-center">
                        <span className="text-sm sm:text-lg lg:text-xl font-medium min-h-[1em]">
                          {displayedText}
                        </span>
                        <span className={`typewriter-cursor ml-1 transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-[16px] leading-[24px] sm:leading-[28px] tracking-[1.23px] text-gray-600 max-w-lg">
                      BSc Software Engineering undergraduate passionate about creating engaging, user-centered digital experiences with modern technologies.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                      <Link to="/projects">
                        <Button
                          variant="outline"
                          className="border-black bg-white hover:bg-black hover:text-white shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] text-sm sm:text-[16px] font-medium px-[30px] sm:px-[40px] py-[18px] sm:py-[24px] rounded-lg transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#007BFF] sm:hover:shadow-[6px_6px_0_0_#007BFF] w-full sm:w-auto"
                        >
                          View My Work
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button
                          variant="outline"
                          className="border-[#007BFF] bg-[#007BFF] text-white hover:bg-white hover:text-[#007BFF] shadow-[3px_3px_0_0_#007BFF] sm:shadow-[4px_4px_0_0_#000000] text-sm sm:text-[16px] font-medium px-[30px] sm:px-[40px] py-[18px] sm:py-[24px] rounded-lg transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#007BFF] sm:hover:shadow-[6px_6px_0_0_#007BFF] w-full sm:w-auto"
                        >
                          Get In Touch
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right side - Profile Image */}
                <div className={`relative p-6 sm:p-8 lg:p-12 xl:p-16 flex items-center justify-center order-1 lg:order-2 bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-1000 delay-400 ${
                  isVisible.hero 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-8'
                }`}>
                  {/* Animated decorative elements */}
                  <div className={`absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-[#007BFF] rounded-full transition-all duration-700 delay-600 ${
                    isVisible.hero ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}></div>
                  <div className={`absolute top-6 sm:top-8 lg:top-12 right-6 sm:right-8 lg:right-12 w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 border-2 border-black transform rotate-45 transition-all duration-700 delay-700 ${
                    isVisible.hero ? 'opacity-100 scale-100 rotate-45' : 'opacity-0 scale-0 rotate-0'
                  }`}></div>
                  <div className={`absolute bottom-6 sm:bottom-8 lg:bottom-12 left-6 sm:left-8 lg:left-12 w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 bg-black transition-all duration-700 delay-800 ${
                    isVisible.hero ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}></div>
                  
                  <div className="relative">
                    {/* Main profile image container */}
                    <div className={`relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[380px] xl:h-[380px] transition-all duration-1000 delay-500 ${
                      isVisible.hero ? 'scale-100 rotate-0' : 'scale-90 rotate-3'
                    }`}>
                      <div className="w-full h-full border-3 sm:border-4 border-black rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] overflow-hidden shadow-[4px_4px_0_0_#000] sm:shadow-[5px_5px_0_0_#000] lg:shadow-[6px_6px_0_0_#000] bg-white p-1.5 sm:p-2">
                        <div className="w-full h-full rounded-[10px] sm:rounded-[12px] overflow-hidden">
                          <OptimizedImage
                            src="/images/profile/profile.png"
                            alt="Prabhath Subhashana"
                            className="w-full h-full object-cover object-center scale-110 hover:scale-115 transition-transform duration-500"
                            priority={true}
                          />
                        </div>
                      </div>
                      
                      {/* Floating badge */}
                      <div className={`absolute -bottom-2 sm:-bottom-3 lg:-bottom-4 -right-2 sm:-right-3 lg:-right-4 bg-[#007BFF] text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-lg border-2 border-black shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] lg:shadow-[4px_4px_0_0_#000] transform rotate-3 transition-all duration-1000 delay-900 ${
                        isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}>
                        <span className="text-xs sm:text-sm font-bold">UI/UX Designer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Stats Cards */}
            <div 
              ref={statsRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            >
              {/* Experience Card */}
              <div className={`bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] p-4 sm:p-6 lg:p-8 text-center group hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 ${
                isVisible.stats 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isVisible.stats ? '100ms' : '0ms'
              }}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#007BFF] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-black transition-colors">
                  <span className="text-white font-bold text-lg sm:text-xl lg:text-2xl">2+</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-black mb-2">Years Experience</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed tracking-[1.23px]">
                  Creating digital experiences and developing frontend solutions
                </p>
              </div>

              {/* Projects Card */}
              <div className={`bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] p-4 sm:p-6 lg:p-8 text-center group hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 ${
                isVisible.stats 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isVisible.stats ? '200ms' : '0ms'
              }}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#007BFF] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-black transition-colors">
                  <span className="text-white font-bold text-lg sm:text-xl lg:text-2xl">10+</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-black mb-2">Projects Completed</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed tracking-[1.23px]">
                  Web applications, mobile apps, and design systems delivered
                </p>
              </div>

              {/* Technologies Card */}
              <div className={`bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] p-4 sm:p-6 lg:p-8 text-center group hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 sm:col-span-2 lg:col-span-1 ${
                isVisible.stats 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isVisible.stats ? '300ms' : '0ms'
              }}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#007BFF] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-black transition-colors">
                  <span className="text-white font-bold text-lg sm:text-xl lg:text-xl">15+</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-black mb-2">Technologies</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed tracking-[1.23px]">
                  Frontend frameworks, design tools, and development platforms
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center mt-8 sm:mt-12 lg:mt-16">
              <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 tracking-[1.23px]">Connect with me</p>
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <a
                  href="https://linkedin.com/in/prabhath-subhashana-6b694a20a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] sm:hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://behance.net/prabathsubasha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] sm:hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="Behance Portfolio"
                >
                  <BehanceIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://github.com/subhashana00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] sm:hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="mailto:prabathsubashana18@gmail.com"
                  className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] sm:hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  title="Email"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="bg-white h-2 sm:h-4 lg:h-8 relative z-20"></div>

      {/* Quote Section */}
      <section 
        ref={quoteRef}
        className="bg-[#FCF9F8] py-8 sm:py-12 lg:py-16 xl:py-20 relative z-10"
        style={{
          transform: `translateY(${window.innerWidth > 768 ? Math.min(scrollY * 0.02, 30) : 0}px)`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Section Header */}
            <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${
              isVisible.quote 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-[39px] font-medium leading-tight text-black mb-4 sm:mb-6">
                Design Philosophy
              </h2>
              <p className="text-sm sm:text-[16px] leading-[22px] sm:leading-[26px] lg:leading-[30px] tracking-[1.23px] text-black max-w-2xl mx-auto">
                My approach to creating meaningful digital experiences
              </p>
            </div>

            {/* Main Quote Card */}
            <div className={`bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] lg:shadow-[8px_8px_0_0_#000] overflow-hidden mb-6 sm:mb-8 lg:mb-12 transition-all duration-1000 delay-200 ${
              isVisible.quote 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-12 scale-95'
            }`}>
              <div className="p-6 sm:p-8 lg:p-12 xl:p-16 text-center">
                {/* Decorative elements */}
                <div className={`flex items-center justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8 transition-all duration-700 delay-400 ${
                  isVisible.quote ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}>
                  <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-black transform rotate-45"></div>
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-2 border-black rounded-full"></div>
                  <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-black"></div>
                </div>

                {/* Quote */}
                <blockquote className={`text-lg sm:text-xl lg:text-2xl xl:text-4xl font-medium text-black leading-tight mb-6 sm:mb-8 transition-all duration-1000 delay-600 ${
                  isVisible.quote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  "A problem well stated is a{" "}
                  <span className="relative">
                    problem
                    <span className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-[#007BFF]"></span>
                  </span>
                  <br className="hidden sm:block" />
                  half{" "}
                  <span className="bg-[#007BFF] text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                    solved
                  </span>
                  ."
                </blockquote>

                {/* Attribution */}
                <div className={`text-center transition-all duration-1000 delay-800 ${
                  isVisible.quote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <p className="text-sm sm:text-[16px] font-medium text-black mb-1 sm:mb-2">
                    — Charles Kettering
                  </p>
                  <p className="text-xs sm:text-[14px] text-gray-600 tracking-[1.23px]">
                    AMERICAN INVENTOR & ENGINEER
                  </p>
                </div>

                {/* Bottom decorative elements */}
                <div className={`flex items-center justify-center space-x-3 sm:space-x-4 mt-6 sm:mt-8 transition-all duration-700 delay-1000 ${
                  isVisible.quote ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 border-2 border-black transform rotate-45"></div>
                  <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-[#007BFF]"></div>
                </div>
              </div>
            </div>

            {/* Supporting Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Card 1 */}
              <div className={`bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] p-4 sm:p-6 lg:p-8 text-center group hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 ${
                isVisible.quote 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isVisible.quote ? '400ms' : '0ms'
              }}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-[#007BFF] transition-colors">
                  <span className="text-white font-bold text-lg sm:text-xl">01</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">Research First</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed tracking-[1.23px]">
                  Understanding users and their needs through comprehensive research and analysis.
                </p>
              </div>

              {/* Card 2 */}
              <div className={`bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] p-4 sm:p-6 lg:p-8 text-center group hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 ${
                isVisible.quote 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isVisible.quote ? '600ms' : '0ms'
              }}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-[#007BFF] transition-colors">
                  <span className="text-white font-bold text-lg sm:text-xl">02</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">Design Thinking</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed tracking-[1.23px]">
                  Applying human-centered design principles to create intuitive solutions.
                </p>
              </div>

              {/* Card 3 */}
              <div className={`bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] p-4 sm:p-6 lg:p-8 text-center group hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 sm:col-span-2 lg:col-span-1 ${
                isVisible.quote 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isVisible.quote ? '800ms' : '0ms'
              }}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-[#007BFF] transition-colors">
                  <span className="text-white font-bold text-lg sm:text-xl">03</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">Iterate & Test</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed tracking-[1.23px]">
                  Continuous improvement through testing, feedback, and refinement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="bg-[#FCF9F8] h-2 sm:h-4 lg:h-8 relative z-20"></div>

      {/* Featured Projects Section */}
      <section 
        ref={projectsRef} 
        id="projects" 
        className="bg-white py-12 sm:py-16 lg:py-[127px] relative z-10"
        style={{
          transform: `translateY(${window.innerWidth > 768 ? Math.min(scrollY * 0.01, 20) : 0}px)`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[301px]">
          {/* Section Header */}
          <div className={`mb-8 sm:mb-12 lg:mb-16 text-center lg:text-left transition-all duration-1000 ${
            isVisible.projects 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-[39px] font-medium leading-tight text-black mb-4 sm:mb-6 lg:mb-8">
              Featured projects
            </h2>
            <p className="text-sm sm:text-[16px] leading-[22px] sm:leading-[26px] lg:leading-[30px] tracking-[1.23px] text-black max-w-[654px] mx-auto lg:mx-0">
              Find out about my works: read through my case studies, have a look
              at final designs and try out prototypes I've built.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Project 1 - Swish Strokes */}
            <div className={`group transition-all duration-1000 ${
              isVisible.projects 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: isVisible.projects ? '200ms' : '0ms'
            }}>
              <div className="bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] overflow-hidden shadow-[3px_3px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] lg:shadow-[8px_8px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[8px_8px_0_0_#000] lg:hover:shadow-[12px_12px_0_0_#000] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 lg:hover:-translate-x-1 lg:hover:-translate-y-1">
                {/* Project Image */}
                <div 
                  className="relative aspect-[4/3] bg-gradient-to-br from-purple-100 to-orange-100 overflow-hidden cursor-pointer group-hover:scale-[1.02] transition-transform duration-300"
                  onClick={() => openGallery('swishstrokes')}
                >
                  <OptimizedImage 
                    src="/images/projects/swishstrokes.png" 
                    alt="Swish Strokes"
                    className="w-full h-full object-cover"
                    priority={true}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white border-2 border-black rounded-full p-3 shadow-[4px_4px_0_0_#000] transform scale-75 group-hover:scale-100">
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </div>
                  </div>
                  <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full"></div>
                  </div>
                  {/* Click indicator */}
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black text-white text-xs px-2 py-1 rounded-full font-medium tracking-[1.23px]">
                      View Gallery
                    </div>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-4 sm:p-5 lg:p-6 bg-white">
                  <h3 className="text-lg sm:text-xl lg:text-[28px] font-medium leading-tight text-black mb-2 sm:mb-3">
                    Swish Strokes
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-[14px] leading-[18px] sm:leading-[20px] lg:leading-[22px] tracking-[1.23px] text-black mb-3 sm:mb-4 line-clamp-3">
                    Mandala art coloring and music relaxation mobile app with tournaments, mood tracking, and motivational features.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile App</span>
                    <a
                      href="https://www.figma.com/design/b0qNg998YbKboek2S68FE8/Swish-Strokes?node-id=1-2&t=7lj4xH6SiD4o9CWm-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-[16px] font-bold tracking-[1.23px] text-black hover:opacity-70 transition-opacity"
                    >
                      View design
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 - CulturaJoin */}
            <div className={`group transition-all duration-1000 ${
              isVisible.projects 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: isVisible.projects ? '400ms' : '0ms'
            }}>
              <div className="bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] overflow-hidden shadow-[3px_3px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] lg:shadow-[8px_8px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[8px_8px_0_0_#000] lg:hover:shadow-[12px_12px_0_0_#000] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 lg:hover:-translate-x-1 lg:hover:-translate-y-1">
                {/* Project Image */}
                <div 
                  className="relative aspect-[4/3] bg-gradient-to-br from-blue-100 to-green-100 overflow-hidden cursor-pointer group-hover:scale-[1.02] transition-transform duration-300"
                  onClick={() => openGallery('culturajoin')}
                >
                  <OptimizedImage 
                    src="/images/projects/culturajoin.png" 
                    alt="CulturaJoin"
                    className="w-full h-full object-cover"
                    priority={true}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white border-2 border-black rounded-full p-3 shadow-[4px_4px_0_0_#000] transform scale-75 group-hover:scale-100">
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </div>
                  </div>
                  <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  {/* Click indicator */}
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black text-white text-xs px-2 py-1 rounded-full font-medium tracking-[1.23px]">
                      View Gallery
                    </div>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-4 sm:p-5 lg:p-6 bg-white">
                  <h3 className="text-lg sm:text-xl lg:text-[28px] font-medium leading-tight text-black mb-2 sm:mb-3">
                    CulturaJoin
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-[14px] leading-[18px] sm:leading-[20px] lg:leading-[22px] tracking-[1.23px] text-black mb-3 sm:mb-4 line-clamp-3">
                    Cultural and event management platform for locals, tourists, and planners. Features invitation purchases and event hosting.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Web Platform</span>
                    <a
                      href="https://www.figma.com/design/Gru9BD0mtJJNtX4rjX0Qrc/CulturaJoin?node-id=2-2&t=zHZ3XVs7k6CwharC-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-[16px] font-bold tracking-[1.23px] text-black hover:opacity-70 transition-opacity"
                    >
                      View design
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3 - Uvexzon Website Redesign */}
            <div className={`group transition-all duration-1000 ${
              isVisible.projects 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: isVisible.projects ? '600ms' : '0ms'
            }}>
              <div className="bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] overflow-hidden shadow-[3px_3px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] lg:shadow-[8px_8px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[8px_8px_0_0_#000] lg:hover:shadow-[12px_12px_0_0_#000] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 lg:hover:-translate-x-1 lg:hover:-translate-y-1">
                {/* Project Image */}
                <div 
                  className="relative aspect-[4/3] bg-gradient-to-br from-indigo-100 to-pink-100 overflow-hidden cursor-pointer group-hover:scale-[1.02] transition-transform duration-300"
                  onClick={() => openGallery('uvexzon')}
                >
                  <OptimizedImage 
                    src="/images/projects/uvex_1.png" 
                    alt="Uvexzon Website Redesign"
                    className="w-full h-full object-cover"
                    priority={true}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white border-2 border-black rounded-full p-3 shadow-[4px_4px_0_0_#000] transform scale-75 group-hover:scale-100">
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </div>
                  </div>
                  <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-500 rounded-full"></div>
                  </div>
                  {/* Click indicator */}
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black text-white text-xs px-2 py-1 rounded-full font-medium tracking-[1.23px]">
                      View Gallery
                    </div>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-4 sm:p-5 lg:p-6 bg-white">
                  <h3 className="text-lg sm:text-xl lg:text-[28px] font-medium leading-tight text-black mb-2 sm:mb-3">
                    Uvexzon Redesign
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-[14px] leading-[18px] sm:leading-[20px] lg:leading-[22px] tracking-[1.23px] text-black mb-3 sm:mb-4 line-clamp-3">
                    Complete company website redesign from research to prototyping. Modern, user-friendly interface with improved UX.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Website</span>
                    <a
                      href="https://www.figma.com/design/ytcDmDViltMj2WVPErE7zx/Uvexzon-Company-Website-Redesign?node-id=0-1&t=CY7PX8wpbpPlYgR9-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-[16px] font-bold tracking-[1.23px] text-black hover:opacity-70 transition-opacity"
                    >
                      View design
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4 - Virtual Try-on E-commerce */}
            <div className={`group transition-all duration-1000 ${
              isVisible.projects 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transitionDelay: isVisible.projects ? '800ms' : '0ms'
            }}>
              <div className="bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] lg:rounded-[20px] overflow-hidden shadow-[3px_3px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] lg:shadow-[8px_8px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[8px_8px_0_0_#000] lg:hover:shadow-[12px_12px_0_0_#000] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 lg:hover:-translate-x-1 lg:hover:-translate-y-1">
                {/* Project Image */}
                <div 
                  className="relative aspect-[4/3] bg-gradient-to-br from-red-100 to-yellow-100 overflow-hidden cursor-pointer group-hover:scale-[1.02] transition-transform duration-300"
                  onClick={() => openGallery('virtualtry')}
                >
                  <OptimizedImage 
                    src="/images/projects/virtual_10.png" 
                    alt="Virtual Try-on E-commerce Platform"
                    className="w-full h-full object-cover"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white border-2 border-black rounded-full p-3 shadow-[4px_4px_0_0_#000] transform scale-75 group-hover:scale-100">
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </div>
                  </div>
                  <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                  </div>
                  {/* Click indicator */}
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black text-white text-xs px-2 py-1 rounded-full font-medium tracking-[1.23px]">
                      View Gallery
                    </div>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-4 sm:p-5 lg:p-6 bg-white">
                  <h3 className="text-lg sm:text-xl lg:text-[28px] font-medium leading-tight text-black mb-2 sm:mb-3">
                    Virtual Try-on Platform
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-[14px] leading-[18px] sm:leading-[20px] lg:leading-[22px] tracking-[1.23px] text-black mb-3 sm:mb-4 line-clamp-3">
                    MERN stack e-commerce platform with virtual try-on technology, account management, shopping cart, and admin panel.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Web App</span>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-[16px] font-bold tracking-[1.23px] text-black hover:opacity-70 transition-opacity"
                    >
                      View project
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View All Projects Button */}
          <div className={`text-center mt-8 sm:mt-12 lg:mt-16 transition-all duration-1000 delay-1000 ${
            isVisible.projects 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <Link to="/projects">
              <Button
                variant="outline"
                className="border-black bg-white hover:bg-black hover:text-white shadow-[2px_2px_0_0_#000] sm:shadow-[3px_3px_0_0_#000] lg:shadow-[4px_4px_0_0_#000] text-sm sm:text-[16px] font-medium px-6 sm:px-8 lg:px-[50px] py-3 sm:py-4 lg:py-[20px] rounded-none inline-flex items-center gap-2"
              >
                View All Projects
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="bg-white h-2 sm:h-4 lg:h-8 relative z-20"></div>

      {/* Freelance CTA Banner */}
      <section className="bg-[#007BFF] py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[154px]">
          
          {/* Main CTA Card */}
          <div className={`bg-white border-4 border-black rounded-[20px] shadow-[8px_8px_0_0_#000] p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto transition-all duration-1000 hover:shadow-[10px_10px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 ${
            isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[#007BFF] text-white px-4 py-2 rounded-full border-2 border-black shadow-[3px_3px_0_0_#000] mb-4">
                <Zap className="w-4 h-4" />
                <span className="font-medium text-xs tracking-[1.23px]">FREELANCE SERVICES</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black mb-4 leading-tight">
                Need Custom Design Work?
              </h2>
              <p className="text-sm sm:text-base leading-relaxed tracking-[1.23px] text-gray-700 mb-6 max-w-2xl mx-auto">
                I offer professional freelance design services for startups and businesses. 
                From UI/UX design to complete brand systems, let's bring your vision to life.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
              
              {/* Fast Delivery */}
              <div className="bg-white border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] p-4 hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#007BFF] border-2 border-black rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-black transition-colors">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-black mb-2 text-center tracking-[1.23px]">Fast Delivery</h3>
                <p className="text-gray-600 text-center text-xs leading-relaxed tracking-[1.23px]">
                  Quick turnaround without compromising quality
                </p>
              </div>

              {/* Collaborative */}
              <div className="bg-white border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] p-4 hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#007BFF] border-2 border-black rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-black transition-colors">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-black mb-2 text-center tracking-[1.23px]">Collaborative</h3>
                <p className="text-gray-600 text-center text-xs leading-relaxed tracking-[1.23px]">
                  Work closely throughout the entire process
                </p>
              </div>

              {/* Quality Focus */}
              <div className="bg-white border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] p-4 hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#007BFF] border-2 border-black rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-black transition-colors">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-black mb-2 text-center tracking-[1.23px]">Quality Focus</h3>
                <p className="text-gray-600 text-center text-xs leading-relaxed tracking-[1.23px]">
                  Professional designs that drive real results
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/freelance"
                className="bg-[#007BFF] hover:bg-black text-white border-2 border-black rounded-[12px] shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#007BFF] hover:-translate-x-0.5 hover:-translate-y-0.5 px-6 py-3 font-medium text-sm tracking-[1.23px] transition-all duration-300 flex items-center gap-2 min-w-[200px] justify-center"
              >
                View Services & Pricing <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="bg-white hover:bg-gray-50 text-black border-2 border-black rounded-[12px] shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 px-6 py-3 font-medium text-sm tracking-[1.23px] transition-all duration-300 flex items-center gap-2 min-w-[200px] justify-center"
              >
                Get a Free Quote <MessageCircle className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="bg-[#007BFF] h-2 sm:h-4 lg:h-8 relative z-20"></div>

      {/* Footer */}
      <footer className="bg-white border-t border-black relative z-10">
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

      {/* Gallery Modal */}
      {isGalleryOpen && currentProject && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2">
          <div className="relative w-full h-full max-w-7xl max-h-[98vh] bg-black rounded-[20px] overflow-hidden shadow-[12px_12px_0_0_rgba(255,255,255,0.2)] animate-in fade-in-0 zoom-in-95 duration-300">
            
            {/* Header - Compact and floating */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-black shadow-[4px_4px_0_0_#000]">
                <h3 className="text-sm sm:text-base font-medium text-black tracking-[1.23px]">
                  {currentProject.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <span className="text-xs sm:text-sm text-black font-medium bg-gray-100 px-2 py-1 rounded-full">
                  {currentImageIndex + 1}/{projectGalleries[currentProject as keyof typeof projectGalleries]?.length || 0}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAutoPlay}
                  className="w-10 h-10 bg-white/95 backdrop-blur-sm border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200 shadow-[3px_3px_0_0_#000]"
                  title={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                  {isAutoPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={closeGallery}
                  className="w-10 h-10 bg-white/95 backdrop-blur-sm border-2 border-black rounded-full flex items-center justify-center hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-200 shadow-[3px_3px_0_0_#000]"
                  title="Close gallery"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image - Full Space */}
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {projectGalleries[currentProject as keyof typeof projectGalleries] && (
                <img
                  src={projectGalleries[currentProject as keyof typeof projectGalleries][currentImageIndex]}
                  alt={`${currentProject} image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              )}
              
              {/* Navigation Arrows - Larger and more prominent */}
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-white/95 backdrop-blur-sm border-2 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:bg-black hover:text-white transition-all duration-200"
                title="Previous image"
              >
                <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-white/95 backdrop-blur-sm border-2 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:bg-black hover:text-white transition-all duration-200"
                title="Next image"
              >
                <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
              </button>

              {/* Auto-play indicator - Bottom center */}
              {isAutoPlaying && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm font-medium tracking-[1.23px] border-2 border-black shadow-[4px_4px_0_0_#000]">
                  Auto-play ON
                </div>
              )}
            </div>

            {/* Thumbnail Strip - Bottom overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-sm border-2 border-black rounded-[16px] p-3 shadow-[6px_6px_0_0_#000] max-w-[90%]">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {projectGalleries[currentProject as keyof typeof projectGalleries]?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-12 h-9 sm:w-14 sm:h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                      index === currentImageIndex 
                        ? 'border-black bg-black p-0.5' 
                        : 'border-gray-400 hover:border-black'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${currentProject} thumbnail ${index + 1}`}
                      className={`w-full h-full object-cover rounded ${
                        index === currentImageIndex ? 'rounded-sm' : 'rounded-md'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <WhatsAppFloat 
        phoneNumber="+94716903566"
        message="Hi Prabhath! I'm interested in your UI/UX design services. Can we discuss my project?"
      />
    </div>
  );
}
