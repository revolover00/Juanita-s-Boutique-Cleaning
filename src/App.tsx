/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, ReactNode } from "react";
import { 
  Phone, 
  MapPin, 
  Star, 
  Clock, 
  Check, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Heart, 
  ArrowRight,
  Sparkle
} from "lucide-react";

// FadeInSection Component to animate elements as they enter the viewport
function FadeInSection({ children }: { children: ReactNode }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );

    const current = domRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceType: "Standard House Cleaning",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll listener for Sticky Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Form Handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Please tell us your name so we know who to ask for.";
    if (!formData.phone.trim()) {
      newErrors.phone = "We need a contact number to text or call with your quote.";
    } else if (!/^\+?[d\s-()0-9]{7,20}$/.test(formData.phone.trim().replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const resetFormSubmit = () => {
    setFormData({
      name: "",
      phone: "",
      serviceType: "Standard House Cleaning",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Services list
  const services = [
    {
      emoji: "🧹",
      name: "Standard House Cleaning",
      desc: "Consistent, friendly upkeep to keep your home fresh, tidy, and peaceful week after week.",
    },
    {
      emoji: "✨",
      name: "Deep Cleaning",
      desc: "An intensive, detailed top-to-bottom scrub tackling hidden dust, baseboards, and deep grime.",
    },
    {
      emoji: "📦",
      name: "Move-In / Move-Out",
      desc: "Tackling every corner of your old or new space so you can focus on your fresh start stress-free.",
    },
    {
      emoji: "🔨",
      name: "Post-Construction Clean",
      desc: "Clearing fine construction dust, plaster residues, and drywall debris to let your new build shine.",
    },
    {
      emoji: "🍳",
      name: "Kitchen Deep Clean",
      desc: "A localized power-scrub inside and outside appliances, cabinets, backsplashes, and stoves.",
    },
    {
      emoji: "🧼",
      name: "Bathroom Sanitizing",
      desc: "Deep sanitation of tiles, tub surrounds, glass showers, toilets, and fixtures for sparkling safety.",
    },
    {
      emoji: "🪟",
      name: "Window Cleaning",
      desc: "Streak-free, crystal washing of interior window panes, tracks, and sills to welcome the Arizona sun.",
    },
    {
      emoji: "🧺",
      name: "Laundry & Folding",
      desc: "Warm washing, careful drying, and crisp folding of clothes and bedding add-on as we clean.",
    },
  ];

  // Reviews list
  const reviews = [
    {
      text: "Juanita and her team are absolutely incredible! My house has never been cleaner. They pay attention to every little detail.",
      author: "Maria T.",
      city: "Scottsdale",
    },
    {
      text: "I've tried many cleaning services and Juanita's is by far the best. On time, thorough, and so friendly.",
      author: "Jennifer R.",
      city: "Tempe",
    },
    {
      text: "Book them before they're fully booked! Worth every penny. My kitchen looks brand new.",
      author: "Carlos M.",
      city: "Chandler",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-accent selection:text-brand-primary-bg scroll-smooth">
      
      {/* 12. STICKY NAVBAR */}
      <nav 
        id="navbar" 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#2a1200]/95 backdrop-blur-md shadow-lg border-b border-brand-accent/10 py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo with clean lettering */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
            className="flex items-center space-x-2 text-left group focus:outline-none"
          >
            <span className="text-brand-accent text-2xl font-serif font-bold tracking-tight select-none">
              Juanita's <span className="text-[#ffd700]">Cleaning</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8 font-sans">
            <button 
              onClick={() => scrollToSection("about")} 
              className="text-brand-accent-sec hover:text-[#ff6b35] font-medium text-sm tracking-wide transition-colors duration-200 cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className="text-brand-accent-sec hover:text-[#ff6b35] font-medium text-sm tracking-wide transition-colors duration-200 cursor-pointer"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")} 
              className="text-brand-accent-sec hover:text-[#ff6b35] font-medium text-sm tracking-wide transition-colors duration-200 cursor-pointer"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection("testimonials")} 
              className="text-brand-accent-sec hover:text-[#ff6b35] font-medium text-sm tracking-wide transition-colors duration-200 cursor-pointer"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="text-brand-accent-sec hover:text-[#ff6b35] font-medium text-sm tracking-wide transition-colors duration-200 cursor-pointer"
            >
              Pricing
            </button>
          </div>

          {/* Nav Phone Button */}
          <div className="hidden md:flex items-center">
            <a 
              href="tel:4805550199" 
              className="flex items-center space-x-2 bg-brand-accent text-brand-primary-bg px-5 py-2.5 rounded-full font-sans font-bold text-sm tracking-medium transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_4px_12px_rgba(255,107,53,0.3)] hover:shadow-[0_6px_16px_rgba(255,107,53,0.5)] cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Call (480) 555-0199</span>
            </a>
          </div>

          {/* Hamburger Menu Trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-brand-accent-sec hover:text-brand-accent focus:outline-none p-1.5 transition-colors duration-200"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Flyout Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-[#2a1200] border-b border-brand-accent/20 transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-80 opacity-100 py-6" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="flex flex-col space-y-4 px-6 font-sans">
            <button 
              onClick={() => scrollToSection("about")} 
              className="text-left py-1 text-brand-accent-sec hover:text-brand-accent font-medium text-base tracking-wide transition-colors"
            >
              About Our Service
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className="text-left py-1 text-brand-accent-sec hover:text-brand-accent font-medium text-base tracking-wide transition-colors"
            >
              Our Green Services
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")} 
              className="text-left py-1 text-brand-accent-sec hover:text-brand-accent font-medium text-base tracking-wide transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection("testimonials")} 
              className="text-left py-1 text-brand-accent-sec hover:text-brand-accent font-medium text-base tracking-wide transition-colors"
            >
              Client Stories
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="text-left py-1 text-brand-accent-sec hover:text-brand-accent font-medium text-base tracking-wide transition-colors"
            >
              Get Free Estimate
            </button>
            <div className="pt-2">
              <a 
                href="tel:4805550199" 
                className="flex items-center justify-center space-x-2 bg-brand-accent text-brand-primary-bg py-3 px-4 rounded-full font-bold text-center text-sm tracking-wide cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call (480) 555-0199</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0a00] via-[#3d1a00] to-[#1a0a00] pt-24 pb-16 overflow-hidden"
      >
        {/* Sparkle background pattern overlay */}
        <div className="absolute inset-0 sparkle-pattern pointer-events-none select-none" />

        <div className="max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center">
          {/* Boutique top badge */}
          <div className="inline-flex items-center space-x-2 bg-brand-accent/10 border border-brand-accent/20 px-4 py-1.5 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-[#ffd700]" />
            <span className="text-brand-accent-sec text-xs tracking-widest uppercase font-bold">Scottsdale's Premium Cleaning</span>
          </div>

          {/* Large business name with elegant Garamond serif font and thin outline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-brand-text-primary px-2 transition-all duration-300">
            Juanita's
            <span className="block mt-2 font-serif tracking-wide italic text-[#ffd700] hover:scale-[1.02] transform transition-transform duration-300">
              Cleaning Service LLC
            </span>
          </h1>
          
          {/* Elegant thin gold underline */}
          <div className="w-32 h-[2px] bg-[#ffd700] my-8 shadow-sm" />

          {/* Warm tagline in body typeface */}
          <p className="font-sans text-xl sm:text-2xl text-brand-text-secondary max-w-2xl px-4 leading-relaxed tracking-wide">
            "Your Home, Spotless & Sparkling — Every Time"
          </p>

          <p className="font-sans text-xs sm:text-sm text-brand-accent-sec/70 mt-3 italic mb-10">
            Boutique, deep-cleansing care for Scottsdale, Tempe, and Chandler AZ families.
          </p>

          {/* Two CTA Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-center max-w-md px-6 z-20">
            <button 
              onClick={() => scrollToSection("contact")}
              className="flex items-center justify-center space-x-2 bg-brand-accent hover:bg-brand-btn-hover text-brand-primary-bg px-8 py-4 rounded-full font-sans font-extrabold text-base tracking-wide transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] shadow-[0_8px_20px_rgba(255,107,53,0.35)] cursor-pointer"
            >
              <span>Book a Cleaning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollToSection("services")}
              className="flex items-center justify-center space-x-2 bg-brand-card-bg hover:bg-[#422000] text-brand-text-primary border border-brand-accent-sec/30 px-8 py-4 rounded-full font-sans font-semibold text-base tracking-wide transition-all duration-300 hover:border-brand-accent shadow-[0_8px_20px_rgba(0,0,0,0.2)] cursor-pointer"
            >
              <span>See Our Services</span>
            </button>
          </div>
        </div>

        {/* Ambient bottom visual transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-primary-bg to-transparent pointer-events-none" />
      </section>

      {/* 2. TRUST BADGES BAR */}
      <section id="trust-bar" className="relative z-20 bg-[#ff6b35] text-[#1a0a00] py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-center text-center">
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-[#1a0a00]/10 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-6 h-6 text-[#1a0a00]" />
              </div>
              <span className="font-serif font-bold text-lg leading-tight text-[#1a0a00]">
                Locally Owned & Operated
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-[#1a0a00]/10 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-6 h-6 text-[#1a0a00]" />
              </div>
              <span className="font-serif font-bold text-lg leading-tight text-[#1a0a00]">
                Insured & Trustworthy
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-[#1a0a00]/10 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-6 h-6 text-[#1a0a00]" />
              </div>
              <span className="font-serif font-bold text-lg leading-tight text-[#1a0a00]">
                100% Guarantee
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-[#1a0a00]/10 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300">
                <Sparkle className="w-6 h-6 text-[#1a0a00] fill-current" />
              </div>
              <span className="font-serif font-bold text-lg leading-tight text-[#1a0a00]">
                Free Easy Estimates
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="py-24 bg-brand-primary-bg relative overflow-hidden">
        {/* Decorative ambient background shape */}
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-brand-accent/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6">
          <FadeInSection>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              {/* Graphic/About Highlight Column */}
              <div className="md:col-span-5 relative">
                <div className="aspect-[4/5] bg-brand-card-bg rounded-3xl p-8 border border-brand-accent/15 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.3)] relative group overflow-hidden">
                  <div className="absolute inset-0 sparkle-pattern opacity-5" />
                  
                  <div className="flex justify-between items-start z-10">
                    <span className="text-4xl">🌵</span>
                    <div className="flex space-x-1 bg-[#ffd700]/10 border border-[#ffd700]/20 px-3 py-1 rounded-full items-center">
                      <Star className="w-3.5 h-3.5 text-[#ffd700] fill-current" />
                      <span className="text-[#ffd700] text-xs font-bold">5.0 Star Rated</span>
                    </div>
                  </div>

                  <div className="space-y-4 z-10">
                    {/* Visual quote accent */}
                    <div className="font-serif text-5xl text-brand-accent leading-none">“</div>
                    <p className="font-serif italic text-xl text-brand-text-secondary leading-relaxed pl-4">
                      Juanita and her family crew clean my house like it’s their own. Absolute Scottsdale gems.
                    </p>
                    <div className="text-sm font-sans font-bold text-brand-text-primary uppercase tracking-wider pl-4">
                      — Maria T., Private Residence
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Column */}
              <div className="md:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-brand-accent text-xs tracking-widest uppercase font-extrabold block">Meet the Team</span>
                  {/* Left-aligned title with the requested coral skew after line */}
                  <h2 className="section-title text-4xl sm:text-5xl font-serif">
                    Boutique & Family Owned Care
                  </h2>
                </div>

                <p className="font-sans text-lg text-brand-text-secondary leading-relaxed pt-2">
                  Juanita’s Cleaning Service was built on one simple belief — your home deserves the same care and attention you give it. We're a small, dedicated team serving Scottsdale and surrounding areas with honest, thorough cleaning you can count on. When we leave, you'll feel the difference.
                </p>

                <p className="font-sans text-base text-brand-text-primary/80 leading-relaxed">
                  Unlike corporate franchise agencies who rush in and out, Juanita’s provides a high-touch, boutique experience infused with warm Scottsdale hospitality. We focus on premium home care, using safe products and deep scrubbing techniques to bring back your kitchen shine and bathroom sanitation. 
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-brand-accent shrink-0" />
                    <span className="font-sans font-medium text-sm text-brand-text-primary">Serving Scottsdale, Tempe & Chandler</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-brand-accent shrink-0" />
                    <span className="font-sans font-medium text-sm text-brand-text-primary">Trusted, vetted family-only crews</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-brand-accent shrink-0" />
                    <span className="font-sans font-medium text-sm text-brand-text-primary">Specialist deep sanitization supplies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-brand-accent shrink-0" />
                    <span className="font-sans font-medium text-sm text-brand-text-primary">Honest, reliable fixed timing windows</span>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => scrollToSection("contact")}
                    className="inline-flex items-center space-x-3 text-brand-accent font-bold group hover:text-[#e55a25] transition-colors focus:outline-none cursor-pointer"
                  >
                    <span>Request our family rate sheets</span>
                    <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>

              </div>

            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="py-24 bg-brand-bg-alt relative">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-brand-accent text-xs tracking-widest uppercase font-extrabold block">What We Clean</span>
            <h2 className="text-4xl sm:text-5xl font-serif text-brand-text-primary">
              Bespoke Cleaning Options
            </h2>
            <div className="w-16 h-[1.5px] bg-brand-accent mx-auto mt-4" />
            <p className="text-brand-text-secondary text-sm font-sans max-w-md mx-auto">
              Our residential service menus are detailed, thorough, and tuned to bring maximum freshness to every corner.
            </p>
          </div>

          {/* Grid of 8 cards - Alternating warm cream (#fff8f0) and coral-tinted (#fff0e8) with dark text and coral icon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              // Alternating backgrounds (#fff8f0 and #fff0e8)
              const isEven = index % 2 === 0;
              const bgColor = isEven ? "bg-[#fff8f0]" : "bg-[#fff0e8]";

              return (
                <div key={index} className="h-full">
                  <FadeInSection>
                    <div 
                      id={`service-card-${index}`}
                      className={`h-full ${bgColor} rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(255,107,53,0.15)] group`}
                    >
                      <div>
                        {/* Emoji Icon Badge */}
                        <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                          {service.emoji}
                        </div>

                        {/* Service name in primary dark text */}
                        <h3 className="font-serif text-[#1a0a00] text-xl font-bold mb-3 tracking-wide">
                          {service.name}
                        </h3>

                        {/* Description in secondary dark text */}
                        <p className="text-[#2d1500]/90 text-sm font-sans leading-relaxed mb-6">
                          {service.desc}
                        </p>
                      </div>

                      <button 
                        onClick={() => {
                          setFormData(prev => ({ ...prev, serviceType: service.name }));
                          scrollToSection("contact");
                        }}
                        className="inline-flex items-center space-x-1.5 text-brand-accent hover:text-[#e55a25] text-xs font-bold tracking-wider uppercase transition-colors text-left group-hover:translate-x-1 focus:outline-none cursor-pointer"
                      >
                        <span>Select this plan</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </FadeInSection>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 bg-brand-primary-bg relative z-10 overflow-hidden">
        {/* Subtle decorative background gradient node */}
        <div className="absolute left-10 bottom-10 w-80 h-80 bg-brand-accent/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="max-w-xl mb-16 space-y-3">
            <span className="text-brand-accent text-xs tracking-widest uppercase font-extrabold block">Simple Steps</span>
            <h2 className="section-title text-4xl sm:text-5xl font-serif">
              Sparkling in Three Easy Steps
            </h2>
            <p className="text-brand-text-secondary text-base leading-relaxed max-w-md pt-2">
              We have made scheduling and welcoming our cleaning crew as seamless as possible around your active lifestyle.
            </p>
          </div>

          {/* 3 Steps responsive visual timeline */}
          <div className="relative">
            {/* Desktop Connective line */}
            <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#ff6b35]/20 via-[#ffd700]/35 to-[#ff6b35]/20 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              
              {/* Step 1 */}
              <FadeInSection>
                <div className="flex flex-col items-center md:items-start text-center md:text-left group">
                  <div className="flex items-center justify-between w-full max-w-[120px] md:max-w-none mb-4">
                    {/* Ring wrapper around number circle */}
                    <div className="w-[88px] h-[88px] rounded-full border-2 border-brand-accent/20 flex items-center justify-center bg-brand-primary-bg group-hover:border-brand-accent/70 transition-colors duration-300 relative">
                      <div className="w-[68px] h-[68px] rounded-full bg-brand-card-bg flex items-center justify-center text-[#ffd700] text-3xl font-serif font-bold p-1 shadow-inner">
                        1
                      </div>
                      <span className="absolute -top-1 -right-1 text-2xl select-none">🗓️</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-[#ff6b35] text-2xl font-semibold mb-3 tracking-wide">
                    Book & Coordinate
                  </h3>
                  <p className="text-brand-text-secondary font-sans text-sm leading-relaxed max-w-xs">
                    "Schedule your cleaning online or by phone" — Simply fill our clean form or call our line. We'll set and agree on custom timing.
                  </p>
                </div>
              </FadeInSection>

              {/* Step 2 */}
              <FadeInSection>
                <div className="flex flex-col items-center md:items-start text-center md:text-left group">
                  <div className="flex items-center justify-between w-full max-w-[120px] md:max-w-none mb-4">
                    <div className="w-[88px] h-[88px] rounded-full border-2 border-brand-accent/20 flex items-center justify-center bg-brand-primary-bg group-hover:border-brand-accent/70 transition-colors duration-300 relative">
                      <div className="w-[68px] h-[68px] rounded-full bg-brand-card-bg flex items-center justify-center text-[#ffd700] text-3xl font-serif font-bold p-1 shadow-inner">
                        2
                      </div>
                      <span className="absolute -top-1 -right-1 text-2xl select-none">🧹</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-[#ff6b35] text-2xl font-semibold mb-3 tracking-wide">
                    Trained Crew Arrives
                  </h3>
                  <p className="text-brand-text-secondary font-sans text-sm leading-relaxed max-w-xs">
                    "Our team arrives on time, fully equipped" — We bring professional tools, eco-vetted soaps, and detailed room care strategies.
                  </p>
                </div>
              </FadeInSection>

              {/* Step 3 */}
              <FadeInSection>
                <div className="flex flex-col items-center md:items-start text-center md:text-left group">
                  <div className="flex items-center justify-between w-full max-w-[120px] md:max-w-none mb-4">
                    <div className="w-[88px] h-[88px] rounded-full border-2 border-brand-accent/20 flex items-center justify-center bg-brand-primary-bg group-hover:border-brand-accent/70 transition-colors duration-300 relative">
                      <div className="w-[68px] h-[68px] rounded-full bg-brand-card-bg flex items-center justify-center text-[#ffd700] text-3xl font-serif font-bold p-1 shadow-inner">
                        3
                      </div>
                      <span className="absolute -top-1 -right-1 text-2xl select-none">✨</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-[#ff6b35] text-2xl font-semibold mb-3 tracking-wide">
                    Breathe Deep & Relax
                  </h3>
                  <p className="text-brand-text-secondary font-sans text-sm leading-relaxed max-w-xs">
                    "Enjoy a spotless, fresh-smelling home" — Step inside to experience rich vacuum tracks, crystal cabinetry, and pristine Arizona air.
                  </p>
                </div>
              </FadeInSection>

            </div>
          </div>

        </div>
      </section>

      {/* 6. WHY CHOOSE US SECTION (Feature blocks, not cards) */}
      <section id="why-choose-us" className="py-24 bg-brand-bg-alt relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Header / Intro Box column */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-brand-accent text-xs tracking-widest uppercase font-extrabold block">Our Promise</span>
              <h2 className="text-4xl sm:text-5xl font-serif text-brand-text-primary">
                Uncompromising Values
              </h2>
              <div className="w-16 h-[1.5px] bg-brand-accent" />
              <p className="text-brand-text-secondary text-sm font-sans leading-relaxed">
                We believe premium cleaning is an act of trust. Our values determine every client visit to guarantee incredible consistency.
              </p>
            </div>

            {/* Feature Blocks (Left-aligned text blocks, not cards) */}
            <div className="lg:col-span-8 space-y-12">
              
              <FadeInSection>
                <div className="flex space-x-4 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-accent/15 flex items-center justify-center text-brand-accent shrink-0 group-hover:bg-brand-accent group-hover:text-brand-primary-bg transition-colors duration-300">
                    <Check className="w-6 h-6 stroke-[3px]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-brand-text-primary tracking-wide">
                      We treat your home like our own — personal and careful
                    </h3>
                    <p className="text-brand-text-secondary font-sans text-base leading-relaxed">
                      Every vase, baseboard, and dynamic picture frame is treated with delicate, artisanal care. We pay extreme attention to structural nuances so you won't worry about items being displaced or handled clumsily.
                    </p>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection>
                <div className="flex space-x-4 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-accent/15 flex items-center justify-center text-brand-accent shrink-0 group-hover:bg-brand-accent group-hover:text-brand-primary-bg transition-colors duration-300">
                    <Heart className="w-6 h-6 stroke-[3.5px]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-brand-text-primary tracking-wide">
                      Consistent team, every visit — you know who's coming
                    </h3>
                    <p className="text-brand-text-secondary font-sans text-base leading-relaxed">
                      We don't rotate massive workgroups randomly. You will get to know Juanita's key crew family members who understand the detailed spots, unique preferences, and scheduling patterns of your personal Scottsdale household.
                    </p>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection>
                <div className="flex space-x-4 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-accent/15 flex items-center justify-center text-brand-accent shrink-0 group-hover:bg-brand-accent group-hover:text-brand-primary-bg transition-colors duration-300">
                    <Clock className="w-6 h-6 stroke-[3.5px]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-brand-text-primary tracking-wide">
                      Easy booking, flexible schedule — we work around your life
                    </h3>
                    <p className="text-brand-text-secondary font-sans text-base leading-relaxed">
                      Whether you prefer early mornings before work, monthly cleanups, or last minute move-out shifts, we keep scheduling smooth and custom. Our cancellation and re-schedule systems are built around family dynamics.
                    </p>
                  </div>
                </div>
              </FadeInSection>

            </div>

          </div>
        </div>
      </section>

      {/* 7. REVIEWS SECTION */}
      <section id="testimonials" className="py-24 bg-brand-primary-bg relative overflow-hidden">
        {/* Particle circles for depth decoration */}
        <div className="absolute right-10 bottom-10 w-[400px] h-[400px] bg-brand-accent/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-brand-accent text-xs tracking-widest uppercase font-extrabold block">Client Love</span>
            <h2 className="text-4xl sm:text-5xl font-serif text-brand-text-primary">
              What Scottsdale Neighbors Say
            </h2>
            <div className="w-16 h-[1.5px] bg-brand-accent mx-auto mt-4" />
            <p className="text-brand-text-secondary text-sm font-sans">
              Read real testaments from homeowners in Scottsdale, Tempe, and Chandler who trust our family-owned cleaning service.
            </p>
          </div>

          {/* Testimonial cards - coral (#ff6b35) background, dark text, gold stars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <div key={idx} className="h-full">
                <FadeInSection>
                  <div 
                    id={`review-card-${idx}`}
                    className="bg-[#ff6b35] hover:scale-[1.03] transition-all duration-300 rounded-3xl p-8 flex flex-col justify-between shadow-[0_12px_30px_rgba(255,107,53,0.15)] relative h-full"
                  >
                    <div className="space-y-6">
                      {/* Golden Stars row */}
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-5 h-5 text-[#ffd700] fill-current drop-shadow-sm" 
                          />
                        ))}
                      </div>

                      {/* Review text in dark text */}
                      <p className="font-serif italic text-lg text-[#1a0a00] leading-relaxed">
                        "{rev.text}"
                      </p>
                    </div>

                    {/* Author in dark text */}
                    <div className="border-t border-[#1a0a00]/10 pt-5 mt-6 flex justify-between items-center text-[#1a0a00]">
                      <span className="font-sans font-extrabold text-sm uppercase tracking-wide">
                        {rev.author}
                      </span>
                      <span className="font-serif italic text-sm font-medium opacity-90">
                        {rev.city}, AZ
                      </span>
                    </div>
                  </div>
                </FadeInSection>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. PRICING TEASER */}
      <section id="pricing" className="py-24 bg-brand-bg-alt relative">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-brand-accent text-xs tracking-widest uppercase font-extrabold block">Fair Pricing Options</span>
            <h2 className="text-4xl sm:text-5xl font-serif text-brand-text-primary">
              Simple Pricing Teaser
            </h2>
            <div className="w-16 h-[1.5px] bg-brand-accent mx-auto mt-4" />
            <p className="text-brand-text-secondary text-sm font-sans">
              No preset surprises or complex contracts. Since every custom layout and size varies, we quote on demand for fairness.
            </p>
          </div>

          {/* Simple 3-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Package 1 */}
            <FadeInSection>
              <div className="bg-brand-primary-bg rounded-3xl p-8 border border-brand-accent/10 flex flex-col justify-between h-full hover:border-brand-accent transition-colors duration-300 relative group">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-brand-accent text-xs tracking-wider uppercase font-extrabold block">Maintenance Upkeep</span>
                    <h3 className="font-serif text-3xl text-brand-text-primary font-bold">Standard Clean</h3>
                  </div>
                  
                  {/* Soft divider */}
                  <div className="w-full h-[1px] bg-brand-accent-sec/20" />
                  
                  <ul className="space-y-3.5 font-sans text-sm text-brand-text-secondary">
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      <span>Dusting cabinets, tables & baseboards</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      <span>Vacuuming flooring & deep carpet sweeping</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      <span>Sanitizing kitchen counters & sink surfaces</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      <span>Full bathroom polish & cleaning checklist</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      <span>Trash emptying & liner substitutions</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8 mt-8 border-t border-brand-accent-sec/10 text-center">
                  <span className="text-brand-accent-sec/70 text-xs font-sans block mb-1">Weekly / Bi-weekly / Monthly</span>
                  <span className="font-serif text-2xl font-semibold text-[#ffd700] hover:scale-[1.02] transform transition-transform select-none block mb-6">
                    Starting from — Contact for quote
                  </span>
                  <button 
                    onClick={() => {
                      setFormData(prev => ({ ...prev, serviceType: "Standard House Cleaning" }));
                      scrollToSection("contact");
                    }}
                    className="w-full bg-brand-card-bg hover:bg-brand-accent hover:text-[#1a0a00] text-brand-text-primary py-3 rounded-full font-sans font-bold text-sm tracking-wide transition-colors border border-brand-accent/20 cursor-pointer"
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            </FadeInSection>

            {/* Package 2 (Highlighted) */}
            <FadeInSection>
              <div className="bg-brand-primary-bg rounded-3xl p-8 border-2 border-brand-accent flex flex-col justify-between h-full relative group shadow-[0_12px_35px_rgba(255,107,53,0.1)]">
                {/* Popularity Badge */}
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-brand-accent text-[#1a0a00] text-[10px] tracking-widest font-extrabold uppercase px-4 py-1.5 rounded-full shadow-md">
                  Most Preferred Plan
                </div>

                <div className="space-y-6 pt-2">
                  <div className="space-y-2">
                    <span className="text-brand-accent text-xs tracking-wider uppercase font-extrabold block">Deep Structural Care</span>
                    <h3 className="font-serif text-3xl text-brand-text-primary font-bold">Deep Clean</h3>
                  </div>
                  
                  {/* Soft divider */}
                  <div className="w-full h-[1px] bg-brand-accent-sec/20" />
                  
                  <ul className="space-y-3.5 font-sans text-sm text-brand-text-secondary">
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0 animate-pulse" />
                      <span className="font-semibold text-brand-text-primary">Everything in Standard Plan, plus:</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      <span>Hand-scrubbing all baseboards & vents</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      <span>Deep stove hood, grates & stovetop degrease</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      <span>Detailed bathroom grout sanitizing</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      <span>Dusting window blinds & interior frames</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      <span>Wiping outlet covers & ceiling fan blades</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8 mt-8 border-t border-brand-accent-sec/15 text-center">
                  <span className="text-brand-accent-sec/70 text-xs font-sans block mb-1">Seasonal or Initial Cleaning</span>
                  <span className="font-serif text-2xl font-semibold text-[#ffd700] hover:scale-[1.02] transform transition-transform select-none block mb-6">
                    Starting from — Contact for quote
                  </span>
                  <button 
                    onClick={() => {
                      setFormData(prev => ({ ...prev, serviceType: "Deep Cleaning" }));
                      scrollToSection("contact");
                    }}
                    className="w-full bg-brand-accent hover:bg-brand-btn-hover text-brand-primary-bg py-3.5 rounded-full font-sans font-extrabold text-sm tracking-wide transition-colors shadow-md cursor-pointer"
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            </FadeInSection>

            {/* Package 3 */}
            <FadeInSection>
              <div className="bg-brand-primary-bg rounded-3xl p-8 border border-brand-accent/10 flex flex-col justify-between h-full hover:border-brand-accent transition-colors duration-300 relative group">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-brand-accent text-xs tracking-wider uppercase font-extrabold block">Transitional Turnovers</span>
                    <h3 className="font-serif text-3xl text-brand-text-primary font-bold">Move-Out Clean</h3>
                  </div>
                  
                  {/* Soft divider */}
                  <div className="w-full h-[1px] bg-brand-accent-sec/20" />
                  
                  <ul className="space-y-3.5 font-sans text-sm text-brand-text-secondary">
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      <span>Full inside cabinetry & shelving wash</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      <span>Interior oven & refrigerator deep clean</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      <span>Sanitizing laundry room & utility units</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      <span>Window sills & glass sliding door polish</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Check className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                      <span>Vacuuming deep closets & dark utility corners</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8 mt-8 border-t border-brand-accent-sec/10 text-center">
                  <span className="text-brand-accent-sec/70 text-xs font-sans block mb-1">Home buyers, renters, developers</span>
                  <span className="font-serif text-2xl font-semibold text-[#ffd700] hover:scale-[1.02] transform transition-transform select-none block mb-6">
                    Starting from — Contact for quote
                  </span>
                  <button 
                    onClick={() => {
                      setFormData(prev => ({ ...prev, serviceType: "Move-In / Move-Out" }));
                      scrollToSection("contact");
                    }}
                    className="w-full bg-brand-card-bg hover:bg-brand-accent hover:text-[#1a0a00] text-brand-text-primary py-3 rounded-full font-sans font-bold text-sm tracking-wide transition-colors border border-brand-accent/20 cursor-pointer"
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            </FadeInSection>

          </div>
        </div>
      </section>

      {/* 9. HOURS & LOCATION */}
      <section id="hours-location" className="py-24 bg-brand-primary-bg relative z-10 overflow-hidden">
        {/* Ambient light ring node */}
        <div className="absolute right-0 top-10 w-96 h-96 bg-brand-accent/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Hours Column (Left) */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <span className="text-brand-accent text-xs tracking-widest uppercase font-extrabold block">Where to Find Us</span>
                    {/* Left-aligned title with the requested coral brush stroke after line */}
                    <h2 className="section-title text-4xl sm:text-5xl font-serif">
                      Hours & Service Area
                    </h2>
                  </div>
                  
                  <p className="font-sans text-brand-text-secondary text-base leading-relaxed pt-2">
                    We serve Scottsdale, Tempe, Chandler, and surrounding areas. Our family crews operate on consistent time slots configured around your normal schedule rules.
                  </p>

                  {/* Hours Desk / Table */}
                  <div className="bg-brand-card-bg border border-brand-accent/10 rounded-2xl p-6 mt-6 shadow-md">
                    <h3 className="font-serif text-xl border-b border-brand-accent-sec/10 pb-3 mb-4 text-brand-text-primary flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-brand-accent" />
                      <span>Operating Hours</span>
                    </h3>

                    <div className="space-y-3 font-sans text-sm">
                      <div className="flex justify-between items-center py-1">
                        <span className="font-semibold text-brand-text-primary">Monday – Friday</span>
                        <span className="text-brand-text-secondary">8:00 AM – 6:00 PM</span>
                      </div>
                      <div className="w-full h-[1px] bg-brand-accent-sec/5" />
                      <div className="flex justify-between items-center py-1">
                        <span className="font-semibold text-brand-text-primary">Saturday</span>
                        <span className="text-[#ffd700]">9:00 AM – 3:00 PM</span>
                      </div>
                      <div className="w-full h-[1px] bg-brand-accent-sec/5" />
                      <div className="flex justify-between items-center py-1">
                        <span className="font-semibold text-brand-text-primary">Sunday</span>
                        <span className="text-[#ff6b35] font-bold">Closed</span>
                      </div>
                    </div>
                  </div>

                  {/* Scottsdale Coordinates indicator */}
                  <div className="flex items-start space-x-3.5 pt-4 text-sm text-brand-text-secondary">
                    <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-brand-text-primary">Scottsdale Office Head:</p>
                      <p>Near 33.6228, -111.9258 — Serving East Valley Phoenix residences with direct on-demand care.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Column (Right) */}
              <div className="lg:col-span-7 h-[400px] lg:h-auto min-h-[350px]">
                <div id="embed-google-map" className="w-full h-full rounded-3xl border border-brand-accent/20 overflow-hidden shadow-2xl relative">
                  <iframe 
                    title="Juanitas Cleaning Service Scottsdale Location Area Map"
                    className="w-full h-full"
                    src="https://maps.google.com/maps?q=33.6228,-111.9258&z=13&output=embed"
                    loading="lazy"
                    allowFullScreen={true}
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 10. BOOK / CONTACT CTA */}
      <section id="contact" className="py-24 bg-brand-bg-alt relative overflow-hidden">
        {/* Embedded sparkles pattern for aesthetics */}
        <div className="absolute inset-0 sparkle-pattern opacity-[0.04] pointer-events-none select-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeInSection>
            <div className="bg-brand-primary-bg border border-brand-accent/15 rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              
              {!isSubmitted ? (
                <div className="space-y-8">
                  
                  {/* Headline */}
                  <div className="text-center max-w-xl mx-auto space-y-4">
                    <span className="text-brand-accent text-xs tracking-widest uppercase font-extrabold block">Book Today</span>
                    <h2 className="font-serif text-4xl sm:text-5xl text-brand-text-primary tracking-wide">
                      Ready for a Spotless Home?
                    </h2>
                    <p className="text-brand-text-secondary text-base leading-relaxed">
                      Send us your details below for a free estimate. No structural contract required. Juanita’s team replies back in under 2 hours.
                    </p>
                    
                    {/* Big Call CTA Button */}
                    <div className="pt-2">
                      <a 
                        href="tel:4805550199" 
                        className="inline-flex items-center space-x-3 bg-brand-accent hover:bg-brand-btn-hover text-[#1a0a00] px-8 py-3.5 rounded-full font-sans font-extrabold text-base tracking-wide transition-all duration-300 hover:scale-[1.03]"
                      >
                        <Phone className="w-5 h-5 fill-current animate-bounce" />
                        <span>Direct Call / Text: (480) 555-0199</span>
                      </a>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleFormSubmit} className="space-y-6 pt-2 font-sans">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name input */}
                      <div className="space-y-2">
                        <label htmlFor="name-input" className="block text-xs uppercase tracking-widest font-bold text-brand-text-secondary">
                          Your Full Name <span className="text-brand-accent">*</span>
                        </label>
                        <input 
                          id="name-input"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Juanita Hernandez"
                          className={`w-full bg-brand-card-bg text-brand-text-primary px-5 py-3.5 rounded-2xl border ${
                            errors.name ? "border-[#ff6b35]" : "border-brand-accent/20 focus:border-brand-accent"
                          } focus:outline-none transition-colors text-base`}
                          disabled={isSubmitting}
                        />
                        {errors.name && (
                          <p className="text-[#ff6b35] text-xs font-semibold pt-1">{errors.name}</p>
                        )}
                      </div>

                      {/* Phone input */}
                      <div className="space-y-2">
                        <label htmlFor="phone-input" className="block text-xs uppercase tracking-widest font-bold text-brand-text-secondary">
                          Phone Number <span className="text-brand-accent">*</span>
                        </label>
                        <input 
                          id="phone-input"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(480) 555-0199"
                          className={`w-full bg-brand-card-bg text-brand-text-primary px-5 py-3.5 rounded-2xl border ${
                            errors.phone ? "border-[#ff6b35]" : "border-brand-accent/20 focus:border-brand-accent"
                          } focus:outline-none transition-colors text-base`}
                          disabled={isSubmitting}
                        />
                        {errors.phone && (
                          <p className="text-[#ff6b35] text-xs font-semibold pt-1">{errors.phone}</p>
                        )}
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                      
                      {/* Service Selector Dropdown */}
                      <div className="space-y-2">
                        <label htmlFor="service-select" className="block text-xs uppercase tracking-widest font-bold text-brand-text-secondary">
                          Service Needed
                        </label>
                        <div className="relative">
                          <select 
                            id="service-select"
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleInputChange}
                            className="w-full bg-brand-card-bg text-brand-text-primary px-5 py-3.5 rounded-2xl border border-brand-accent/20 focus:border-brand-accent focus:outline-none transition-colors text-base appearance-none cursor-pointer"
                            disabled={isSubmitting}
                          >
                            <option value="Standard House Cleaning">Standard House Cleaning</option>
                            <option value="Deep Cleaning">Deep Cleaning</option>
                            <option value="Move-In / Move-Out">Move-In / Move-Out Cleaning</option>
                            <option value="Post-Construction Clean">Post-Construction Cleaning</option>
                            <option value="Kitchen Deep Clean">Kitchen Deep Clean</option>
                            <option value="Bathroom Sanitizing">Bathroom Sanitizing & Scrubbing</option>
                            <option value="Window Cleaning">Window Cleaning (Interior)</option>
                            <option value="Laundry & Folding">Laundry & Folding (Add-On)</option>
                          </select>
                          <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-brand-accent">
                            ✨
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Message input */}
                    <div className="space-y-2">
                      <label htmlFor="message-input" className="block text-xs uppercase tracking-widest font-bold text-brand-text-secondary">
                        Tell Us About Your Home (Rooms, special instructions, etc.)
                      </label>
                      <textarea 
                        id="message-input"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="E.g., 3 bedrooms, 2.5 bathrooms in North Scottsdale. We would love a weekly clean starting next Saturday..."
                        className="w-full bg-brand-card-bg text-brand-text-primary px-5 py-3.5 rounded-2xl border border-brand-accent/20 focus:border-brand-accent focus:outline-none transition-colors text-base resize-none"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button 
                        id="submit-form-btn"
                        type="submit"
                        className="w-full bg-brand-accent hover:bg-brand-btn-hover text-[#1a0a00] py-4 rounded-2xl font-sans font-extrabold text-base tracking-wide transition-all duration-300 hover:shadow-[0_8px_20px_rgba(255,107,53,0.3)] shadow-md flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-[#1a0a00] border-t-transparent rounded-full animate-spin" />
                            <span>Sending Quote Request...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-[#1a0a00] fill-current" />
                            <span>Request Clean Quote & Free Estimate</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>

                </div>
              ) : (
                /* Success Feedback Screen with real values */
                <div id="contact-success" className="text-center py-8 px-4 space-y-6">
                  <div className="w-20 h-20 rounded-full bg-brand-accent/20 flex items-center justify-center mx-auto text-[#ffd700] text-5xl border border-brand-accent/30 animate-pulse relative">
                    ✨
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-serif text-3xl text-brand-text-primary font-bold">
                      ¡Muchísimas Gracias, {formData.name}!
                    </h3>
                    <p className="text-brand-accent-sec font-sans text-lg max-w-lg mx-auto leading-relaxed">
                      We have received your request for a <strong className="text-brand-accent">{formData.serviceType}</strong> estimate!
                    </p>
                  </div>

                  <p className="text-brand-text-secondary font-sans text-sm max-w-sm mx-auto leading-relaxed">
                    Juanita's small family team will review your home's details and ring or text you at <span className="text-[#ffd700] font-bold">{formData.phone}</span> in <strong>under 2 hours</strong> with your custom estimate option.
                  </p>

                  <div className="pt-6">
                    <button 
                      onClick={resetFormSubmit}
                      className="bg-brand-card-bg hover:bg-brand-accent hover:text-[#1a0a00] text-brand-text-primary px-8 py-3 rounded-full font-sans font-bold text-sm tracking-wide transition-colors border border-brand-accent/20 cursor-pointer"
                    >
                      Send another request
                    </button>
                  </div>
                </div>
              )}

            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer id="footer" className="bg-brand-primary-bg border-t border-brand-accent/10 py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-left mb-12">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <span className="text-brand-accent text-2xl font-serif font-bold tracking-tight">
                Juanita's <span className="text-[#ffd700]">Cleaning</span>
              </span>
              <p className="font-sans text-sm text-brand-text-secondary max-w-sm leading-relaxed pt-1">
                "Your Home, Spotless & Sparkling — Every Time"
              </p>
              <p className="font-sans text-xs text-brand-accent-sec/60 italic leading-relaxed">
                Experience luxury boutique residential cleaning from our small, female-owned East Valley family team.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-serif text-lg text-brand-text-primary font-bold">East Valley Service Areas</h4>
              <ul className="space-y-2.5 font-sans text-sm text-brand-text-secondary">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                  <span>Scottsdale, AZ</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                  <span>Tempe, AZ</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                  <span>Chandler, AZ</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                  <span>And surrounding desert communities</span>
                </li>
              </ul>
            </div>

            {/* Contact details Column */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-serif text-lg text-[#ffd700] font-bold">Contact Info</h4>
              <div className="space-y-3 font-sans text-sm text-brand-text-secondary">
                <a 
                  href="tel:4805550199" 
                  className="flex items-center space-x-2.5 hover:text-brand-accent transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                  <span>Call or Text: (480) 555-0199</span>
                </a>
                <div className="flex items-start space-x-2.5 pt-1">
                  <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                  <span>Scottsdale, AZ and East Valley Region</span>
                </div>
                
                {/* Social icons */}
                <div className="pt-4 flex items-center space-x-4">
                  <a 
                    href="https://facebook.com/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-9 h-9 bg-brand-card-bg hover:bg-brand-accent hover:text-[#1a0a00] text-brand-text-primary rounded-full flex items-center justify-center border border-brand-accent/20 transition-all focus:outline-none"
                    aria-label="Find us on Facebook"
                  >
                    <span className="font-sans font-bold text-sm tracking-wide">f</span>
                  </a>
                  <span className="text-xs text-brand-accent-sec/60 italic font-sans">
                    Vetted, bonded & active on social media!
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright and Legal Bar */}
          <div className="border-t border-brand-accent-sec/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-sans text-brand-text-secondary/60 text-center sm:text-left gap-4">
            <div>
              &copy; {new Date().getFullYear()} Juanita's Cleaning Service LLC. All Rights Reserved. Fully Licensed, Bonded & Insured.
            </div>
            <div className="space-x-4">
              <span className="hover:text-brand-accent transition-colors cursor-pointer" onClick={() => scrollToSection("about")}>Licensed</span>
              <span>&bull;</span>
              <span className="hover:text-brand-accent transition-colors cursor-pointer" onClick={() => scrollToSection("contact")}>Free Estimates</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
