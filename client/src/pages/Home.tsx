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

const BUBBLE_SIZE = 64;
const BUBBLES = [
  { name: "Jake", letter: "J", color: "from-blue-400 to-blue-600" },
  { name: "Sarah", letter: "S", color: "from-emerald-400 to-teal-600" },
  { name: "Lara", letter: "L", color: "from-amber-400 to-orange-500" },
];

function BouncingBubblesBox({ isVisible }: { isVisible: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef(
    BUBBLES.map((_, i) => ({
      x: 60 + i * 100,
      y: 80 + i * 60,
      vx: (1.2 + i * 0.3) * (i % 2 === 0 ? 1 : -1),
      vy: (1.0 + i * 0.4) * (i % 2 === 0 ? -1 : 1),
    }))
  );
  const [positions, setPositions] = useState(
    bubblesRef.current.map((b) => ({ x: b.x, y: b.y }))
  );
  const animRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      const container = containerRef.current;
      if (!container) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }
      const w = container.clientWidth;
      const h = container.clientHeight;

      bubblesRef.current.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x <= 0) { b.x = 0; b.vx = Math.abs(b.vx); }
        if (b.x >= w - BUBBLE_SIZE) { b.x = w - BUBBLE_SIZE; b.vx = -Math.abs(b.vx); }
        if (b.y <= 0) { b.y = 0; b.vy = Math.abs(b.vy); }
        if (b.y >= h - BUBBLE_SIZE) { b.y = h - BUBBLE_SIZE; b.vy = -Math.abs(b.vy); }
      });

      setPositions(bubblesRef.current.map((b) => ({ x: b.x, y: b.y })));
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative h-96 rounded-3xl overflow-hidden border border-blue-100 shadow-lg"
      style={{
        backgroundImage: "url('/maps/faro_map.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0, x: 30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={{ duration: 0.8 }}
    >
      {/* Subtle overlay so bubbles pop against the map */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />

      {BUBBLES.map((bubble, i) => (
        <div
          key={bubble.name}
          className={`absolute w-16 h-16 rounded-full bg-gradient-to-br ${bubble.color} flex items-center justify-center text-white font-bold text-lg shadow-xl border-2 border-white/50 z-10`}
          style={{
            transform: `translate(${positions[i].x}px, ${positions[i].y}px)`,
            willChange: "transform",
          }}
        >
          {bubble.letter}
        </div>
      ))}

      {/* Label */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-10">
        <span className="bg-white/80 backdrop-blur-sm text-gray-800 font-semibold text-sm px-4 py-2 rounded-full shadow-md">
          Collaborating on Faro adventure
        </span>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const heroRef = useScrollAnimation();
  const featuresRef = useScrollAnimation();
  const stepsRef = useScrollAnimation();
  const communityRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  // Navbar expand animation: starts contracted, expands after scrolling past hero
  const [navExpanded, setNavExpanded] = useState(false);
  const [navFullyExpanded, setNavFullyExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.65;
      setNavExpanded(pastHero);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Delay showing nav links until after the expand animation finishes
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (navExpanded) {
      timer = setTimeout(() => setNavFullyExpanded(true), 350);
    } else {
      setNavFullyExpanded(false);
    }
    return () => clearTimeout(timer);
  }, [navExpanded]);

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
      {/* Navigation Bar — Floating, Compact → Expanded on Scroll */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none">
        <nav
          className={`mx-auto glass-bg rounded-[28px] overflow-hidden pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${navExpanded ? 'max-w-5xl' : 'max-w-[220px]'
            }`}
        >
          <div
            className={`flex flex-nowrap items-center relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${navExpanded ? 'justify-between px-5 py-2.5' : 'justify-center px-3 py-2.5'
              }`}
          >
            {/* Logo & Brand */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center shrink-0 z-10 gap-2.5"
            >
              <img
                src="/Logo_wo_bg.jpg"
                alt="DiscoverFaro Logo"
                className="h-9 w-9 rounded-xl object-cover"
              />
              <span
                className={`font-vartigo text-lg whitespace-nowrap transition-colors duration-500 ${navExpanded ? 'text-gray-900' : 'text-white'}`}
              >
                DiscoverFaro
              </span>
            </a>

            {/* Center Nav Links */}
            <div
              className={`hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${navFullyExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
                }`}
            >
              <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium tracking-wide">
                Features
              </a>
              <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium tracking-wide">
                How it Works
              </a>
              <a href="#community" onClick={(e) => { e.preventDefault(); document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium tracking-wide">
                Community
              </a>
            </div>

            {/* Download CTA */}
            <div
              className={`absolute right-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${navExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
                }`}
            >
              <Button className="rounded-full bg-gray-900 hover:bg-gray-800 text-white gap-2 shrink-0 text-sm px-5 py-2 shadow-sm">
                <Download size={16} />
                Pre-order
              </Button>
            </div>
          </div>
        </nav>
      </div>

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
            <div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1]">
                You capture the beauty.
                <br />
                <span className="font-vartigo" style={{ background: 'linear-gradient(90deg, #4A90E2 0%, #6BBFF9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  We handle the rest.
                </span>
              </h1>
            </div>

            {/* Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
              <button className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-full py-4 shadow-lg shadow-blue-200/20 border border-gray-200/60 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 w-[220px]">
                <img src="/logos/apple.png" alt="Apple" className="h-5 w-5" />
                Pre-order iOS
              </button>
              <button className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-full py-4 shadow-lg shadow-blue-200/20 border border-gray-200/60 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 w-[220px]">
                <img src="/logos/google-play.png" alt="Google Play" className="h-5 w-5" />
                Pre-order Android
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

            <BouncingBubblesBox isVisible={communityRef.isVisible} />
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={ctaRef.ref} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20 cta-sky-bg">
        {/* Animated floating clouds */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`cloud-${i}`}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${120 + i * 60}px`,
                height: `${60 + i * 25}px`,
                top: `${10 + i * 14}%`,
                left: `-${150 + i * 40}px`,
                filter: 'blur(20px)',
              }}
              animate={{
                x: [0, typeof window !== 'undefined' ? window.innerWidth + 400 : 1800],
              }}
              transition={{
                duration: 18 + i * 4,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 3,
              }}
            />
          ))}
          {/* Floating orbs */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                background: `radial-gradient(circle, ${['rgba(255,255,255,0.08)', 'rgba(0,180,255,0.06)', 'rgba(255,200,50,0.05)', 'rgba(100,200,255,0.07)'][i]
                  } 0%, transparent 70%)`,
                top: `${[15, 60, 30, 70][i]}%`,
                left: `${[10, 65, 80, 25][i]}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 1.5,
              }}
            />
          ))}
        </div>

        <motion.div
          className="container mx-auto px-4 relative z-10 text-center space-y-8 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={ctaRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Plan Less.<br />
            <span className="font-vartigo text-amber-200">Explore more.</span>
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Ready to discover Faro's hidden gems? Download the app today and start your adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button className="rounded-full bg-white text-blue-600 hover:bg-gray-100 gap-2 px-8 py-6 text-lg font-semibold">
              <Download size={20} />
              Pre-Order iOS
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
