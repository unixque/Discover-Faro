import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Download, Zap, MapPin, ArrowRight, MousePointerClick, Compass, Sparkles, Globe, Camera, Heart, Search, Eye, Info, Navigation, Flag, Share2, ExternalLink, Layers, Star, Utensils, Coffee, Umbrella } from "lucide-react";
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
  const cloudImages = ["/clouds/cloud1.png"];

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
    color: "text-sky-500",
    aurora: {
      1: "rgba(14, 165, 233, 0.2)",
      2: "rgba(236, 72, 153, 0.15)",
      3: "rgba(255, 255, 255, 0.8)",
      4: "rgba(224, 242, 254, 0.5)",
    },
    textColor: "text-sky-600",
    number: "01",
    floatingIcons: [Camera, Search, Eye, Info, Zap, Sparkles]
  },
  {
    icon: Compass,
    title: "Smart Route Planner",
    description: "Tell us your mood. We build an optimized, day-by-day itinerary that adjusts to Faro's real-time events and weather.",
    color: "text-amber-500",
    aurora: {
      1: "rgba(251, 191, 36, 0.2)",
      2: "rgba(16, 185, 129, 0.15)",
      3: "rgba(255, 255, 255, 0.8)",
      4: "rgba(254, 252, 232, 0.5)",
    },
    textColor: "text-amber-600",
    number: "02",
    floatingIcons: [Compass, Navigation, Flag, MapPin, Zap, MousePointerClick]
  },
  {
    icon: MapPin,
    title: "Maps Integration",
    description: "Seamlessly open your routes in Google Maps or Apple Maps. Real-time navigation for Faro's narrowest streets.",
    color: "text-emerald-500",
    aurora: {
      1: "rgba(16, 185, 129, 0.2)",
      2: "rgba(14, 165, 233, 0.15)",
      3: "rgba(255, 255, 255, 0.8)",
      4: "rgba(236, 253, 245, 0.5)",
    },
    textColor: "text-emerald-600",
    number: "03",
    floatingIcons: [Globe, Share2, ExternalLink, MapPin, Layers, Compass]
  },
  {
    icon: Heart,
    title: "Personalized Tips",
    description: "From the best pastel de nata to hidden beaches — our AI learns your style and curates hidden gems just for you.",
    color: "text-pink-500",
    aurora: {
      1: "rgba(236, 72, 153, 0.2)",
      2: "rgba(14, 165, 233, 0.15)",
      3: "rgba(255, 255, 255, 0.8)",
      4: "rgba(253, 242, 248, 0.5)",
    },
    textColor: "text-pink-600",
    number: "04",
    floatingIcons: [Heart, Star, Utensils, Coffee, Umbrella, Sparkles]
  },
];

// Phone UI Content Components
const AIScanScreen = () => (
  <div className="flex flex-col h-full bg-slate-100 overflow-hidden relative">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590001158193-790130ae8521?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center grayscale-[0.2]" />
    <div className="absolute inset-0 bg-black/10" />
    <div className="absolute inset-0 grid grid-cols-4 grid-rows-6 pointer-events-none opacity-20">
      {[...Array(24)].map((_, i) => (
        <div key={i} className="border-[0.5px] border-white/40" />
      ))}
    </div>
    <motion.div
      className="absolute left-0 right-0 h-1 bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.8)] z-10"
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white/80 rounded-2xl">
      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-sky-400 rounded-tl-lg" />
      <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-sky-400 rounded-tr-lg" />
      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-sky-400 rounded-bl-lg" />
      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-sky-400 rounded-br-lg" />
      <motion.div
        className="absolute -top-12 left-0 right-0 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="bg-sky-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">Identifying...</span>
      </motion.div>
    </div>
    <div className="mt-auto p-4 relative z-20">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20">
        <h4 className="text-sm font-bold text-gray-900">Arco da Vila</h4>
        <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">Historic neoclassical gateway to the old city of Faro, built in 1812.</p>
        <div className="flex gap-2 mt-2">
          <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div className="h-full bg-sky-500" animate={{ width: "85%" }} transition={{ duration: 1 }} />
          </div>
          <span className="text-[8px] font-bold text-sky-600">85%</span>
        </div>
      </div>
    </div>
  </div>
);

