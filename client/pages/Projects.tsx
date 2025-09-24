import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Menu, X, ExternalLink, Linkedin, Mail, Github, ChevronLeft, ChevronRight, Play, Pause, Eye } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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

// Helper functions for project card styling
const getProjectGradient = (id: number) => {
  const gradients = [
    "bg-gradient-to-br from-purple-400 to-orange-400",
    "bg-gradient-to-br from-blue-400 to-green-400", 
    "bg-gradient-to-br from-indigo-400 to-pink-400",
    "bg-gradient-to-br from-red-400 to-yellow-400",
    "bg-gradient-to-br from-green-400 to-blue-400",
    "bg-gradient-to-br from-pink-400 to-purple-400",
    "bg-gradient-to-br from-yellow-400 to-red-400",
    "bg-gradient-to-br from-cyan-400 to-blue-400",
    "bg-gradient-to-br from-emerald-400 to-teal-400",
    "bg-gradient-to-br from-violet-400 to-purple-400"
  ];
  return gradients[(id - 1) % gradients.length];
};

const getProjectDotColor = (id: number) => {
  const colors = [
    "bg-purple-500",
    "bg-blue-500",
    "bg-indigo-500", 
    "bg-red-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-cyan-500",
    "bg-emerald-500",
    "bg-violet-500"
  ];
  return colors[(id - 1) % colors.length];
};

const getProjectInitials = (name: string) => {
  return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
};

// Project gallery images
const projectGalleries: { [key: string]: string[] } = {
  'swish-strokes': [
    '/images/projects/swishstrokes.png',
    '/images/projects/swish_1.jpeg',
    '/images/projects/swish_2.jpeg',
    '/images/projects/swish_3.jpeg',
    '/images/projects/swish_4.png',
  ],
  'culturajoin': [
    '/images/projects/culturajoin.png',
    '/images/projects/cult_1.png',
    '/images/projects/cult_3.png',
    '/images/projects/cult_4.png',
    '/images/projects/cult_5.png',
  ],
  'uvexzon-website-redesign': [
     '/images/projects/uvex_2.png',
     '/images/projects/uvex_1.png',
     '/images/projects/uvex_3.png',
     '/images/projects/uvex_4.png',
     '/images/projects/uvex_5.png',
  ],
  'virtual-try-on-ecommerce': [
    '/images/projects/virtual_1.png',
    '/images/projects/virtual_2.png',
    '/images/projects/virtual_3.png',
    '/images/projects/virtual_4.png',
    '/images/projects/virtual_10.png',
  ],
  'combank-app-redesign': [
    '/images/projects/com_1.png',
    '/images/projects/com_2.png',
    '/images/projects/com_3.png',
    '/images/projects/com_4.png',
    '/images/projects/com_5.png',
  ],
  'coffee-shop-mobile-app': [
    '/images/projects/coffeeapp_1.png',
    '/images/projects/coffeeapp_2.png',
    '/images/projects/coffeeapp_3.png',
    '/images/projects/coffeeapp_4.png',
    '/images/projects/coffeeapp_5.png',
  ],
  'real-estate-germany-website': [
    '/images/projects/real_s1.png',
    '/images/projects/real_s2.png',
    '/images/projects/real_s3.png',
    '/images/projects/real_s4.png',
    '/images/projects/real_s5.png',
  ],
  'restaurant-website-gallery-cafe': [
    '/images/projects/gallery_2.jpg',
    '/images/projects/gallery_3.jpg',
    '/images/projects/gallery_4.png',
    '/images/projects/gallery_5.jpg',
  ],
  'messiah-foundation-website': [
    '/images/projects/messa_1.png',
    '/images/projects/messa_2.png',
    '/images/projects/messa_3.png',
    '/images/projects/messa_4.png',
    '/images/projects/messa_5.png',
  ],
  'aquarium-homepage-redesign': [
    '/images/projects/aqua_1.png',
    '/images/projects/aqua_4.png',
    '/images/projects/aqua_2.png',
    '/images/projects/aqua_3.png',
  ],
  'carhub': [
    '/images/projects/car_1.png',
    '/images/projects/car_3.png',
    '/images/projects/car_2.png',
    '/images/projects/car_8.png',
    '/images/projects/car_6.png',
  ],
};

