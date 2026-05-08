import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Download, Zap, MapPin, ArrowRight, MousePointerClick } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

// Interactive Background Component
const InteractiveSkyBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dynamic Orbs following mouse */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px] bg-white/20"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 50, mass: 1 }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full blur-[60px] bg-sky-200/30"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 40, mass: 2 }}
      />
      {/* Static ambient clouds */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10 blur-3xl"
          style={{
            width: `${300 + i * 100}px`,
            height: `${200 + i * 80}px`,
            top: `${10 + i * 20}%`,
            left: `${-10 + i * 25}%`,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const featuresRef = useScrollAnimation();
  const stepsRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  // Parallax Hero
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  // Navbar expand animation
  const [navExpanded, setNavExpanded] = useState(false);
  const [navFullyExpanded, setNavFullyExpanded] = useState(false);

  // Scroll Progress
  const scaleX = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollProgress = useTransform(scrollY, [0, 2000], [0, 1]);
  const progressSpring = useSpring(scrollProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.4;
      setNavExpanded(pastHero);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (navExpanded) {
      timer = setTimeout(() => setNavFullyExpanded(true), 350);
    } else {
      setNavFullyExpanded(false);
    }
    return () => clearTimeout(timer);
  }, [navExpanded]);

  return (
    <div className="min-h-screen bg-gray-50 selection:bg-sky-200 overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-sky-500 z-[60] origin-left"
        style={{ scaleX: progressSpring }}
      />
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none">
        <nav
          className={`mx-auto bg-white/80 backdrop-blur-md border border-white/50 rounded-[28px] overflow-hidden pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm ${navExpanded ? 'max-w-5xl' : 'max-w-[220px]'}`}
        >
          <div className={`flex flex-nowrap items-center relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${navExpanded ? 'justify-between px-5 py-2.5' : 'justify-center px-3 py-2.5'}`}>
            {/* Logo */}
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center shrink-0 z-10 gap-2.5">
              <img src="/Logo_wo_bg.jpg" alt="DiscoverFaro Logo" className="h-8 w-8 object-contain" />
              <span className={`font-vartigo text-xl transition-colors duration-500 ${navExpanded ? 'text-gray-900' : 'text-gray-900'}`}>
                DiscoverFaro
              </span>
            </a>

            {/* Links */}
            <div className={`hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${navFullyExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'}`}>
              <a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-600 hover:text-sky-500 transition-colors duration-200 text-sm font-semibold tracking-wide">
                Features
              </a>
              <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-600 hover:text-sky-500 transition-colors duration-200 text-sm font-semibold tracking-wide">
                How it Works
              </a>
            </div>

            {/* CTA */}
            <div className={`absolute right-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${navExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <Button className="rounded-full bg-sky-500 hover:bg-sky-600 text-white gap-2 shrink-0 text-sm px-5 py-2 shadow-md shadow-sky-500/20 font-bold">
                <Download size={16} />
                Get App
              </Button>
            </div>
          </div>
        </nav>
      </div>

      {/* Hero Section (Roamy Style) */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden roamy-sky-bg pt-24 pb-32">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 opacity-50">
           {/* Decorative Background Clouds - Using SVG for crisp edges */}
           <svg className="absolute top-[10%] left-[5%] w-64 h-32 text-white/40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.5 19c-2.485 0-4.5-2.015-4.5-4.5 0-.416.056-.817.159-1.2A5.967 5.967 0 0012 14c-3.314 0-6-2.686-6-6 0-3.153 2.433-5.74 5.518-5.981A4.5 4.5 0 0120.5 5.5c0 .248-.02.491-.059.729C22.484 7.07 24 8.87 24 11c0 2.761-2.239 5-5 5v3zm-5.5-5c1.657 0 3-1.343 3-3 0-1.657-1.343-3-3-3-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3z" />
           </svg>
           <svg className="absolute top-[40%] right-[10%] w-96 h-48 text-white/30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.5 19c-2.485 0-4.5-2.015-4.5-4.5 0-.416.056-.817.159-1.2A5.967 5.967 0 0012 14c-3.314 0-6-2.686-6-6 0-3.153 2.433-5.74 5.518-5.981A4.5 4.5 0 0120.5 5.5c0 .248-.02.491-.059.729C22.484 7.07 24 8.87 24 11c0 2.761-2.239 5-5 5v3z" />
           </svg>
        </motion.div>

        <motion.div 
          style={{ y: y2, opacity: opacityText }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="space-y-8 max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
              You capture the beauty.
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-vartigo text-white/90 drop-shadow-sm -mt-2">
              We handle the rest.
            </h2>

            {/* Store Buttons - White pill style */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 w-[240px] h-16 px-6"
              >
                <img src="/logos/apple.png" alt="Apple" className="h-6 w-6" />
                Pre-order iOS
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 w-[240px] h-16 px-6"
              >
                <img src="/logos/google-play.png" alt="Google Play" className="h-6 w-6" />
                Pre-order Android
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Bottom wave transition */}
        <div className="absolute bottom-0 left-0 right-0 z-0 translate-y-[2px] pointer-events-none">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-gray-50 drop-shadow-sm">
             <path d="M0 120H1440V42.0001C1440 42.0001 1133 -19.9999 720 30.0001C307 80.0001 0 42.0001 0 42.0001V120Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* Feature Grid Section */}
      <motion.section 
        id="features" 
        ref={featuresRef.ref} 
        className="py-24 md:py-32 relative bg-gray-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20 space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
              Everything you need for <br/>
              <span className="text-sky-500 font-vartigo">Smarter Trips</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Feature Card 1 */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-sky-100/50 border border-gray-100 p-10 transition-all duration-300"
              initial={{ opacity: 0, x: -30 }}
              animate={featuresRef.isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100 rounded-bl-[100px] -z-10 transition-all group-hover:scale-110" />
              <div className="relative z-10 space-y-6">
                <div className="inline-flex p-4 bg-sky-500 text-white rounded-2xl shadow-lg shadow-sky-500/30">
                  <Zap size={32} />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900">AI Scan & Discover</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  Snap a photo of any monument. Our AI identifies it instantly, sharing the history and soul of Faro directly to your screen.
                </p>
                <div className="flex gap-3 pt-2">
                  <span className="px-4 py-2 bg-sky-50 text-sky-600 rounded-full text-sm font-bold">Camera</span>
                  <span className="px-4 py-2 bg-pink-50 text-pink-600 rounded-full text-sm font-bold">AI Magic</span>
                </div>
              </div>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-sky-100/50 border border-gray-100 p-10 transition-all duration-300"
              initial={{ opacity: 0, x: 30 }}
              animate={featuresRef.isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, type: "spring", delay: 0.1 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-[100px] -z-10 transition-all group-hover:scale-110" />
              <div className="relative z-10 space-y-6">
                <div className="inline-flex p-4 bg-amber-400 text-white rounded-2xl shadow-lg shadow-amber-400/30">
                  <MapPin size={32} />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900">Smart Route Planner</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  Tell us your mood. We build an optimized, day-by-day itinerary that adjusts to Faro's real-time events.
                </p>
                <div className="flex gap-3 pt-2">
                  <span className="px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-sm font-bold">Planning</span>
                  <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold">Optimization</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Step by Step Section (Interactive Bouncy Cards) */}
      <motion.section 
        id="how-it-works" 
        ref={stepsRef.ref} 
        className="py-24 md:py-32 bg-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
      >
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-sky-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-50 rounded-full blur-3xl opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={stepsRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
              From scroll to 📸 <br/> Suitcase in minutes
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
            {[
              { num: "01", title: "Point & Shoot", color: "bg-sky-500", shadow: "shadow-sky-500/20" },
              { num: "02", title: "Build collection", color: "bg-pink-500", shadow: "shadow-pink-500/20" },
              { num: "03", title: "Let AI lead", color: "bg-amber-400", shadow: "shadow-amber-400/20" },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className={`flex-1 rounded-[2rem] p-8 cursor-pointer transition-all duration-500 border-2 ${activeStep === idx ? `bg-white ${step.shadow} border-transparent shadow-2xl scale-105 z-10` : 'bg-gray-50 border-gray-100 hover:bg-gray-100'}`}
                onClick={() => setActiveStep(idx)}
                initial={{ opacity: 0, y: 50 }}
                animate={stepsRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: idx * 0.15, type: "spring" }}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-6 shadow-lg ${step.color}`}>
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                
                <AnimatePresence>
                  {activeStep === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 font-medium pb-4">
                        {idx === 0 && "Capture any spot in Faro. Our AI extracts the cultural context automatically from your camera."}
                        {idx === 1 && "Organize spots into curated lists: Old Town, Ria Formosa, or Best Seafood to share later."}
                        {idx === 2 && "Pick your dates and let DiscoverFaro generate your perfect, optimized path through the city."}
                      </p>
                      <div className={`inline-flex items-center gap-2 font-bold ${idx === 0 ? 'text-sky-600' : idx === 1 ? 'text-pink-600' : 'text-amber-600'}`}>
                        Try it now <ArrowRight size={18} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section (Interactive Sky) */}
      <section ref={ctaRef.ref} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-24 bg-sky-900">
        <InteractiveSkyBackground />
        
        <motion.div
          className="container mx-auto px-4 relative z-10 text-center space-y-10 max-w-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={ctaRef.isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
            Plan Less.<br />
            <span className="text-sky-300 font-vartigo">Explore more.</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed drop-shadow">
            Ready to discover Faro's hidden gems? Sign up for the pre-order waitlist today.
          </p>
          
          <form 
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-8 max-w-2xl mx-auto w-full"
          >
            <Input 
              placeholder="Your Name" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full h-14 px-6 focus:bg-white/20 transition-all w-full sm:w-auto sm:flex-1"
            />
            <Input 
              type="email"
              placeholder="Email Address" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full h-14 px-6 focus:bg-white/20 transition-all w-full sm:w-auto sm:flex-1"
            />
            <Button className="rounded-full bg-white text-sky-900 hover:bg-sky-50 transition-all h-14 px-10 font-bold text-lg shadow-xl w-full sm:w-auto">
              Join Waitlist
            </Button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-gray-600 py-16 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-sky-500 rounded-xl p-1.5">
                   <img src="/Logo_wo_bg.jpg" alt="DiscoverFaro Logo" className="h-8 w-8 rounded-lg mix-blend-multiply" />
                </div>
                <span className="font-extrabold text-2xl text-gray-900">DiscoverFaro</span>
              </div>
              <p className="text-lg font-medium max-w-sm">The AI-powered travel companion turning saved spots into real trips.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Product</h4>
              <ul className="space-y-4 font-medium">
                <li><a href="#features" className="hover:text-sky-500 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-sky-500 transition-colors">How it Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Legal</h4>
              <ul className="space-y-4 font-medium">
                <li><a href="#" className="hover:text-sky-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-sky-500 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 text-center font-medium text-gray-500">
            <p>© 2026 DiscoverFaro. Built for the modern traveler.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
