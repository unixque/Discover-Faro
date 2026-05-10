import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Download, Zap, MapPin, ArrowRight, MousePointerClick, Compass, Sparkles, Globe, Camera } from "lucide-react";
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

// Moving Clouds Component
const MovingClouds = ({ count = 4, speedRange = [60, 90], opacityRange = [0.1, 0.25] }) => {
  const cloudImages = ["/clouds/cloud1.png", "/clouds/cloud2.png", "/clouds/cloud3.png"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => {
        const size = 500 + Math.random() * 300;
        const top = 5 + (i * (80 / count)) + (Math.random() * 10); // Spread them vertically for consistency
        const duration = speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]);
        const delay = -Math.random() * duration;
        const opacity = opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]);
        const cloudImg = cloudImages[i % cloudImages.length];

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: size,
              height: size * 0.7,
              top: `${top}%`,
              left: "-50%",
              opacity: opacity,
              mixBlendMode: "screen" as any,
            }}
            animate={{
              x: ["0vw", "150vw"],
              y: [0, 20, 0], // Reduced vertical oscillation for "consistency"
            }}
            transition={{
              x: {
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay,
              },
              y: {
                duration: 12 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <img 
              src={cloudImg} 
              alt="Cloud" 
              className="w-full h-full object-contain brightness-110 contrast-105"
            />
          </motion.div>
        );
      })}
    </div>
  );
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
      {/* Moving clouds removed from CTA section as per user feedback */}
    </div>
  );
};

// Feature data for sticky scroll section
const stickyFeatures = [
  {
    icon: Camera,
    title: "AI Scan & Discover",
    description: "Snap a photo of any monument. Our AI identifies it instantly, sharing the history and soul of Faro directly to your screen.",
    tags: [
      { label: "Camera", bg: "bg-sky-50", text: "text-sky-600" },
      { label: "AI Magic", bg: "bg-pink-50", text: "text-pink-600" },
    ],
    color: "bg-sky-500",
    shadowColor: "shadow-sky-500/30",
    accentBg: "bg-sky-100",
    gradientFrom: "from-sky-50",
    gradientTo: "to-white",
    number: "01",
  },
  {
    icon: Compass,
    title: "Smart Route Planner",
    description: "Tell us your mood. We build an optimized, day-by-day itinerary that adjusts to Faro's real-time events and weather.",
    tags: [
      { label: "Planning", bg: "bg-amber-50", text: "text-amber-600" },
      { label: "Optimization", bg: "bg-emerald-50", text: "text-emerald-600" },
    ],
    color: "bg-amber-400",
    shadowColor: "shadow-amber-400/30",
    accentBg: "bg-amber-100",
    gradientFrom: "from-amber-50",
    gradientTo: "to-white",
    number: "02",
  },
  {
    icon: Globe,
    title: "Offline & Multilingual",
    description: "Download your itinerary before you go. Access maps, history, and AI insights offline — in 12 languages.",
    tags: [
      { label: "Offline", bg: "bg-emerald-50", text: "text-emerald-600" },
      { label: "12 Languages", bg: "bg-violet-50", text: "text-violet-600" },
    ],
    color: "bg-emerald-500",
    shadowColor: "shadow-emerald-500/30",
    accentBg: "bg-emerald-100",
    gradientFrom: "from-emerald-50",
    gradientTo: "to-white",
    number: "03",
  },
  {
    icon: Sparkles,
    title: "Personalized Tips",
    description: "From the best pastel de nata to hidden beaches — our AI learns your style and curates hidden gems just for you.",
    tags: [
      { label: "Curated", bg: "bg-pink-50", text: "text-pink-600" },
      { label: "Personal AI", bg: "bg-sky-50", text: "text-sky-600" },
    ],
    color: "bg-pink-500",
    shadowColor: "shadow-pink-500/30",
    accentBg: "bg-pink-100",
    gradientFrom: "from-pink-50",
    gradientTo: "to-white",
    number: "04",
  },
];