// Sample project data with Prabhath's real projects
const projectsData = [
  {
    id: 1,
    slug: 'swish-strokes',
    name: "Swish Strokes",
    description: "Mandala art coloring and music relaxation mobile app with tournaments, mood tracking, and motivational features. Includes landing page design.",
    image: "/images/projects/swishstrokes.png",
    logo: "",
    type: "App",
    industry: "Health & Wellness",
    links: {
      design: "https://www.figma.com/design/b0qNg998YbKboek2S68FE8/Swish-Strokes?node-id=1-2&t=7lj4xH6SiD4o9CWm-1",
      caseStudy: "https://www.figma.com/design/LgofmkbLsKLSai0tFhzCgr/Swish-Stroke-Case-Study?node-id=0-1&t=rVm4Zl935YHhYFZf-1"
    }
  },
  {
    id: 2,
    slug: 'culturajoin',
    name: "CulturaJoin",
    description: "Cultural and event management platform for locals, tourists, and planners. Features invitation purchases and event hosting capabilities.",
    image: "/images/projects/culturajoin.png",
    logo: "",
    type: "Web",
    industry: "Events & Tourism",
    links: {
      design: "https://www.figma.com/design/Gru9BD0mtJJNtX4rjX0Qrc/CulturaJoin?node-id=2-2&t=zHZ3XVs7k6CwharC-1"
    }
  },
  {
    id: 3,
    slug: 'uvexzon-website-redesign',
    name: "Uvexzon Website Redesign",
    description: "Complete company website redesign from research to prototyping. Modern, user-friendly interface with improved user experience.",
    image: "/images/projects/uvex_2.png",
    logo: "",
    type: "Web",
    industry: "Technology",
    links: {
      design: "https://www.figma.com/design/ytcDmDViltMj2WVPErE7zx/Uvexzon-Company-Website-Redesign?node-id=0-1&t=CY7PX8wpbpPlYgR9-1"
    }
  },
  {
    id: 4,
    slug: 'virtual-try-on-ecommerce',
    name: "Virtual Try-on E-commerce",
    description: "MERN stack e-commerce platform with virtual try-on technology, account management, shopping cart, and admin panel.",
    image: "/images/projects/virtual_10.png",
    logo: "",
    type: "Web",
    industry: "E-commerce",
    links: {
      github: "https://github.com/subhashana00"
    }
  },
  {
    id: 5,
    slug: 'combank-app-redesign',
    name: "ComBank App Redesign",
    description: "Redesigned the ComBank Digital App as a practice project to enhance UI/UX skills. Focused on simplifying navigation and modern layout.",
    image: "/images/projects/com_1.png",
    logo: "",
    type: "App",
    industry: "Banking",
    links: {
      design: "https://www.figma.com/design/k7tsMbAE76tJXP7NVf9742/ComBank---Redesign?node-id=0-1&t=qmQqRyWLjLRM95gi-1",
      caseStudy: "https://www.figma.com/design/k7tsMbAE76tJXP7NVf9742/ComBank---Redesign?node-id=1-20060&t=qmQqRyWLjLRM95gi-1"
    }
  },
  {
    id: 6,
    slug: 'coffee-shop-mobile-app',
    name: "Coffee Shop Mobile App",
    description: "Mobile app UI including login, home, product categories, item details, cart, and delivery options with seamless navigation.",
    image: "/images/projects/coffeeapp_1.png",
    logo: "",
    type: "App",
    industry: "Food & Beverage",
    links: {
      design: "https://www.figma.com/design/npHOZYLrjNKd1WizZYLfZQ/Coffee-Shop-Mobile-App?node-id=106-411&t=uDSS3DltK6rL8yOF-1"
    }
  },
  {
    id: 7,
    slug: 'real-estate-germany-website',
    name: "Real Estate Germany Website",
    description: "Redesigned prototypes (desktop and mobile) in German language for improved usability and client requirements.",
    image: "/images/projects/real_s2.png",
    logo: "",
    type: "Web",
    industry: "Real Estate",
    links: {
      design: "https://www.figma.com/design/5JksimZNVkXaxURfMRj0cO/Real-Estate-Germany-Web?node-id=0-1&t=dxlBtq7PLrdgvhAa-1"
    }
  },
  {
    id: 8,
    slug: 'restaurant-website-gallery-cafe',
    name: "Restaurant Website (Gallery Café)",
    description: "Dynamic restaurant platform with table reservations, food ordering, and user registration using ASP.NET MVC.",
    image: "/images/projects/gallery_2.jpg",
    logo: "",
    type: "Web",
    industry: "Food & Beverage",
    links: {
      github: "https://github.com/subhashana00"
    }
  },
  {
    id: 9,
    slug: 'messiah-foundation-website',
    name: "Messiah Foundation Website Redesign",
    description: "Produced web and mobile design improvements for usability and branding alignment with modern interface design.",
    image: "/images/projects/messa_1.png",
    logo: "",
    type: "Web",
    industry: "Charity Organizations",
    links: {
      design: "https://www.figma.com/design/Bp8QrjS7zCic9BKuzLAhXc/Messiah-Foundation-Website?node-id=0-1&t=WLQCeHNttgg9hwiH-1"
    }
  },
  {
    id: 10,
    slug: 'aquarium-homepage-redesign',
    name: "Aquarium Homepage Redesign",
    description: "Developed a refreshed homepage design with focus on clean layout and user navigation for enhanced user experience.",
    image: "/images/projects/aqua_1.png",
    logo: "",
    type: "Web",
    industry: "Entertainment",
    links: {
      design: "https://www.figma.com/design/0EzOu4Bzf5JZUep25ZCB4F/Aquarium-Homepage-Redesign?node-id=0-1&t=dUfUFOAPZEGmmhrD-1"
    }
  },
  {
    id: 11,
    slug: 'carhub',
    name: "CarHub",
    description: "Car marketplace website UI design for buying, selling, and reserving cars. Features include advanced search filters, car valuation, featured deals, brand highlights, popular stories, and subscription to the latest car news.",
    image: "/images/projects/car_1.png",
    logo: "",
    type: "Web",
    industry: "Automotive",
    links: {
      design: "https://www.figma.com/design/mYcxMjWHMx7tcLx11CYkjo/Carhub-Website?node-id=16-486&t=dlBRavFOBxx5ABGk-1"
    }
  }
];