const RoutePlannerScreen = () => (
  <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
    <div className="absolute inset-0 bg-[#f8fafc] opacity-50">
      <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 20 Q 25 25 50 20 T 100 25 V 100 H 0 Z" fill="#e2e8f0" />
        <path d="M0 40 Q 25 45 50 40 T 100 45 V 100 H 0 Z" fill="#cbd5e1" />
        <line x1="10" y1="0" x2="10" y2="100" stroke="#cbd5e1" strokeWidth="0.5" />
        <line x1="30" y1="0" x2="30" y2="100" stroke="#cbd5e1" strokeWidth="0.5" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="#cbd5e1" strokeWidth="0.5" />
        <line x1="70" y1="0" x2="70" y2="100" stroke="#cbd5e1" strokeWidth="0.5" />
        <line x1="90" y1="0" x2="90" y2="100" stroke="#cbd5e1" strokeWidth="0.5" />
      </svg>
    </div>
    <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 200 400">
      <motion.path
        d="M 40 320 C 60 280, 140 240, 100 180 S 160 100, 150 60"
        fill="transparent"
        stroke="#fbbf24"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.circle cx="40" cy="320" r="6" fill="#fbbf24" animate={{ r: [6, 10, 6] }} transition={{ repeat: Infinity, duration: 2 }} />
      <motion.circle cx="150" cy="60" r="6" fill="#fbbf24" />
    </svg>
    <div className="p-4 relative z-20">
      <div className="bg-white rounded-xl p-3 shadow-md border border-gray-100 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-sky-500" />
        <span className="text-xs font-medium text-gray-400">Where to next?</span>
      </div>
    </div>
    <div className="mt-auto p-4 relative z-20">
      <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
          <MapPin size={20} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-gray-900">Ria Formosa Boat Trip</h4>
          <p className="text-[10px] text-gray-500">Starting in 15 mins</p>
        </div>
        <div className="ml-auto w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
          <ArrowRight size={14} className="text-gray-400" />
        </div>
      </div>
    </div>
  </div>
);

const MapsIntegrationScreen = () => (
  <div className="flex flex-col h-full bg-white relative overflow-hidden">
    <div className="flex-1 bg-gray-100 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80')] bg-cover opacity-60" />
      <div className="absolute top-4 left-4 right-4 bg-white rounded-full h-10 shadow-lg border border-gray-100 flex items-center px-4 gap-2">
        <MapPin size={14} className="text-gray-400" />
        <span className="text-[10px] text-gray-400 font-medium">Search in Faro...</span>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <img src="/logos/google-play.png" className="w-5 h-5 grayscale opacity-50" alt="" />
        </div>
        <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <img src="/logos/apple.png" className="w-5 h-5 grayscale opacity-50" alt="" />
        </div>
      </div>
    </div>
    <div className="p-4 bg-white border-t border-gray-50 space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-bold text-gray-900">Open in Maps</h4>
        <div className="flex gap-2">
          <div className="px-2 py-1 bg-blue-50 text-blue-600 text-[8px] font-bold rounded uppercase">Google</div>
          <div className="px-2 py-1 bg-gray-50 text-gray-600 text-[8px] font-bold rounded uppercase">Apple</div>
        </div>
      </div>
      <p className="text-[9px] text-gray-500 leading-tight">Send this route directly to your favorite navigation app for a hands-free experience.</p>
    </div>
  </div>
);

