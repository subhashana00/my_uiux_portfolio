import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Menu, X, Phone, MapPin, Linkedin, Github, Send, MessageCircle, User, AtSign, Zap, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { WhatsAppIcon } from "@/components/WhatsAppFloat";
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const { toast } = useToast();

  // Track mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_svj8159';
  const EMAILJS_TEMPLATE_ID = 'template_9eyn2g2'; // Your actual template ID
  const EMAILJS_PUBLIC_KEY = 'JjZ4RiVAm-flMX0_n'; // Your actual public key

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation check
    if (!formData.firstName || !formData.email || !formData.subject || !formData.message) {
      toast({
        variant: "destructive",
        title: "Please fill in required fields",
        description: "First Name, Email, Subject, and Message are required.",
        className: "border-4 border-black bg-[#FCF9F8] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[20px] font-bold text-[16px] tracking-[1.23px] p-6 text-black",
        duration: 4000,
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        className: "border-4 border-black bg-[#FCF9F8] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[20px] font-bold text-[16px] tracking-[1.23px] p-6 text-black",
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`.trim(),
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Prabhath Subhashana', // Your name
        reply_to: formData.email,
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('Email sent successfully:', result);
      
      // Success toast
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
        className: "border-4 border-black bg-[#007BFF] text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[20px] font-bold text-[16px] tracking-[1.23px] p-6",
        duration: 5000,
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error: any) {
      console.error('EmailJS error:', error);
      
      let errorMessage = "Something went wrong. Please try again or contact me directly via email.";
      let errorTitle = "Failed to send message";
      
      // Provide specific error messages based on error type
      if (error?.status === 400) {
        errorTitle = "Configuration Error";
        errorMessage = "EmailJS configuration issue. Please check the public key and template ID.";
      } else if (error?.status === 422) {
        errorTitle = "Template Error";
        errorMessage = "Email template not found. Please create the 'template_contact' template in EmailJS.";
      } else if (error?.status === 403) {
        errorTitle = "Authentication Error";
        errorMessage = "Invalid EmailJS credentials. Please check your public key.";
      }
      
      // Error toast
      toast({
        variant: "destructive",
        title: errorTitle,
        description: errorMessage,
        className: "border-4 border-black bg-[#FCF9F8] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[20px] font-bold text-[16px] tracking-[1.23px] p-6 text-black",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
              className="hidden md:flex border-[#007BFF] bg-[#007BFF] text-white hover:bg-white hover:text-[#007BFF] shadow-[2px_2px_0_0_#000] text-[14px] lg:text-[16px] font-medium px-[30px] lg:px-[50px] py-[15px] lg:py-[20px] rounded-none"
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
                className="text-black text-[16px] font-normal tracking-[1.23px] py-3 px-4 rounded-lg border-2 border-transparent hover:border-black hover:bg-white hover:shadow-[3px_3px_0_0_#000] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Freelance
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="border-[#007BFF] bg-[#007BFF] text-white hover:bg-white hover:text-[#007BFF] shadow-[2px_2px_0_0_#000] text-[16px] font-medium px-[30px] py-[15px] rounded-none w-full justify-center mt-2"
                >
                  Contact Me
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Contact Content Section */}
      <section className="bg-[#FCF9F8] py-8 sm:py-10 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8 lg:mb-10">
              <div className="inline-flex items-center gap-2 bg-[#007BFF] text-white px-3 py-1.5 rounded-full text-xs font-medium mb-4">
                <MessageCircle className="w-3 h-3" />
                Let's Connect
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-medium leading-tight text-black mb-4">
                Get In <span className="relative">Touch<span className="absolute bottom-0 left-0 w-full h-1.5 bg-[#007BFF]/20"></span></span>
              </h1>
              <p className="text-[14px] sm:text-[15px] leading-[24px] tracking-[1.23px] text-gray-700 max-w-xl mx-auto">
                Have a project in mind? Let's discuss how we can bring your ideas to life.
              </p>
            </div>

            {/* Main Contact Grid */}
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-10">
              
              {/* Contact Information Card */}
              <div className="bg-white border-2 border-black rounded-[16px] shadow-[4px_4px_0_0_#000] p-6 lg:p-8 group hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-medium text-black mb-3">Contact Information</h2>
                  <p className="text-[13px] sm:text-[14px] leading-[22px] tracking-[1.23px] text-gray-600">
                    Feel free to reach out. I typically respond within 24 hours.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#007BFF] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-colors">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[15px] font-medium text-black mb-1">Email</h3>
                      <a 
                        href="mailto:prabathsubashana18@gmail.com"
                        className="text-[13px] sm:text-[14px] tracking-[1.23px] text-gray-700 hover:text-[#007BFF] transition-colors break-all"
                      >
                        prabathsubashana18@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#007BFF] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-colors">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[15px] font-medium text-black mb-1">Phone</h3>
                      <a 
                        href="tel:+94716903566"
                        className="text-[13px] sm:text-[14px] tracking-[1.23px] text-gray-700 hover:text-[#007BFF] transition-colors"
                      >
                        +94 716 903 566
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#007BFF] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-colors">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[15px] font-medium text-black mb-1">Location</h3>
                      <p className="text-[13px] sm:text-[14px] tracking-[1.23px] text-gray-700">
                        Gampaha, Western Province<br />Sri Lanka
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                      <WhatsAppIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[15px] font-medium text-black mb-1">WhatsApp</h3>
                      <a 
                        href="https://wa.me/94716903566?text=Hi%20Prabhath!%20I'd%20like%20to%20discuss%20a%20project%20with%20you."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] sm:text-[14px] tracking-[1.23px] text-gray-700 hover:text-green-600 transition-colors"
                      >
                        +94 716 903 566
                      </a>
                      <p className="text-[11px] sm:text-[12px] tracking-[1.23px] text-gray-500 mt-0.5">
                        Quick chat for immediate response
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-[15px] font-medium text-black mb-3">Follow Me</h3>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://linkedin.com/in/prabhath-subhashana-6b694a20a"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="https://behance.net/prabathsubasha"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                      title="Behance Portfolio"
                    >
                      <BehanceIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://github.com/subhashana00"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5"
                      title="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form Card */}
              <div className="bg-white border-2 border-black rounded-[16px] shadow-[4px_4px_0_0_#000] p-6 lg:p-8 group hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-medium text-black mb-3">Send a Message</h2>
                  <p className="text-[13px] sm:text-[14px] leading-[22px] tracking-[1.23px] text-gray-600">
                    Drop me a line and I'll get back to you as soon as possible.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[13px] font-medium text-black mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          required
                          placeholder="first name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="border-2 border-black rounded-lg focus:ring-0 focus:border-[#007BFF] h-10 pl-10 shadow-[2px_2px_0_0_#000] focus:shadow-[3px_3px_0_0_#007BFF] transition-all"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-black mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <Input
                          placeholder="last name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="border-2 border-black rounded-lg focus:ring-0 focus:border-[#007BFF] h-10 pl-10 shadow-[2px_2px_0_0_#000] focus:shadow-[3px_3px_0_0_#007BFF] transition-all"
                        />
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[13px] font-medium text-black mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        required
                        placeholder="test@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="border-2 border-black rounded-lg focus:ring-0 focus:border-[#007BFF] h-10 pl-10 shadow-[2px_2px_0_0_#000] focus:shadow-[3px_3px_0_0_#007BFF] transition-all"
                      />
                      <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[13px] font-medium text-black mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      placeholder="Project collaboration"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="border-2 border-black rounded-lg focus:ring-0 focus:border-[#007BFF] h-10 shadow-[2px_2px_0_0_#000] focus:shadow-[3px_3px_0_0_#007BFF] transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[13px] font-medium text-black mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      required
                      rows={4}
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="border-2 border-black rounded-lg focus:ring-0 focus:border-[#007BFF] resize-none min-h-[100px] shadow-[2px_2px_0_0_#000] focus:shadow-[3px_3px_0_0_#007BFF] transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="border-[#007BFF] bg-[#007BFF] text-white hover:bg-white hover:text-[#007BFF] disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed shadow-[3px_3px_0_0_#007BFF] hover:shadow-[4px_4px_0_0_#007BFF] disabled:shadow-[3px_3px_0_0_#999] text-[14px] font-medium px-[30px] py-[18px] rounded-lg transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 w-full flex items-center justify-center gap-2 tracking-[1.23px]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Freelance Services CTA */}
            <div className="mt-8 lg:mt-10">
              <div className="bg-[#007BFF] border-2 border-black rounded-[16px] shadow-[4px_4px_0_0_#000] p-6 lg:p-8 text-center hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-[#007BFF]" />
                </div>
                <h3 className="text-[28px] sm:text-[32px] font-medium text-white mb-3 tracking-[1.23px]">
                  Ready to Start Your Project?
                </h3>
                <p className="text-[14px] leading-[22px] tracking-[1.23px] text-white/90 mb-6 max-w-xl mx-auto">
                  Explore my comprehensive freelance services and find the perfect package for your business needs.
                </p>
                <Link
                  to="/freelance"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-black border-2 border-black rounded-[12px] shadow-[3px_3px_0_0_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:-translate-x-0.5 hover:-translate-y-0.5 px-6 py-3 font-medium text-[14px] tracking-[1.23px] transition-all duration-300"
                >
                  View Freelance Services <ArrowRight className="w-4 h-4" />
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
      <Toaster />
    </div>
  );
}