export default function Projects() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6; // Number of projects per page
  
  // Gallery states
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Scroll detection states
  const [showVerticalNav, setShowVerticalNav] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  
  const heroRef = useRef<HTMLElement>(null);

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      const windowWidth = window.innerWidth;
      
      // Update mobile state
      setIsMobile(windowWidth < 768);
      
      // Calculate scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / scrollHeight) * 100;
      
      setScrollDirection(direction);
      setScrollProgress(Math.min(progress, 100));
      setLastScrollY(currentScrollY);
      
      // Show vertical nav when scrolling down and past 100px - ONLY on desktop
      if (currentScrollY > 100 && direction === 'down' && windowWidth >= 768) {
        setShowVerticalNav(true);
      } else if (direction === 'up' || windowWidth < 768) {
        setShowVerticalNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Auto-carousel for gallery
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGalleryOpen && isAutoPlaying && currentProject) {
      interval = setInterval(() => {
        const projectImages = projectGalleries[currentProject];
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

  // Gallery helper functions
  const openGallery = (projectSlug: string) => {
    setCurrentProject(projectSlug);
    setCurrentImageIndex(0);
    setIsAutoPlaying(true);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setCurrentProject('');
    setCurrentImageIndex(0);
    setIsAutoPlaying(false);
  };

  const nextImage = () => {
    if (currentProject) {
      const projectImages = projectGalleries[currentProject];
      if (projectImages) {
        setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
      }
    }
  };

  const prevImage = () => {
    if (currentProject) {
      const projectImages = projectGalleries[currentProject];
      if (projectImages) {
        setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
      }
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
  };

  // Filter projects based on selected filters
  const filteredProjects = projectsData.filter(project => {
    const typeMatch = typeFilter === "all" || project.type === typeFilter;
    const industryMatch = industryFilter === "all" || project.industry === industryFilter;
    return typeMatch && industryMatch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const resetFilters = () => {
    setTypeFilter("all");
    setIndustryFilter("all");
    setCurrentPage(1); // Reset to first page when filters are cleared
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, industryFilter]);

  // Pagination helper functions
  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of projects section when page changes
    const projectsSection = document.getElementById('projects-content');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter((page, index, array) => array.indexOf(page) === index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Paint Brush Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-transparent z-50 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 transition-all duration-300 ease-out relative overflow-hidden"
          style={{ 
            width: `${scrollProgress}%`,
            clipPath: scrollProgress > 0 ? 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' : 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
          }}
        >
          <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-b from-orange-500 to-red-600 transform skew-x-12 opacity-80"></div>
          <div 
            className="absolute right-2 top-full w-1 bg-red-500 transition-all duration-300 ease-out origin-top"
            style={{ 
              height: scrollProgress > 10 ? '8px' : '0px',
              transform: `scaleY(${Math.min(scrollProgress / 10, 1)})` 
            }}
          ></div>
        </div>
      </div>

      {/* Header */}
      <header className={`bg-[#FCF9F8] px-4 sm:px-6 lg:px-[154px] py-4 sm:py-6 lg:py-[31px] z-50 ${
        isMobile ? 'sticky top-0' : 'relative'
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
              className="text-white text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-black bg-purple-600 shadow-[3px_3px_0_0_#000000] -translate-x-0.5 -translate-y-0.5 transition-all duration-300"
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
                className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Me
              </Link>
              <Link
                to="/projects"
                className="text-[#007BFF] text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-[#007BFF] bg-white shadow-[3px_3px_0_0_#007BFF] transition-all duration-300"
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
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="About Me"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium group-hover:text-white">About</span>
            </Link>
            <Link
              to="/projects"
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-[#007BFF] bg-[#007BFF] text-white rounded-lg hover:bg-white hover:text-[#007BFF] transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="Projects"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium">Projects</span>
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

      {/* Projects Content Section */}
      <section ref={heroRef} id="projects-content" className="bg-white py-12 sm:py-16 lg:py-[127px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[154px]">
          {/* Section Header */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-[39px] font-medium leading-[28px] sm:leading-[33px] text-black mb-6 sm:mb-8 text-center lg:text-left">
              Featured projects
            </h2>
            <p className="text-[14px] sm:text-[16px] leading-[26px] sm:leading-[30px] tracking-[1.23px] text-black max-w-[654px] mb-6 sm:mb-8 text-center lg:text-left mx-auto lg:mx-0">
              Find out about my works: read through my case studies, have a look at final designs and try out prototypes I've built.
            </p>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-start sm:items-center mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <span className="text-[14px] sm:text-[16px] font-medium text-black min-w-[40px]">Type:</span>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[150px] border-black rounded-none focus:ring-0 focus:border-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="App">App</SelectItem>
                    <SelectItem value="Web">Web</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <span className="text-[14px] sm:text-[16px] font-medium text-black min-w-[60px]">Industry:</span>
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="w-full sm:w-[200px] border-black rounded-none focus:ring-0 focus:border-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="Automotive">Automotive</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                    <SelectItem value="Banking">Banking</SelectItem>
                    <SelectItem value="Events & Tourism">Events & Tourism</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Charity Organizations">Charity Organizations</SelectItem>
                    <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(typeFilter !== "all" || industryFilter !== "all") && (
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="border-black bg-white hover:bg-black hover:text-white shadow-[2px_2px_0_0_#000] text-[14px] font-normal px-[20px] py-[10px] rounded-none"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            <div className="text-[12px] sm:text-[14px] text-gray-600 mb-6 sm:mb-8 text-center lg:text-left">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
              {totalPages > 1 && (
                <span className="ml-2">• Page {currentPage} of {totalPages}</span>
              )}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-8">
            {currentProjects.map((project) => (
              <div key={project.id} className="group">
                <div className="bg-white border-2 border-black rounded-[20px] overflow-hidden shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1">
                  {/* Project Image */}
                  <div 
                    className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden cursor-pointer group-hover:scale-[1.02] transition-transform duration-300"
                    onClick={() => openGallery(project.slug)}
                  >
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="p-8 flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className={`w-20 h-20 ${getProjectGradient(project.id)} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                            <span className="text-white font-bold text-2xl">{getProjectInitials(project.name)}</span>
                          </div>
                          <h4 className="text-xl font-bold text-gray-800 mb-1">{project.name}</h4>
                          <p className="text-sm text-gray-600">{project.type} • {project.industry}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Gallery overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white border-2 border-black rounded-full p-3 shadow-[4px_4px_0_0_#000] transform scale-75 group-hover:scale-100">
                        <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <div className={`w-3 h-3 ${getProjectDotColor(project.id)} rounded-full`}></div>
                    </div>
                    
                    {/* Click indicator */}
                    <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black text-white text-xs px-2 py-1 rounded-full font-medium tracking-[1.23px]">
                        View Gallery
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6 bg-white">
                    <h3 className="text-[24px] sm:text-[28px] font-medium leading-[26px] sm:leading-[30px] text-black mb-3">
                      {project.name}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] tracking-[1.23px] text-black mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{project.type}</span>
                      <div className="flex gap-3">
                        {project.links.design && (
                          <a
                            href={project.links.design}
                            className="inline-flex items-center gap-1 text-[14px] sm:text-[15px] font-bold tracking-[1.23px] text-black hover:opacity-70 transition-opacity"
                          >
                            View design
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        )}
                        {project.links.caseStudy && (
                          <a
                            href={project.links.caseStudy}
                            className="inline-flex items-center gap-1 text-[14px] sm:text-[15px] font-bold tracking-[1.23px] text-black hover:opacity-70 transition-opacity"
                          >
                            Case study
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[14px] sm:text-[15px] font-bold tracking-[1.23px] text-black hover:opacity-70 transition-opacity"
                          >
                            GitHub
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {currentProjects.length === 0 && (
            <div className="text-center py-12 sm:py-16 col-span-full">
              <p className="text-[14px] sm:text-[16px] leading-[26px] sm:leading-[30px] tracking-[1.23px] text-gray-500 mb-6">
                No projects found matching the selected filters.
              </p>
              <Button
                variant="outline"
                onClick={resetFilters}
                className="border-black bg-white hover:bg-black hover:text-white shadow-[2px_2px_0_0_#000] text-[16px] font-medium px-[50px] py-[20px] rounded-none"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && currentProjects.length > 0 && (
            <div className="col-span-full mt-12 sm:mt-16">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* Page Info */}
                <div className="text-[14px] text-gray-600 tracking-[1.23px] order-2 sm:order-1">
                  Page {currentPage} of {totalPages} • {filteredProjects.length} total projects
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2 order-1 sm:order-2">
                  
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 border-2 border-black rounded-lg font-medium text-[14px] tracking-[1.23px] transition-all duration-200 ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-black hover:text-white shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5'
                    }`}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getVisiblePages().map((page, index) => (
                      <div key={index}>
                        {page === '...' ? (
                          <span className="px-3 py-2 text-gray-400 text-[14px]">...</span>
                        ) : (
                          <button
                            onClick={() => goToPage(page as number)}
                            className={`w-10 h-10 border-2 rounded-lg font-medium text-[14px] transition-all duration-200 ${
                              currentPage === page
                                ? 'bg-black text-white border-black shadow-[2px_2px_0_0_#333]'
                                : 'bg-white text-black border-black hover:bg-black hover:text-white shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5'
                            }`}
                          >
                            {page}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 border-2 border-black rounded-lg font-medium text-[14px] tracking-[1.23px] transition-all duration-200 ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-black hover:text-white shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
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

      {/* Gallery Modal */}
      {isGalleryOpen && currentProject && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2">
          <div className="relative w-full h-full max-w-7xl max-h-[98vh] bg-black rounded-[20px] overflow-hidden shadow-[12px_12px_0_0_rgba(255,255,255,0.2)] animate-in fade-in-0 zoom-in-95 duration-300">
            
            {/* Header - Compact and floating */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-black shadow-[4px_4px_0_0_#000]">
                <h3 className="text-sm sm:text-base font-medium text-black tracking-[1.23px]">
                  {projectsData.find(p => p.slug === currentProject)?.name || currentProject}
                </h3>
                <span className="text-xs sm:text-sm text-black font-medium bg-gray-100 px-2 py-1 rounded-full">
                  {currentImageIndex + 1}/{projectGalleries[currentProject]?.length || 0}
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
              {projectGalleries[currentProject] && (
                <img
                  src={projectGalleries[currentProject][currentImageIndex]}
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
                {projectGalleries[currentProject]?.map((image, index) => (
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
    </div>
  );
}