// Sticky Scroll Features Section Component
const StickyFeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progressHeight = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 100]),
    { stiffness: 100, damping: 30 }
  );

  // Track which feature is active based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const featureCount = stickyFeatures.length;
    const index = Math.min(
      Math.floor(latest * featureCount),
      featureCount - 1
    );
    setActiveFeature(index);
  });

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative bg-gray-50"
      style={{ height: `${(stickyFeatures.length + 1) * 100}vh` }}
    >
      {/* Sticky Container — pinned below the navbar */}
      <div className="sticky top-0 h-screen">
        <div className="container mx-auto px-4 h-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16 pt-28 pb-12">
          
          {/* LEFT: Sticky heading + progress */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center items-start space-y-10 shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Everything you need for{" "}
                <span className="text-sky-500 font-vartigo block mt-1">
                  Smarter Trips
                </span>
              </h2>
              <p className="text-lg text-gray-500 font-medium max-w-md">
                Four powerful features that transform how you explore Faro.
              </p>
            </motion.div>

            {/* Vertical progress rail + dots */}
            <div className="hidden lg:flex items-start gap-6">
              {/* Progress bar */}
              <div className="relative w-1 h-48 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-sky-500 rounded-full"
                  style={{ height: progressHeight.get ? undefined : "0%" }}
                  animate={{ height: `${((activeFeature + 1) / stickyFeatures.length) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
              </div>
              {/* Feature step labels */}
              <div className="flex flex-col gap-5">
                {stickyFeatures.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3 cursor-pointer group"
                    animate={{
                      opacity: activeFeature === idx ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white transition-all duration-300 ${
                        activeFeature === idx
                          ? feature.color + " shadow-lg scale-110"
                          : "bg-gray-300 scale-100"
                      }`}
                    >
                      {feature.number}
                    </div>
                    <span
                      className={`text-sm font-bold transition-all duration-300 ${
                        activeFeature === idx ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {feature.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile progress dots */}
            <div className="flex lg:hidden gap-2">
              {stickyFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeFeature === idx ? feature.color + " w-8" : "bg-gray-300 w-2"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Animated feature card */}
          <div className="w-full lg:w-7/12 flex items-center justify-center relative min-h-[400px] lg:min-h-0 lg:h-full">
            <AnimatePresence mode="wait">
              {stickyFeatures.map(
                (feature, idx) =>
                  activeFeature === idx && (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 40, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.96 }}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        bounce: 0.25,
                      }}
                      className="absolute inset-0 flex items-center justify-center p-2"
                    >
                      <div
                        className={`group relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/60 border border-gray-100/80 p-10 md:p-14 w-full max-w-xl transition-all duration-500`}
                      >
                        {/* Corner accent blob */}
                        <div
                          className={`absolute top-0 right-0 w-40 h-40 ${feature.accentBg} rounded-bl-[120px] -z-0 transition-transform duration-500 group-hover:scale-125`}
                        />


                        <div className="relative z-10 space-y-6">
                          {/* Icon */}
                          <motion.div
                            className={`inline-flex p-4 ${feature.color} text-white rounded-2xl shadow-lg ${feature.shadowColor}`}
                            initial={{ rotate: -10, scale: 0.8 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{
                              delay: 0.15,
                              type: "spring",
                              bounce: 0.5,
                            }}
                          >
                            <feature.icon size={32} strokeWidth={2.2} />
                          </motion.div>

                          {/* Title */}
                          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight font-vartigo">
                            {feature.title}
                          </h3>

                          {/* Description */}
                          <p className="text-lg text-gray-600 leading-relaxed font-medium max-w-md">
                            {feature.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-3 pt-2">
                            {feature.tags.map((tag, tIdx) => (
                              <motion.span
                                key={tIdx}
                                className={`px-4 py-2 ${tag.bg} ${tag.text} rounded-full text-sm font-bold`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + tIdx * 0.1 }}
                              >
                                {tag.label}
                              </motion.span>
                            ))}
                          </div>


                        </div>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const ctaRef = useScrollAnimation();
  const [iosSubmitted, setIosSubmitted] = useState(false);
  const [androidSubmitted, setAndroidSubmitted] = useState(false);

  // Parallax Hero
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="min-h-screen bg-gray-50 selection:bg-sky-200 overflow-x-clip">


      {/* Hero Section (Roamy Style) */}
      <section className="relative min-h-[110svh] flex items-center justify-center overflow-hidden roamy-sky-bg pt-16 pb-48">
        <div className="absolute inset-0 z-0 overflow-hidden">
           <MovingClouds count={5} speedRange={[60, 90]} opacityRange={[0.15, 0.35]} />
        </div>

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
        
        {/* Smooth gradient transition — blue sky fading to white */}
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(249,250,251,0.3) 30%, rgba(249,250,251,0.7) 60%, rgb(249,250,251) 100%)' }} />
      </section>

      {/* Sticky Scroll Features Section */}
      <StickyFeaturesSection />



      {/* Final CTA Section & Footer Wrapper (Shared Interactive Sky) */}
      <section ref={ctaRef.ref} className="relative min-h-[100svh] flex flex-col overflow-hidden bg-sky-900">
        <InteractiveSkyBackground />
        
        {/* Main CTA Content - flex-1 to push footer down and center content */}
        <div className="flex-1 flex items-center justify-center relative z-10 w-full py-16">
          <motion.div
            className="container mx-auto px-4 text-center space-y-10 max-w-3xl"
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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 max-w-2xl mx-auto w-full">
              {/* iOS Pre-order Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-full bg-white text-gray-900 hover:bg-gray-100 transition-all h-14 px-8 font-bold text-lg shadow-xl w-full sm:w-auto flex items-center gap-3">
                    <img src="/logos/apple.png" alt="Apple" className="h-6 w-6" />
                    Pre-order iOS
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md text-center p-8 rounded-[2rem]">
                  <div className="flex flex-col items-center gap-4">
                    <img src="/logos/apple.png" alt="Apple" className="h-12 w-12" />
                    <h3 className="text-2xl font-extrabold text-gray-900">Pre-order iOS</h3>
                    <p className="text-gray-500 font-medium mb-2">Be the first to know when DiscoverFaro launches on iOS!</p>
                    
                    {iosSubmitted ? (
                      <div className="py-6 text-gray-700 font-medium text-lg">
                        You're on the list! We'll notify you when DiscoverFaro is available on iOS.
                      </div>
                    ) : (
                      <form onSubmit={(e) => { e.preventDefault(); setIosSubmitted(true); }} className="w-full space-y-4">
                        <Input 
                          required
                          placeholder="First name" 
                          className="h-12 rounded-xl border-gray-200 focus:border-sky-500 w-full text-base"
                        />
                        <Input 
                          required
                          type="email"
                          placeholder="Email address" 
                          className="h-12 rounded-xl border-gray-200 focus:border-sky-500 w-full text-base"
                        />
                        <Button type="submit" className="w-full h-12 rounded-xl bg-black text-white font-bold text-base mt-2 hover:bg-gray-800 transition-colors">
                          Join Waitlist
                        </Button>
                      </form>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              {/* Android Pre-order Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-full bg-white text-gray-900 hover:bg-gray-100 transition-all h-14 px-8 font-bold text-lg shadow-xl w-full sm:w-auto flex items-center gap-3">
                    <img src="/logos/google-play.png" alt="Google Play" className="h-6 w-6" />
                    Pre-order Android
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md text-center p-8 rounded-[2rem]">
                  <div className="flex flex-col items-center gap-4">
                    <img src="/logos/google-play.png" alt="Google Play" className="h-12 w-12" />
                    <h3 className="text-2xl font-extrabold text-gray-900">Pre-order Android</h3>
                    <p className="text-gray-500 font-medium mb-2">Be the first to know when DiscoverFaro launches on Android!</p>
                    
                    {androidSubmitted ? (
                      <div className="py-6 text-gray-700 font-medium text-lg">
                        You're on the list! We'll notify you when DiscoverFaro is available on Android.
                      </div>
                    ) : (
                      <form onSubmit={(e) => { e.preventDefault(); setAndroidSubmitted(true); }} className="w-full space-y-4">
                        <Input 
                          required
                          placeholder="First name" 
                          className="h-12 rounded-xl border-gray-200 focus:border-sky-500 w-full text-base"
                        />
                        <Input 
                          required
                          type="email"
                          placeholder="Email address" 
                          className="h-12 rounded-xl border-gray-200 focus:border-sky-500 w-full text-base"
                        />
                        <Button type="submit" className="w-full h-12 rounded-xl bg-black text-white font-bold text-base mt-2 hover:bg-gray-800 transition-colors">
                          Join Waitlist
                        </Button>
                      </form>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        </div>

        {/* Flat Footer */}
        <footer className="w-full relative z-10 py-6 border-t border-white/10 text-white/70 bg-transparent">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm font-medium">
              © 2026 by Logos Studio Inc. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm font-medium">
              <a href="mailto:support@discoverfaro.com" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.86-4.43V7.83a8.24 8.24 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.2-.26z"></path>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