const TipsScreen = () => (
  <div className="flex flex-col h-full bg-pink-50/50 p-4 space-y-4">
    <div className="flex justify-between items-center">
      <h4 className="text-sm font-black text-gray-900">Personalized</h4>
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
        <Heart size={16} className="text-pink-500" />
      </motion.div>
    </div>
    {[
      { title: "Hidden Cafe", cat: "Food", rating: "4.9", color: "bg-orange-100 text-orange-600" },
      { title: "Desert Island", cat: "Nature", rating: "5.0", color: "bg-sky-100 text-sky-600" },
      { title: "Local Market", cat: "Culture", rating: "4.7", color: "bg-purple-100 text-purple-600" }
    ].map((item, i) => (
      <motion.div
        key={i}
        className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100 flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
      >
        <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center font-bold text-xs`}>
          {item.cat[0]}
        </div>
        <div className="flex-1">
          <h5 className="text-xs font-bold text-gray-900">{item.title}</h5>
          <p className="text-[10px] text-gray-500">{item.cat} • {item.rating} ★</p>
        </div>
      </motion.div>
    ))}
    <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-4 text-white">
      <p className="text-[10px] font-medium opacity-80 uppercase tracking-widest">AI Recommendation</p>
      <h5 className="text-sm font-bold mt-1">Best sunset spot today is Faro Marina at 20:14</h5>
    </div>
  </div>
);

// Immersive Scroll Features Section
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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const featureCount = stickyFeatures.length;
    const index = Math.min(
      Math.floor(latest * featureCount),
      featureCount - 1
    );
    setActiveFeature(index);
  });

  const currentAurora = stickyFeatures[activeFeature].aurora;

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative"
      style={{
        height: `${(stickyFeatures.length + 1) * 100}vh`,
        "--aurora-1": currentAurora[1],
        "--aurora-2": currentAurora[2],
        "--aurora-3": currentAurora[3],
        "--aurora-4": currentAurora[4],
      } as React.CSSProperties}
    >
      {/* Sticky Container - This pins everything to the viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Dynamic Background - Now pinned with the container */}
        <div className="absolute inset-0 aurora-bg z-0 pointer-events-none" />

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9]">
                Everything <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-pink-500">you need</span>
              </h2>
            </motion.div>

            <div className="space-y-6">
              {stickyFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className={`flex items-start gap-6 cursor-pointer group p-4 rounded-2xl transition-all duration-500 ${activeFeature === idx ? "bg-white/60 shadow-xl shadow-gray-200/20 backdrop-blur-2xl border border-white/80" : "opacity-40"}`}
                  onClick={() => {
                    const el = sectionRef.current;
                    if (el) {
                      const top = el.offsetTop + (idx * window.innerHeight);
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }}
                >
                  <div className={`w-12 h-12 flex items-center justify-center shrink-0 transition-transform duration-500 ${activeFeature === idx ? "scale-110 " + feature.color : "text-gray-400"}`}>
                    <feature.icon size={32} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-black ${activeFeature === idx ? "text-gray-900" : "text-gray-400"}`}>
                      {feature.title}
                    </h3>
                    <AnimatePresence initial={false}>
                      {activeFeature === idx && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="text-sm text-gray-600 mt-2 font-medium overflow-hidden"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center relative h-[700px]">
            <AnimatePresence>
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 z-0 pointer-events-none"
              >
                {[...Array(6)].map((_, i) => {
                  const Icon = stickyFeatures[activeFeature].floatingIcons[i] || Sparkles;
                  return (
                    <motion.div
                      key={i}
                      className="absolute bg-white/80 backdrop-blur-xl rounded-full border border-white shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center justify-center"
                      style={{
                        width: 50 + (i * 12),
                        height: 50 + (i * 12),
                        top: `${10 + (i * 15)}%`,
                        left: i % 2 === 0 ? `${-8 + (i * 4)}%` : `${82 - (i * 4)}%`,
                      }}
                      animate={{ y: [0, -30, 0], rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
                    >
                      <div className={stickyFeatures[activeFeature].textColor}>
                        <Icon size={24 + (i * 2)} />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="phone-mockup z-10"
              style={{ perspective: "1000px" }}
              animate={{ rotateY: activeFeature % 2 === 0 ? 8 : -8, rotateX: 5, y: [0, -15, 0] }}
              transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, rotateY: { duration: 1, type: "spring", stiffness: 100 } }}
            >
              <div className="phone-notch" />
              <div className="phone-screen">
                <AnimatePresence>
                  <motion.div
                    key={activeFeature}
                    className="w-full h-full"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {activeFeature === 0 && <AIScanScreen />}
                    {activeFeature === 1 && <RoutePlannerScreen />}
                    {activeFeature === 2 && <MapsIntegrationScreen />}
                    {activeFeature === 3 && <TipsScreen />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
            <motion.div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px] opacity-30 -z-10 transition-colors duration-1000 ${stickyFeatures[activeFeature].color}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Pre-order Form Component
// StarField Component for the final CTA
// Animated Birds component
const AnimatedBirds = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ x: "-10vw", y: `${20 + i * 15}%`, opacity: 0 }}
        animate={{
          x: "110vw",
          y: [`${20 + i * 15}%`, `${25 + i * 15}%`, `${20 + i * 15}%`],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 25 + i * 5,
          repeat: Infinity,
          delay: i * 8,
          ease: "linear"
        }}
        className="absolute"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/20">
          <motion.path
            d="M2 12C2 12 5 9 12 12C19 15 22 12 22 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{ d: ["M2 12C2 12 5 9 12 12C19 15 22 12 22 12", "M2 15C2 15 5 18 12 15C19 12 22 15 22 15", "M2 12C2 12 5 9 12 12C19 15 22 12 22 12"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    ))}
  </div>
);

// Navigation Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToWaitlist = () => {
    const el = document.getElementById("waitlist");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-6 pointer-events-none"
    >
      <div className={`
        flex items-center justify-between pointer-events-auto transition-all duration-700 ease-[0.22,1,0.36,1]
        ${isScrolled
          ? "bg-gray-950/80 backdrop-blur-3xl border border-white/10 px-6 py-2.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full max-w-[500px]"
          : "bg-white/10 backdrop-blur-2xl border border-white/20 px-8 py-4 rounded-[2rem] shadow-2xl w-full max-w-7xl"
        }
      `}>
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={scrollToTop}
        >
          <div className={`transition-all duration-700 flex items-center justify-center overflow-hidden ${isScrolled ? "w-8 h-8" : "w-12 h-12"}`}>
            <img src="/Logonbg2.png" alt="DiscoverFaro" className="w-full h-full object-contain" />
          </div>
          <span className={`font-black text-white tracking-tighter transition-all duration-700 ${isScrolled ? "text-base" : "text-xl"}`}>DiscoverFaro</span>
        </div>

        <div className={`hidden md:flex items-center transition-all duration-700 ${isScrolled ? "gap-6" : "gap-10"}`}>
          {["Features", "Waitlist"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`font-bold text-white/80 hover:text-white transition-colors tracking-widest uppercase ${isScrolled ? "text-[10px]" : "text-xs"}`}
            >
              {item}
            </a>
          ))}
        </div>

        <Button
          onClick={scrollToWaitlist}
          className={`rounded-full bg-white text-gray-900 font-bold transition-all duration-700 hover:bg-sky-50 shadow-lg border-none ${isScrolled ? "px-4 h-8 text-[10px]" : "px-6 h-11 text-sm"}`}
        >
          Waitlist
        </Button>
      </div>
    </motion.nav>
  );
};

const StarField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.7,
        }}
        animate={{
          opacity: [0.2, 0.8, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

const PreOrderForm = ({
  type,
  submitted,
  onSubmit
}: {
  type: 'ios' | 'android',
  submitted: boolean,
  onSubmit: () => void
}) => {
  const logo = type === 'ios' ? "/logos/apple.png" : "/logos/google-play.png";
  const title = type === 'ios' ? "Pre-order iOS" : "Pre-order Android";
  const description = type === 'ios'
    ? "Be the first to know when DiscoverFaro launches on iOS!"
    : "Be the first to know when DiscoverFaro launches on Android!";
  const successMsg = type === 'ios'
    ? "You're on the list! We'll notify you when DiscoverFaro is available on iOS."
    : "You're on the list! We'll notify you when DiscoverFaro is available on Android.";

  return (
    <DialogContent className="sm:max-w-md text-center p-8 rounded-[2rem]" onOpenAutoFocus={(e) => e.preventDefault()}>
      <div className="flex flex-col items-center gap-4">
        <img src={logo} alt={type} className="h-12 w-12" />
        <h3 className="text-2xl font-extrabold text-gray-900">{title}</h3>
        <p className="text-gray-500 font-medium mb-2">{description}</p>

        {submitted ? (
          <div className="py-6 text-gray-700 font-medium text-lg">
            {successMsg}
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="w-full space-y-4">
            <Input
              required
              placeholder="First name"
              className="h-12 rounded-xl border-gray-200 focus-visible:border-black focus-visible:ring-black focus-visible:ring-1 w-full text-base"
            />
            <Input
              required
              type="email"
              placeholder="Email address"
              className="h-12 rounded-xl border-gray-200 focus-visible:border-black focus-visible:ring-black focus-visible:ring-1 w-full text-base"
            />
            <Button type="submit" className="w-full h-12 rounded-xl bg-black text-white font-bold text-base mt-2 hover:bg-gray-800 transition-colors">
              Join Waitlist
            </Button>
          </form>
        )}
      </div>
    </DialogContent>
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
      <Navbar />

      {/* Hero Section (Roamy Style) */}
      <section className="relative min-h-[110svh] flex items-center justify-center overflow-hidden roamy-sky-bg pt-24 pb-48">
        {/* Sky Enhancements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/20 blur-[120px] rounded-full pointer-events-none" />
          <MovingClouds count={6} speedRange={[70, 110]} opacityRange={[0.2, 0.4]} />
          <AnimatedBirds />
        </div>

        <motion.div
          style={{ y: y2, opacity: opacityText }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            className="space-y-10 max-w-4xl mx-auto"
          >
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl">
                You capture <br />
                the beauty.
              </h1>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-vartigo text-sky-100/90 drop-shadow-xl">
                We handle the rest.
              </h2>
            </div>

            {/* Store Buttons - White pill style */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Dialog>
                <DialogTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 w-[240px] h-16 px-6"
                  >
                    <img src="/logos/apple.png" alt="Apple" className="h-6 w-6" />
                    Pre-order iOS
                  </motion.button>
                </DialogTrigger>
                <PreOrderForm type="ios" submitted={iosSubmitted} onSubmit={() => setIosSubmitted(true)} />
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 w-[240px] h-16 px-6"
                  >
                    <img src="/logos/google-play.png" alt="Google Play" className="h-6 w-6" />
                    Pre-order Android
                  </motion.button>
                </DialogTrigger>
                <PreOrderForm type="android" submitted={androidSubmitted} onSubmit={() => setAndroidSubmitted(true)} />
              </Dialog>
            </div>
          </motion.div>
        </motion.div>

        {/* Smooth gradient transition — blue sky fading to white */}
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(249,250,251,0.3) 30%, rgba(249,250,251,0.7) 60%, rgb(249,250,251) 100%)' }} />
      </section>

      {/* Sticky Scroll Features Section */}
      <StickyFeaturesSection />



      {/* Final CTA Section & Footer Wrapper */}
      <section
        id="waitlist"
        ref={ctaRef.ref}
        className="relative min-h-screen flex flex-col overflow-hidden bg-[#020617]"
      >
        {/* Deep Sky Layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e1b4b]" />
          <StarField />
          <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-sky-500/10 to-transparent" />

          {/* Subtle Glow behind content */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/20 blur-[150px] rounded-full" />
        </div>

        {/* Main CTA Content */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full px-4 pt-32 pb-16">
          <motion.div
            className="text-center space-y-12 max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={ctaRef.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-7xl md:text-9xl lg:text-[12rem] font-black text-white leading-[0.8] tracking-tighter drop-shadow-[0_20px_80px_rgba(56,189,248,0.4)]">
              Explore <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-pink-400 to-amber-400">Different.</span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Join thousands of early explorers and redefine how you experience Faro. Your journey begins with a single tap.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Dialog>
                <DialogTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center justify-center gap-4 bg-white text-gray-900 font-black rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-all duration-300 w-[280px] h-20 px-8 text-xl"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <img src="/logos/apple.png" alt="Apple" className="h-8 w-8 relative z-10" />
                    <span className="relative z-10">Pre-order iOS</span>
                  </motion.button>
                </DialogTrigger>
                <PreOrderForm type="ios" submitted={iosSubmitted} onSubmit={() => setIosSubmitted(true)} />
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center justify-center gap-4 bg-slate-900 text-white font-black rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.4)] border border-white/10 hover:border-white/20 transition-all duration-300 w-[280px] h-20 px-8 text-xl"
                  >
                    <img src="/logos/google-play.png" alt="Google Play" className="h-8 w-8" />
                    <span>Pre-order Android</span>
                  </motion.button>
                </DialogTrigger>
                <PreOrderForm type="android" submitted={androidSubmitted} onSubmit={() => setIosSubmitted(true)} />
              </Dialog>
            </div>
          </motion.div>
        </div>

        {/* Integrated Footer */}
        <footer className="w-full relative z-10 py-20 border-t border-white/5 text-white">
          <div className="container mx-auto px-6 max-w-6xl">

            {/* Redesigned Institutional Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-12 mb-24"
            >
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Developed within the framework of the <br className="hidden md:block" />
                  <span className="text-white/60 italic font-medium">"Faro Next Generation 2026" project</span>
                </h3>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-16 md:gap-24">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center gap-4 group"
                >
                  <div className="h-16 md:h-20 transition-all duration-500 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100">
                    <img src="/cmFaro.png" alt="Municipality of Faro" className="h-full object-contain" />
                  </div>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">Municipality of Faro</span>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center gap-4 group"
                >
                  <div className="h-12 md:h-16 transition-all duration-500 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100">
                    <img src="/dypall.png" alt="DYPALL Network" className="h-full object-contain" />
                  </div>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">DYPALL Network</span>
                </motion.div>
              </div>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-12 border-t border-white/5">
              <div className="flex flex-col items-center md:items-start gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                    <img src="/Logonbg2.png" alt="" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-2xl font-black text-white tracking-tighter">DiscoverFaro</span>
                </div>
                <div className="text-xs font-medium tracking-widest uppercase text-white/60">
                  © 2026 DiscoverFaro. All rights reserved.
                </div>
              </div>

              <div className="flex items-center gap-10 text-[10px] font-bold tracking-widest uppercase">
                {["Support", "Terms", "Privacy"].map(item => (
                  <a key={item} href="#" className="hover:text-sky-300 transition-colors text-white/80">{item}</a>
                ))}
              </div>

              <div className="flex items-center gap-6">
                {[
                  { name: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                  { name: "TikTok", path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.86-4.43V7.83a8.24 8.24 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.2-.26z" }
                ].map(social => (
                  <a key={social.name} href="#" className="text-white/40 hover:text-white transition-colors transform hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
