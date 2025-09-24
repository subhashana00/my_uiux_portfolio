import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  MessageCircle, 
  Clock, 
  FileText, 
  Users, 
  Zap,
  Search,
  Palette,
  Smartphone,
  Monitor,
  Code,
  BarChart3,
  Shield,
  Mail,
  Calendar,
  Award,
  Quote,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Github,
  Menu,
  X,
  ExternalLink,
  Eye
} from 'lucide-react';
import WhatsAppFloat from "@/components/WhatsAppFloat";

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

// Sample project data from Projects page (showing first 6 projects)
const featuredProjectsData = [
  {
    id: 1,
    slug: 'swish-strokes',
    name: "Swish Strokes",
    description: "Mandala art coloring and music relaxation mobile app with tournaments, mood tracking, and motivational features. Includes landing page design.",
    image: "/images/projects/swishstrokes.png",
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
    type: "App",
    industry: "Food & Beverage",
    links: {
      design: "https://www.figma.com/design/npHOZYLrjNKd1WizZYLfZQ/Coffee-Shop-Mobile-App?node-id=106-411&t=uDSS3DltK6rL8yOF-1"
    }
  }
];

const Freelance = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [showVerticalNav, setShowVerticalNav] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    services: false,
    workflow: false,
    portfolio: false,
    testimonials: false,
    faq: false,
    cta: false
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      project: "Mobile App Design",
      rating: 5,
      testimonial: "Prabhath delivered an exceptional mobile app design that exceeded our expectations. The user experience is seamless and our users love it!",
      avatar: "/placeholder.svg"
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      project: "Website Redesign", 
      rating: 5,
      testimonial: "Our website conversion rate increased by 40% after the redesign. Professional work, great communication, and delivered on time.",
      avatar: "/placeholder.svg"
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, StartupCo",
      project: "Landing Page Design",
      rating: 5,
      testimonial: "The landing page design was exactly what we needed. Clean, modern, and perfectly captures our brand identity.",
      avatar: "/placeholder.svg"
    }
  ];

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
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Also check on resize
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          if (target === heroRef.current) setIsVisible(prev => ({ ...prev, hero: true }));
          if (target === servicesRef.current) setIsVisible(prev => ({ ...prev, services: true }));
          if (target === workflowRef.current) setIsVisible(prev => ({ ...prev, workflow: true }));
          if (target === portfolioRef.current) setIsVisible(prev => ({ ...prev, portfolio: true }));
          if (target === testimonialsRef.current) setIsVisible(prev => ({ ...prev, testimonials: true }));
          if (target === faqRef.current) setIsVisible(prev => ({ ...prev, faq: true }));
          if (target === ctaRef.current) setIsVisible(prev => ({ ...prev, cta: true }));
        }
      });
    }, observerOptions);

    const refs = [heroRef, servicesRef, workflowRef, portfolioRef, testimonialsRef, faqRef, ctaRef];
    refs.forEach(ref => ref.current && observer.observe(ref.current));

    return () => observer.disconnect();
  }, []);

  // Auto-play carousel functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Carousel navigation functions
  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const services = [
    {
      id: "ui-design",
      icon: <Monitor className="w-6 h-6" />,
      title: "UI Design for Websites",
      description: "Modern, responsive website interfaces that convert visitors into customers with professional design and user experience.",
      price: "Starting from $110",
      priceValue: 110,
      features: [
        "Mobile-first responsive design",
        "3-5 pages included",
        "Modern UI components",
        "Cross-browser compatibility",
        "Fast loading optimization",
        "2 rounds of revisions",
        "Source files included",
        "Basic SEO setup"
      ]
    },
    {
      id: "mobile-app",
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile App UI/UX",
      description: "Intuitive mobile experiences that users love and engage with daily, designed for iOS and Android platforms.",
      price: "Starting from $155",
      priceValue: 155,
      features: [
        "10+ screens included",
        "Interactive prototype",
        "User flow diagrams",
        "iOS & Android guidelines",
        "Micro-interactions design",
        "Accessibility considerations",
        "3 rounds of revisions",
        "Design handoff documentation"
      ]
    },
    {
      id: "website-redesign",
      icon: <Code className="w-6 h-6" />,
      title: "Website Redesign",
      description: "Transform your existing website into a modern, high-converting experience with improved UX and performance.",
      price: "Starting from $250",
      priceValue: 250,
      features: [
        "Complete UX audit included",
        "Conversion optimization",
        "SEO-friendly structure",
        "Performance improvements",
        "Content strategy guidance",
        "A/B testing setup",
        "Unlimited revisions",
        "Migration support"
      ]
    },
    {
      id: "landing-pages",
      icon: <Zap className="w-6 h-6" />,
      title: "Landing Pages",
      description: "High-converting landing pages designed to maximize your campaign results and drive business growth.",
      price: "Starting from $60",
      priceValue: 60,
      features: [
        "Conversion-focused design",
        "A/B test variations",
        "Fast 48-72hr delivery",
        "Mobile optimization",
        "Lead capture forms",
        "Analytics integration",
        "1 round of revisions",
        "Performance optimization"
      ]
    },
    {
      id: "wireframing",
      icon: <FileText className="w-6 h-6" />,
      title: "Wireframing & Prototyping",
      description: "Detailed wireframes and interactive prototypes to validate your ideas before development begins.",
      price: "Starting from $60",
      priceValue: 60,
      features: [
        "Low & high-fidelity wireframes",
        "Interactive prototypes",
        "User flow documentation",
        "Clickable demonstrations",
        "User testing scenarios",
        "Navigation structure",
        "Content strategy outline",
        "Developer handoff notes"
      ]
    },
    {
      id: "design-systems",
      icon: <Palette className="w-6 h-6" />,
      title: "Design Systems",
      description: "Comprehensive design systems and style guides for consistent branding across all your digital platforms.",
      price: "Starting from $310",
      priceValue: 310,
      features: [
        "Complete component library",
        "Typography guidelines",
        "Color palette system",
        "Icon set creation",
        "Spacing & grid system",
        "Brand guidelines document",
        "Usage documentation",
        "Developer resources"
      ]
    }
  ];

  const workflow = [
    {
      step: "01",
      title: "Discovery & Requirements",
      description: "We discuss your goals, target audience, and project requirements in detail.",
      icon: <Search className="w-8 h-8" />
    },
    {
      step: "02", 
      title: "Research & Wireframes",
      description: "I research your industry and create wireframes to map out the user experience.",
      icon: <FileText className="w-8 h-8" />
    },
    {
      step: "03",
      title: "Visual Design & Prototyping", 
      description: "Transform wireframes into beautiful, interactive designs that match your brand.",
      icon: <Palette className="w-8 h-8" />
    },
    {
      step: "04",
      title: "Feedback & Revisions",
      description: "We collaborate to refine the design based on your feedback and requirements.",
      icon: <MessageCircle className="w-8 h-8" />
    },
    {
      step: "05",
      title: "Final Handover",
      description: "Receive all design files, assets, and documentation for development.",
      icon: <CheckCircle className="w-8 h-8" />
    }
  ];

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity. Simple landing pages take 3-5 days, while comprehensive website designs take 2-3 weeks. I'll provide a detailed timeline during our initial consultation."
    },
    {
      question: "How many revisions are included?",
      answer: "Each package includes a specific number of revisions (detailed in the service description). Additional revisions can be purchased at $50 per round. I work closely with clients to minimize the need for extensive revisions."
    },
    {
      question: "What tools do you use?",
      answer: "I primarily use Figma for design and prototyping, Adobe Creative Suite for graphics, and various research tools for UX analysis. All deliverables are provided in industry-standard formats."
    },
    {
      question: "Do you provide source files?",
      answer: "Yes! You'll receive all source files including Figma files, exported assets in multiple formats (PNG, SVG, etc.), and comprehensive style guides and documentation."
    },
    {
      question: "What's your payment and refund policy?",
      answer: "I require 50% upfront and 50% upon completion. If you're not satisfied with the initial concepts, I offer a full refund within the first week of the project start date."
    },
    {
      question: "Do you work with development teams?",
      answer: "Absolutely! I frequently collaborate with development teams and provide detailed specifications, assets, and support during the implementation phase to ensure pixel-perfect results."
    }
  ];

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
    <div className="min-h-screen bg-[#FCF9F8]">
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
            <Link
              to="/freelance"
              className="text-[#007BFF] text-[14px] lg:text-[16px] font-normal tracking-[1.23px] px-4 lg:px-6 py-2 lg:py-3 rounded-lg border-2 border-[#007BFF] bg-white shadow-[3px_3px_0_0_#007BFF] -translate-x-0.5 -translate-y-0.5 transition-all duration-300"
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
                className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/freelance"
                className="text-[#007BFF] text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-[#007BFF] bg-white shadow-[3px_3px_0_0_#007BFF] transition-all duration-300"
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
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="Projects"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium group-hover:text-white">Projects</span>
            </Link>
            <Link
              to="/freelance"
              className="flex items-center justify-center px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border-2 border-[#007BFF] bg-[#007BFF] text-white rounded-lg hover:bg-white hover:text-[#007BFF] transition-colors group min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
              title="Freelance"
            >
              <span className="text-xs sm:text-xs lg:text-xs font-medium">Freelance</span>
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
      <section ref={heroRef} className="relative bg-[#FCF9F8] py-16 sm:py-20 lg:py-24 xl:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-black rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-[#007BFF] rounded-lg rotate-12"></div>
          <div className="absolute bottom-20 left-20 w-20 h-20 border-2 border-[#007BFF] rounded-lg -rotate-12"></div>
          <div className="absolute bottom-10 right-10 w-28 h-28 border-2 border-black rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[301px] relative z-10">
          <div className="max-w-5xl mx-auto">
            
            {/* Hero Content */}
            <div className={`transition-all duration-1000 ${
              isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white border-2 border-black rounded-full px-4 py-2 mb-6 shadow-[2px_2px_0_0_#000]">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-black tracking-[1.23px]">
                  Available for Projects
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-6 sm:mb-8 leading-tight tracking-[1.23px]">
                Freelance Design{" "}
                <span className="relative">
                  <span className="relative z-10">That Converts</span>
                  <div className="absolute -bottom-2 left-0 w-full h-4 bg-[#007BFF] -rotate-1 opacity-80"></div>
                </span>
              </h1>

              {/* Subtitle with Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <p className="text-lg sm:text-xl lg:text-2xl text-black mb-6 leading-relaxed tracking-[1.23px]">
                    I help <span className="font-semibold text-[#007BFF]">startups & businesses</span> create 
                    stunning digital experiences that turn visitors into customers. From concept to conversion.
                  </p>
                  <p className="text-sm sm:text-[16px] leading-[22px] sm:leading-[26px] tracking-[1.23px] text-gray-600 max-w-2xl">
                    Strategic design approach focused on user experience and business goals. 
                    Every pixel serves a purpose, every interaction drives results.
                  </p>
                </div>
                
                {/* Quick Stats */}
                <div className="bg-white border-2 border-black rounded-[15px] shadow-[3px_3px_0_0_#000] p-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#007BFF] tracking-[1.23px]">50+</div>
                      <div className="text-xs text-gray-600 tracking-[1.23px]">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#007BFF] tracking-[1.23px]">98%</div>
                      <div className="text-xs text-gray-600 tracking-[1.23px]">Satisfaction</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#007BFF] tracking-[1.23px]">24h</div>
                      <div className="text-xs text-gray-600 tracking-[1.23px]">Response</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#007BFF] tracking-[1.23px]">2-3w</div>
                      <div className="text-xs text-gray-600 tracking-[1.23px]">Delivery</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Value Propositions */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white border border-black rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-black tracking-[1.23px]">Fixed Pricing</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-black rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-black tracking-[1.23px]">Fast Turnaround</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-black rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-black tracking-[1.23px]">Unlimited Revisions*</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-black rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-black tracking-[1.23px]">100% Satisfaction</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-start mb-8">
                <Link
                  to="/contact"
                  className="bg-[#007BFF] hover:bg-[#0056b3] text-white border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 px-8 py-4 font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 min-w-[200px] tracking-[1.23px]"
                >
                  Start Your Project <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="mailto:prabathsubashana18@gmail.com"
                  className="bg-white hover:bg-gray-50 text-black border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 px-8 py-4 font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 min-w-[200px] tracking-[1.23px]"
                >
                  Book Free Consultation <Calendar className="w-5 h-5" />
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-2 tracking-[1.23px]">5.0 from 50+ clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600 tracking-[1.23px]">Money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600 tracking-[1.23px]">3 years experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#007BFF] to-purple-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-10 blur-3xl"></div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="bg-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-10 w-16 h-16 border-2 border-[#007BFF] rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-20 h-20 bg-black rounded-lg rotate-45"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-[#007BFF] rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[301px] relative z-10">
          
          {/* Section Header */}
          <div className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${
            isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center gap-2 bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-full px-6 py-2 mb-6">
              <BarChart3 className="w-4 h-4 text-[#007BFF]" />
              <span className="text-sm font-medium text-[#007BFF] tracking-[1.23px]">
                Professional Services
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-bold text-black mb-6 leading-tight">
              Services & <span className="text-[#007BFF]">Pricing</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed tracking-[0.5px]">
              Transparent pricing, exceptional quality. Choose the perfect service package 
              to transform your digital presence and drive real business results.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative bg-white border-2 border-black rounded-[20px] shadow-[6px_6px_0_0_#000] p-6 hover:shadow-[8px_8px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full ${
                  isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } ${index % 3 === 1 ? 'md:scale-105 md:border-[#007BFF] md:shadow-[6px_6px_0_0_#007BFF] md:hover:shadow-[8px_8px_0_0_#007BFF]' : ''}`}
                style={{
                  transitionDelay: isVisible.services ? `${index * 150}ms` : '0ms'
                }}
              >
                {/* Popular Badge */}
                {index % 3 === 1 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#007BFF] text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-black shadow-[2px_2px_0_0_#000]">
                      POPULAR
                    </div>
                  </div>
                )}
                
                {/* Service Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    index % 3 === 1 
                      ? 'bg-[#007BFF] text-white group-hover:bg-black' 
                      : 'bg-black text-white group-hover:bg-[#007BFF]'
                  }`}>
                    {service.icon}
                  </div>
                  
                  {/* Price */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-black">{service.price.split(' ')[2]}</div>
                    <div className="text-xs text-gray-500">{service.price.split(' ').slice(0, 2).join(' ')}</div>
                  </div>
                </div>
                
                {/* Service Title */}
                <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#007BFF] transition-colors">
                  {service.title}
                </h3>
                
                {/* Service Description */}
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features List - Full Display */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700 font-medium leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <div className="mt-auto">
                  <Link
                    to={`/payment?service=${service.id}&title=${encodeURIComponent(service.title)}&price=${service.priceValue}&features=${encodeURIComponent(JSON.stringify(service.features))}&description=${encodeURIComponent(service.description)}`}
                    className={`w-full py-3 px-4 rounded-[12px] font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 border-2 shadow-[3px_3px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 tracking-[1.23px] ${
                      index % 3 === 1
                        ? 'bg-[#007BFF] text-white border-[#007BFF] hover:bg-black hover:border-black'
                        : 'bg-black text-white border-black hover:bg-[#007BFF] hover:border-[#007BFF]'
                    }`}
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className={`text-center mt-16 sm:mt-20 transition-all duration-1000 delay-600 ${
            isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-gradient-to-r from-[#007BFF]/5 to-purple-500/5 border-2 border-black rounded-[20px] shadow-[4px_4px_0_0_#000] p-8 sm:p-12 max-w-4xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                Need Something Custom?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                Every project is unique. Let's discuss your specific requirements and create a 
                tailored solution that perfectly fits your needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-[#007BFF] hover:bg-black text-white border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 px-8 py-4 font-bold text-base transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Request Custom Quote <MessageCircle className="w-5 h-5" />
                </Link>
                <a
                  href="mailto:prabathsubashana18@gmail.com"
                  className="bg-white hover:bg-gray-50 text-black border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 px-8 py-4 font-bold text-base transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Schedule Discovery Call <Calendar className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section ref={workflowRef} className="bg-[#FCF9F8] py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[301px]">
          
          {/* Section Header */}
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible.workflow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[39px] font-medium text-black mb-4 sm:mb-6">
              How It Works
            </h2>
            <p className="text-sm sm:text-[16px] leading-[22px] sm:leading-[26px] lg:leading-[30px] tracking-[1.23px] text-black max-w-2xl mx-auto">
              My proven 5-step process ensures your project is delivered on time and exceeds expectations
            </p>
          </div>

          {/* Workflow Steps */}
          <div className="space-y-8 sm:space-y-12">
            {workflow.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                } transition-all duration-1000 ${
                  isVisible.workflow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: isVisible.workflow ? `${index * 200}ms` : '0ms'
                }}
              >
                {/* Step Card */}
                <div className="bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] p-6 sm:p-8 flex-1 hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#007BFF] rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                      {step.step}
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium text-black">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Step Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full flex items-center justify-center text-white flex-shrink-0">
                  {step.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Samples Section */}
      <section ref={portfolioRef} className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[301px]">
          
          {/* Section Header */}
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible.portfolio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[39px] font-medium text-black mb-4 sm:mb-6">
              Featured Work
            </h2>
            <p className="text-sm sm:text-[16px] leading-[22px] sm:leading-[26px] lg:leading-[30px] tracking-[1.23px] text-black max-w-2xl mx-auto">
              Here are some recent projects that showcase my design capabilities
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {featuredProjectsData.map((project, index) => (
              <div
                key={project.id}
                className={`bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] overflow-hidden shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 ${
                  isVisible.portfolio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: isVisible.portfolio ? `${(index + 1) * 100}ms` : '0ms'
                }}
              >
                {/* Project Image */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="p-4 sm:p-6 flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${getProjectGradient(project.id)} rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg`}>
                          <span className="text-white font-bold text-sm sm:text-lg">{getProjectInitials(project.name)}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-1">{project.name}</h4>
                        <p className="text-xs text-gray-600">{project.type} • {project.industry}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 ${getProjectDotColor(project.id)} rounded-full`}></div>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-4 sm:p-6 flex flex-col h-full">
                  <h3 className="text-lg font-medium text-black mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                    {project.description}
                  </p>
                  
                  {/* Bottom section with proper alignment */}
                  <div className="mt-auto">
                    {/* Project type - separate row */}
                    <div className="mb-3">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded-full">
                        {project.type}
                      </span>
                    </div>
                    
                    {/* Links section - properly aligned */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {project.links.design && (
                        <a
                          href={project.links.design}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#007BFF] hover:opacity-70 transition-opacity whitespace-nowrap"
                        >
                          View design
                          <ArrowRight className="w-3 h-3 flex-shrink-0" />
                        </a>
                      )}
                      {project.links.caseStudy && (
                        <a
                          href={project.links.caseStudy}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#007BFF] hover:opacity-70 transition-opacity whitespace-nowrap"
                        >
                          Case study
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#007BFF] hover:opacity-70 transition-opacity whitespace-nowrap"
                        >
                          GitHub
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Link */}
          <div className={`text-center transition-all duration-1000 delay-600 ${
            isVisible.portfolio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Link
              to="/projects"
              className="bg-[#007BFF] hover:bg-[#0056b3] text-white border-2 border-black rounded-[12px] sm:rounded-[15px] shadow-[3px_3px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 px-6 sm:px-8 py-3 sm:py-4 font-medium text-sm sm:text-base transition-all duration-300 inline-flex items-center gap-2"
            >
              View Full Portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="bg-[#FCF9F8] py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[301px]">
          
          {/* Section Header */}
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[39px] font-medium text-black mb-4 sm:mb-6">
              Client Testimonials
            </h2>
            <p className="text-sm sm:text-[16px] leading-[22px] sm:leading-[26px] lg:leading-[30px] tracking-[1.23px] text-black max-w-2xl mx-auto">
              Don't just take my word for it - here's what my clients say about working with me
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className={`relative transition-all duration-1000 delay-200 ${
            isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Carousel Container with Navigation */}
            <div className="relative max-w-6xl mx-auto flex items-center">
              {/* Previous Button - Outside Left */}
              <button
                onClick={prevTestimonial}
                className="hidden lg:flex bg-white hover:bg-gray-50 border-2 border-black rounded-full p-4 shadow-[3px_3px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 group mr-8"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-7 h-7 text-[#007BFF] group-hover:text-[#0056b3]" />
              </button>

              {/* Main Testimonial Card */}
              <div className="flex-1 max-w-4xl">
                <div className="bg-white border-2 border-black rounded-[18px] shadow-[6px_6px_0_0_#000] p-8 sm:p-12 min-h-[420px] flex flex-col justify-center transition-all duration-300">
                  {/* Quote Icon */}
                  <div className="flex items-center justify-center mb-6">
                    <Quote className="w-12 h-12 text-[#007BFF]" />
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current mx-1" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-8 text-center italic font-light">
                    "{testimonials[currentTestimonial].testimonial}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="text-center">
                      <h4 className="font-medium text-black text-xl mb-1">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        {testimonials[currentTestimonial].role}
                      </p>
                      <p className="text-xs text-[#007BFF] font-medium">
                        {testimonials[currentTestimonial].project}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Button - Outside Right */}
              <button
                onClick={nextTestimonial}
                className="hidden lg:flex bg-white hover:bg-gray-50 border-2 border-black rounded-full p-4 shadow-[3px_3px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 group ml-8"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-7 h-7 text-[#007BFF] group-hover:text-[#0056b3]" />
              </button>
            </div>

            {/* Mobile Navigation Buttons */}
            <div className="flex lg:hidden justify-center space-x-4 mt-6">
              <button
                onClick={prevTestimonial}
                className="bg-white hover:bg-gray-50 border-2 border-black rounded-full p-3 shadow-[3px_3px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-[#007BFF] group-hover:text-[#0056b3]" />
              </button>

              <button
                onClick={nextTestimonial}
                className="bg-white hover:bg-gray-50 border-2 border-black rounded-full p-3 shadow-[3px_3px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-[#007BFF] group-hover:text-[#0056b3]" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full border-2 border-black transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-[#007BFF] scale-125 shadow-[2px_2px_0_0_#000]'
                      : 'bg-white hover:bg-gray-100 shadow-[1px_1px_0_0_#000] hover:shadow-[2px_2px_0_0_#000]'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play Indicator */}
            <div className="flex items-center justify-center mt-6">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-sm text-gray-600 hover:text-[#007BFF] transition-colors duration-300 flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded-full hover:border-[#007BFF]"
              >
                <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span>{isAutoPlaying ? 'Auto-play on' : 'Auto-play off'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[301px]">
          
          {/* Section Header */}
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[39px] font-medium text-black mb-4 sm:mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-[16px] leading-[22px] sm:leading-[26px] lg:leading-[30px] tracking-[1.23px] text-black max-w-2xl mx-auto">
              Got questions? Here are answers to the most common questions about my freelance services
            </p>
          </div>

          {/* FAQ List */}
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white border-2 border-black rounded-[15px] sm:rounded-[18px] shadow-[3px_3px_0_0_#000] sm:shadow-[4px_4px_0_0_#000] overflow-hidden transition-all duration-300 hover:shadow-[4px_4px_0_0_#000] sm:hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                  isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: isVisible.faq ? `${index * 100}ms` : '0ms'
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg sm:text-xl font-medium text-black pr-4">
                    {faq.question}
                  </h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-black flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-black flex-shrink-0" />
                  )}
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="bg-[#007BFF] py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        {/* Simple Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-10 right-10 w-16 h-16 border border-white rounded-lg rotate-45"></div>
          <div className="absolute bottom-10 left-10 w-12 h-12 border border-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[301px] relative z-10">
          <div className={`text-center transition-all duration-1000 ${
            isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[39px] font-medium text-white mb-4 sm:mb-6">
              Ready to Start Your Dream Project?
            </h2>
            
            <p className="text-sm sm:text-[16px] leading-[22px] sm:leading-[26px] lg:leading-[30px] tracking-[1.23px] text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto">
              Let's bring your vision to life with professional design that drives results.
            </p>
            
            {/* Availability Note */}
            <div className="bg-white/15 border border-white/30 rounded-[15px] p-4 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-white text-sm sm:text-[16px] font-medium tracking-[1.23px]">
                  Available Now • Booking for <strong>October 2025</strong>
                </p>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Link
                to="/contact"
                className="bg-white hover:bg-gray-50 text-[#007BFF] border-2 border-white rounded-[15px] shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] hover:shadow-[6px_6px_0_0_rgba(255,255,255,0.4)] hover:-translate-x-1 hover:-translate-y-1 px-6 sm:px-8 py-3 sm:py-4 font-medium text-sm sm:text-[16px] tracking-[1.23px] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Start Your Project 
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:prabathsubashana18@gmail.com"
                className="bg-transparent hover:bg-white/10 text-white border-2 border-white rounded-[15px] shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] hover:shadow-[6px_6px_0_0_rgba(255,255,255,0.4)] hover:-translate-x-1 hover:-translate-y-1 px-6 sm:px-8 py-3 sm:py-4 font-medium text-sm sm:text-[16px] tracking-[1.23px] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Quick Chat 
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

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

      {/* WhatsApp Floating Button */}
      <WhatsAppFloat 
        phoneNumber="+94716903566"
        message="Hi Prabhath! I'm interested in your freelance services. Let's discuss my project requirements."
      />
    </div>
  );
};

export default Freelance;