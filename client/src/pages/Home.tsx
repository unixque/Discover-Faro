import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, Zap, MapPin, Users, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

/**
 * Design Philosophy: Magical Modernism / Apple Aesthetic
 * - Glassmorphism with soft blue sky gradients
 * - 3D clay-morphism inspired elements
 * - Floating UI elements with smooth animations
 * - High whitespace and premium typography
 * - Color palette: Faro Sky Blue (#00A3FF), Sunset Gold (#FF9500)
 * - Font: Roboto for clean, professional look
 */

const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const heroRef = useScrollAnimation();
  const featuresRef = useScrollAnimation();
  const stepsRef = useScrollAnimation();
  const communityRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  // Navbar hide animation: visible → contracting → hidden
  const [navState, setNavState] = useState<'visible' | 'contracting' | 'hidden'>('visible');
  const navStateRef = useRef(navState);
  const navTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    navStateRef.current = navState;
  }, [navState]);

  useEffect(() => {
    const handleScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.7;

      if (pastHero && navStateRef.current === 'visible') {
        setNavState('contracting');
        navTimeoutRef.current = setTimeout(() => setNavState('hidden'), 500);
      } else if (!pastHero && navStateRef.current !== 'visible') {
        if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
        setNavState('visible');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-blue-50">
      {/* Navigation Bar — Floating, Translucent, Detached */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4"
        animate={{
          y: navState === 'hidden' ? -100 : 0,
          opacity: navState === 'hidden' ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className={`mx-auto glass-bg rounded-2xl transition-all duration-500 ease-in-out overflow-hidden ${
            navState !== 'visible' ? 'max-w-[76px]' : 'max-w-5xl'
          }`}
        >
          <div
            className={`flex items-center relative transition-all duration-500 ${
              navState !== 'visible' ? 'justify-center px-4 py-2' : 'justify-between px-6 py-3'
            }`}
          >
            <a
              href="#"
              className={`flex items-center shrink-0 z-10 transition-all duration-300 ${
                navState !== 'visible' ? 'gap-0' : 'gap-3'
              }`}
            >
              <img
                src="/Logo_wo_bg.jpg"
                alt="DiscoverFaro Logo"
                className="h-10 w-10 rounded-lg object-cover"
              />
              <span
                className={`font-vartigo text-white text-xl whitespace-nowrap transition-all duration-300 ${
                  navState !== 'visible'
                    ? 'opacity-0 max-w-0 overflow-hidden'
                    : 'opacity-100 max-w-[200px]'
                }`}
              >
                DiscoverFaro
              </span>
            </a>
            <div
              className={`hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 transition-opacity duration-300 ${
                navState !== 'visible' ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm tracking-wide">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm tracking-wide">
                How it Works
              </a>
              <a href="#community" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm tracking-wide">
                Community
              </a>
            </div>
            <div
              className={`absolute right-6 transition-opacity duration-300 ${
                navState !== 'visible' ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <Button className="rounded-full bg-black hover:bg-gray-800 text-white gap-2 shrink-0">
                <Download size={18} />
                Download
              </Button>
            </div>
          </div>
        </nav>
      </motion.div>

      {/* Hero Section */}
      <section
        ref={heroRef.ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20"
      >
        {/* Sky Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663516585651/kEe8jobmDRGScwQ3k5VJGK/hero-background-D4WW8DkQTJh9bLqRnKuPHp.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />

        <motion.div
          className="container mx-auto px-4 relative z-10 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={heroRef.isVisible ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="space-y-8 max-w-3xl mx-auto">

            {/* Heading */}
            <div className="space-y-5">
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1]">
                You capture the beauty.
                <br />
                <span className="font-vartigo bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  We handle the rest.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto">
                Turn your photos into local legends. The first AI-powered companion designed exclusively for Faro.
              </p>
            </div>

            {/* Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <button className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-full px-8 py-4 shadow-lg shadow-blue-200/20 border border-gray-200/60 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
                <img src="/logos/apple.png" alt="Apple" className="h-5 w-5" />
                Download iOS App
              </button>
              <button className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-full px-8 py-4 shadow-lg shadow-blue-200/20 border border-gray-200/60 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
                <img src="/logos/google-play.png" alt="Google Play" className="h-5 w-5" />
                Pre-Order Android
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" ref={featuresRef.ref} className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Everything you need to explore{" "}
              <span className="font-vartigo bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">
                Smarter Trips
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover Faro like never before with AI-powered insights and personalized recommendations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature Card 1 */}
            <motion.div
              className="group relative rounded-3xl overflow-hidden backdrop-blur-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300"
              style={{
                backgroundImage:
                  "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663516585651/kEe8jobmDRGScwQ3k5VJGK/feature-cards-background-c8bpN3RVmYNPrjsWW9gt9d.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={featuresRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-2xl">
                    <Zap size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">AI Scan & Discover</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Snap a photo of any monument or hidden alley. Our Gemini Vision AI identifies it instantly, sharing
                  the history and soul of Faro.
                </p>
                <div className="flex gap-2 pt-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Camera
                  </span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                    AI Magic
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              className="group relative rounded-3xl overflow-hidden backdrop-blur-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300"
              style={{
                backgroundImage:
                  "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663516585651/kEe8jobmDRGScwQ3k5VJGK/feature-cards-background-c8bpN3RVmYNPrjsWW9gt9d.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={featuresRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-100 rounded-2xl">
                    <MapPin size={24} className="text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Smart Route Planner</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Tell us your mood and time. We build an optimized, day-by-day itinerary that adjusts to Faro's
                  real-time events and your preferences.
                </p>
                <div className="flex gap-2 pt-4">
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                    Planning
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Optimization
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Step by Step Section */}
      <section id="how-it-works" ref={stepsRef.ref} className="py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={stepsRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              From scroll to 📸 Suitcase in minutes
            </h2>
            <p className="text-xl text-gray-600 mt-4">Simple steps to your perfect Faro adventure</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Point & Shoot",
                detail: "Capture any spot in Faro. Our AI extracts the cultural context automatically.",
              },
              {
                number: "02",
                title: "Build your collection",
                detail: "Organize spots into curated lists: Old Town, Ria Formosa, or Best Seafood.",
              },
              {
                number: "03",
                title: "Let the AI lead",
                detail: "Pick your dates and let DiscoverFaro generate your perfect path.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={stepsRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className="bg-white rounded-2xl p-8 border border-blue-100 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="text-5xl font-bold text-blue-600 mb-4 opacity-20">{step.number}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.detail}</p>
                  {activeStep === index && (
                    <motion.div
                      className="mt-4 inline-flex items-center gap-2 text-blue-600 font-semibold"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      Learn more <ArrowRight size={18} />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" ref={communityRef.ref} className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={communityRef.isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={communityRef.isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Plan <span className="font-vartigo text-blue-600">together</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Invite friends to collaborate on trips. Everyone adds their must-see spots, and DiscoverFaro handles
                the logistics. Create shared memories with people you care about.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Users size={24} className="text-blue-600" />
                <span className="text-gray-700 font-semibold">Connect with fellow explorers</span>
              </div>
            </motion.div>

            <motion.div
              className="relative h-96 bg-gradient-to-br from-blue-100 to-amber-50 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={communityRef.isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="flex justify-center gap-4">
                    {["Jake", "Sarah", "Lara"].map((name, i) => (
                      <motion.div
                        key={i}
                        className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, delay: i * 0.2, repeat: Infinity } as any}
                      >
                        {name[0]}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-gray-700 font-semibold">Collaborating on Faro adventure</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={ctaRef.ref} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20 bg-gradient-to-r from-orange-400 via-blue-500 to-blue-600">
        <motion.div
          className="container mx-auto px-4 relative z-10 text-center space-y-8 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={ctaRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Plan Less.<br />
            <span className="font-vartigo text-amber-200">Experience More.</span>
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Ready to discover Faro's hidden gems? Download the app today and start your adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button className="rounded-full bg-white text-blue-600 hover:bg-gray-100 gap-2 px-8 py-6 text-lg font-semibold">
              <Download size={20} />
              Download iOS
            </Button>
            <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white gap-2 px-8 py-6 text-lg font-semibold border-2 border-white">
              Pre-Order Android
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/manus-storage/discoverfaro-logo_f0206646.png"
                  alt="DiscoverFaro Logo"
                  className="h-8 w-8"
                />
                <span className="font-bold text-white">DiscoverFaro</span>
              </div>
              <p className="text-sm">The AI-powered travel companion for Faro, Portugal.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#features" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#community" className="hover:text-white transition">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>© 2026 DiscoverFaro. Developed for Faro Next Generation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
