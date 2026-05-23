import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Download, Zap, MapPin, ArrowRight, MousePointerClick, Compass, Sparkles, Globe, Camera, Heart, Search, Eye, Info, Navigation, Flag, Share2, ExternalLink, Layers, Star, Utensils, Coffee, Umbrella, Play, Pause, Sun, Wind, Volume2, Music, Plus, Mic, ArrowUp, Calendar, User, Map } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useMobile";
import { Link } from "wouter";
import { toast } from "sonner";

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


// Unused Sticky scroll components removed to streamline performance



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
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-3 md:p-4 pointer-events-none"
    >
      <div className={`
        flex items-center justify-between pointer-events-auto transition-all duration-700 ease-[0.22,1,0.36,1]
        ${isScrolled
          ? "bg-gray-950/80 backdrop-blur-3xl border border-white/10 px-5 py-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full max-w-[500px]"
          : "bg-white/10 backdrop-blur-2xl border border-white/20 px-5 md:px-6 py-2 md:py-2.5 rounded-[1.5rem] shadow-2xl w-full max-w-7xl"
        }
      `}>
        <div
          className="flex items-center gap-2 md:gap-3 cursor-pointer group"
          onClick={scrollToTop}
        >
          <div className={`transition-all duration-700 flex items-center justify-center overflow-hidden ${isScrolled ? "w-7 h-7" : "w-9 h-9"}`}>
            <img src="/Logonbg2.png" alt="DiscoverFaro" className="w-full h-full object-contain" />
          </div>
          <span className={`font-black text-white tracking-tighter transition-all duration-700 ${isScrolled ? "text-sm" : "text-base md:text-lg"}`}>DiscoverFaro</span>
        </div>

        <div className={`hidden md:flex items-center transition-all duration-700 ${isScrolled ? "gap-5" : "gap-8"}`}>
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
          className={`rounded-full bg-white text-gray-900 font-bold transition-all duration-700 hover:bg-sky-50 shadow-lg border-none ${isScrolled ? "px-4 h-7 text-[10px]" : "px-5 h-9 text-xs md:text-sm"}`}
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

const GOOGLE_SHEETS_WEBHOOK_URL = ""; // Paste your deployed Web App URL here

const PreOrderForm = ({
  type,
  submitted,
  onSubmit
}: {
  type: 'ios' | 'android',
  submitted: boolean,
  onSubmit: () => void
}) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const logo = type === 'ios' ? "/logos/apple.png" : "/logos/google-play.png";
  const title = type === 'ios' ? "Pre-order iOS" : "Pre-order Android";
  const description = type === 'ios'
    ? "Be the first to know when DiscoverFaro launches on iOS!"
    : "Be the first to know when DiscoverFaro launches on Android!";
  const successMsg = type === 'ios'
    ? "You're on the list! We'll notify you when DiscoverFaro is available on iOS."
    : "You're on the list! We'll notify you when DiscoverFaro is available on Android.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || GOOGLE_SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("Google Sheets Webhook URL not configured. Submitting locally (simulation).");
      onSubmit();
      return;
    }

    try {
      setLoading(true);
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          email,
          platform: type,
          timestamp: new Date().toISOString()
        })
      });
      onSubmit();
    } catch (err) {
      console.error("Waitlist submission error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <Input
              required
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={loading}
              className="h-12 rounded-xl border-gray-200 focus-visible:border-black focus-visible:ring-black focus-visible:ring-1 w-full text-base"
            />
            <Input
              required
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="h-12 rounded-xl border-gray-200 focus-visible:border-black focus-visible:ring-black focus-visible:ring-1 w-full text-base"
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-black text-white font-bold text-base mt-2 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
        )}
      </div>
    </DialogContent>
  );
};

// Word-by-word staggered reveal component for a truly premium typography animation
const TypographicResponse = ({ text }: { text: string }) => {
  const words = text.split(" ");
  return (
    <p className="text-slate-800 text-lg md:text-2xl font-semibold leading-relaxed font-sans text-center">
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: idx * 0.035,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="inline-block mr-1.5"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};

// Custom Chevron SVG Icons for AppShowcaseSection
const ChevronLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
);

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

// App Screenshots Data for the clip-path carousel (skiper54 inspired)
const screenshots = [
  {
    image: "/screenshots/ss/30f3959a-0204-474d-82aa-3082d08e6317.jpg",
    title: "Day Plan Example",
    tagline: "",
    description: "Experience a fully tailored day plan. Explore optimal routes across Ria Formosa, historic quarters, and hidden beaches, custom-timed by our smart engine.",
    icon: Map,
    color: "text-blue-600",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-100",
    clipPath: "circle(0% at 50% 50%)",
    clipPathActive: "circle(120% at 50% 50%)"
  },
  {
    image: "/screenshots/ss/41557b5a-3001-4dda-bb93-652e484b3a8a.jpg",
    title: "Interactive Explorer",
    tagline: "",
    description: "Discover deserted islands, pristine beaches, and natural parks. Access live ferry times, water taxi booking, and accessibility data.",
    icon: Compass,
    color: "text-green-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    clipPath: "inset(50% 0% 50% 0%)",
    clipPathActive: "inset(0% 0% 0% 0%)"
  },
  {
    image: "/screenshots/ss/05e0f95a-4f6d-41d0-b099-a38cb48bb460.jpg",
    title: "Smart Scanner",
    tagline: "",
    description: "Point your camera at any local landmark to instantly identify historical monuments, scan structures, and unlock curated audio guides.",
    icon: Camera,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
    clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    clipPathActive: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
  },
  {
    image: "/screenshots/ss/ba263dd0-1875-4a3a-855d-e66b43fbe77c.jpg",
    title: "Trip Planner",
    tagline: "",
    description: "Generate your custom route in seconds. Simply choose your duration, select your interests, and let our AI assemble your optimized day.",
    icon: Calendar,
    color: "text-red-500",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-100",
    clipPath: "circle(0% at 100% 100%)",
    clipPathActive: "circle(142% at 100% 100%)"
  },
  {
    image: "/screenshots/ss/5729b3d7-595d-4d2e-9bf6-ee7a50cd0461.jpg",
    title: "Profile Page",
    tagline: "",
    description: "Track your travel stats, manage saved spots, and view custom achievements and digital badges unlocked as you explore Faro.",
    icon: User,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100",
    clipPath: "inset(0% 50% 0% 50%)",
    clipPathActive: "inset(0% 0% 0% 0%)"
  }
];

// Premium App Showcase Section featuring the clip-path carousel (skiper54 inspired)
const AppShowcaseSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % screenshots.length);
    }, 4000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);

  const handleSelectFeature = (idx: number) => {
    setActiveIndex(idx);
    startAutoplay();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    startAutoplay();
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % screenshots.length);
    startAutoplay();
  };

  const activeScreenshot = screenshots[activeIndex];

  return (
    <section id="features" className="relative w-full py-32 bg-slate-50 overflow-hidden border-t border-slate-100 selection:bg-sky-200">
      
      {/* Blueprint style layout overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: Feature List & Descriptions */}
          <div className="flex flex-col gap-4">
            
            {/* Left aligned title for this section */}
            <div className="space-y-4 mb-6">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95]">
                <span className="text-slate-900">Everything</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-pink-500 to-amber-500">you need</span> <br />
                <span className="text-slate-900 text-4xl md:text-6xl mt-2 block">in one app</span>
              </h2>
            </div>

            {[1, 2, 0, 3, 4].map((screenshotsIndex) => {
              const item = screenshots[screenshotsIndex];
              const IconComponent = item.icon;
              const isActive = activeIndex === screenshotsIndex;

              return (
                <button
                  key={screenshotsIndex}
                  onClick={() => handleSelectFeature(screenshotsIndex)}
                  className={`relative flex items-start gap-4 p-5 rounded-2xl border text-left cursor-pointer transition-all duration-500 ${isActive ? 'bg-white shadow-[0_15px_45px_rgba(0,0,0,0.03)] border-slate-200/80' : 'bg-transparent border-transparent hover:bg-slate-100/50 hover:border-slate-150/40 opacity-65 hover:opacity-90'}`}
                >
                  <div className={`shrink-0 flex items-center justify-center ${item.color} mt-1.5`}>
                    <IconComponent size={24} strokeWidth={2.5} />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-800">
                      {item.title}
                    </h3>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="text-xs text-slate-500 font-semibold overflow-hidden leading-relaxed"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Autoplay progress bar at the bottom */}
                  {isActive && (
                    <motion.div
                      key={screenshotsIndex}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 4, ease: "linear" }}
                      className="absolute bottom-0 left-0 right-0 h-[3.5px] origin-left rounded-full bg-gradient-to-r from-sky-400 to-blue-500"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Mobile Showcase with clipPath carousel */}
          <div className="flex flex-col items-center justify-center relative">
            
            {/* Soft ambient glowing background orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-sky-200/30 blur-[100px] rounded-full -z-10 animate-pulse" />

            {/* Custom high-fidelity phone frame */}
            <div className="relative w-[290px] h-[600px] bg-slate-950 rounded-[44px] border-[8px] border-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15),0_30px_60px_-30px_rgba(0,0,0,0.2),inset_0_-2px_6px_0_rgba(255,255,255,0.08)] overflow-hidden select-none">
              {/* iPhone Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-950 rounded-b-2xl z-50 flex items-center justify-center gap-1.5 pointer-events-none">
                <span className="w-10 h-1 bg-zinc-800 rounded-full" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-blue-900" />
                </span>
              </div>

              {/* Screens clipPath Carousel Container */}
              <div className="w-full h-full relative bg-slate-900 rounded-[36px] overflow-hidden">
                
                {/* Underneath image (the previous screenshot, to make the sweep reveal smooth with no blank screens) */}
                <div className="absolute inset-0 w-full h-full bg-slate-900">
                  <img
                    src={screenshots[(activeIndex - 1 + screenshots.length) % screenshots.length].image}
                    alt="Underneath screen"
                    className="w-full h-full object-cover rounded-[32px] opacity-40 scale-[1.02] blur-[1px]"
                  />
                </div>

                {/* Active morphing clip-path image slide */}
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={activeIndex}
                    src={activeScreenshot.image}
                    alt={activeScreenshot.title}
                    initial={{ clipPath: activeScreenshot.clipPath }}
                    animate={{ clipPath: activeScreenshot.clipPathActive }}
                    transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full object-cover rounded-[32px]"
                  />
                </AnimatePresence>

              </div>
            </div>

            {/* Slider Navigation Dots and Controls */}
            <div className="flex items-center gap-6 mt-8">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 shadow-sm text-slate-600 flex items-center justify-center cursor-pointer transition-all active:scale-95"
              >
                <ChevronLeftIcon />
              </button>

              <div className="flex items-center gap-2">
                {[1, 2, 0, 3, 4].map((screenshotsIndex) => (
                  <button
                    key={screenshotsIndex}
                    onClick={() => handleSelectFeature(screenshotsIndex)}
                    className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${activeIndex === screenshotsIndex ? 'w-6 bg-slate-800' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 shadow-sm text-slate-600 flex items-center justify-center cursor-pointer transition-all active:scale-95"
              >
                <ChevronRightIcon />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

// Premium coverflow screenshot carousel continuation (skiper54 inspired)
const ScreensCarouselSection = () => {
  const carouselImages = [
    "/screenshots/ss/30f3959a-0204-474d-82aa-3082d08e6317.jpg", // Island Discovery
    "/screenshots/ss/41557b5a-3001-4dda-bb93-652e484b3a8a.jpg", // Smart Scanner
    "/screenshots/ss/05e0f95a-4f6d-41d0-b099-a38cb48bb460.jpg", // Day Plan Example
    "/screenshots/ss/5729b3d7-595d-4d2e-9bf6-ee7a50cd0461.jpg", // Trip Planner
    "/screenshots/ss/ba263dd0-1875-4a3a-855d-e66b43fbe77c.jpg"  // Profile Page
  ];

  const [currentIndex, setCurrentIndex] = useState(2); // Start with Day Plan active
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4500);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);

  const getOffset = (idx: number) => {
    let diff = idx - currentIndex;
    const len = carouselImages.length;
    if (diff < -len / 2) diff += len;
    if (diff > len / 2) diff -= len;
    return diff;
  };

  const handleSelectFeature = (idx: number) => {
    setCurrentIndex(idx);
    startAutoplay();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    startAutoplay();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    startAutoplay();
  };

  return (
    <section className="relative w-full py-16 bg-slate-50 overflow-hidden select-none border-b border-slate-100 flex flex-col items-center justify-center">
      {/* 3D Coverflow Container */}
      <div className="relative w-full max-w-5xl h-[620px] flex items-center justify-center">
        
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-sky-100/40 blur-[130px] rounded-full pointer-events-none" />

        {/* Carousel Window */}
        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
          <AnimatePresence initial={false}>
            {carouselImages.map((img, idx) => {
              const offset = getOffset(idx);
              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={idx}
                  style={{
                    zIndex: 10 - Math.abs(offset),
                  }}
                  animate={{
                    x: offset * 265,
                    scale: isActive ? 1.0 : 0.82 - Math.abs(offset) * 0.04,
                    opacity: isActive ? 1.0 : 0.65 - Math.abs(offset) * 0.15,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 32,
                    mass: 0.8
                  }}
                  onClick={() => handleSelectFeature(idx)}
                  className={`absolute w-[270px] h-[540px] rounded-[2.2rem] overflow-hidden border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] cursor-pointer select-none transition-shadow hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]`}
                >
                  <img
                    src={img}
                    alt={`App Screen ${idx + 1}`}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  {!isActive && (
                    <div className="absolute inset-0 bg-slate-900/10 transition-opacity duration-300 pointer-events-none" />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Left/Right Navigation Chevron overlays */}
        <button
          onClick={handlePrev}
          className="absolute left-4 z-40 w-14 h-14 rounded-full bg-white/80 hover:bg-white border border-slate-200/80 shadow-md text-slate-700 flex items-center justify-center cursor-pointer transition-all active:scale-95 hover:scale-105"
        >
          <ChevronLeftIcon />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 z-40 w-14 h-14 rounded-full bg-white/80 hover:bg-white border border-slate-200/80 shadow-md text-slate-700 flex items-center justify-center cursor-pointer transition-all active:scale-95 hover:scale-105"
        >
          <ChevronRightIcon />
        </button>

      </div>
    </section>
  );
};

// Faro's Interactive AI Chat Component (Skiper UI inspired - skiper84 styled like user references)
const FaroAIChat = () => {
  const [chatState, setChatState] = useState<'idle' | 'loading' | 'response'>('idle');
  const [userQuery, setUserQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loadingText, setLoadingText] = useState('A conectar à inteligência local...');

  const loadingTexts = [
    "A pesquisar nos arquivos históricos de Faro...",
    "A procurar segredos locais no Algarve...",
    "A consultar as melhores praias e estadias...",
    "A planear a sua rota perfeita no Algarve..."
  ];

  // Rotate loading text while generating
  useEffect(() => {
    if (chatState !== 'loading') return;

    let textIdx = 0;
    const interval = setInterval(() => {
      textIdx = (textIdx + 1) % loadingTexts.length;
      setLoadingText(loadingTexts[textIdx]);
    }, 2200);

    return () => clearInterval(interval);
  }, [chatState]);

  const suggestedQuestions = [
    "Onde comer o melhor pastel de nata?",
    "Quais são os monumentos imperdíveis?",
    "Recomenda praias em Faro",
    "Fale-me da Ria Formosa"
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || chatState === 'loading') return;

    setUserQuery(text);
    setChatState('loading');
    setLoadingText("A conectar à inteligência local...");

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are the Discover Faro AI Assistant, a friendly and expert local guide for Faro and the Algarve region in Portugal.
              Your absolute priority is to only answer questions related to Faro and the Algarve region (including tourism, accommodations, local secrets, restaurants, pastéis de nata, beaches, historical monuments, transport, events, and culture).
              
              CRITICAL RULE:
              If the user asks a question that is completely unrelated to Faro, Algarve, tourism/travel in Portugal, or local cultural activities (for example: explaining general science, writing programming code, discussing general global history outside Portugal, asking about other countries like France/US, capital cities, math, general recipe tutorials, or standard general knowledge), you MUST politely refuse to answer. Re-state clearly and in a friendly way that you are only allowed to answer questions about Faro and the Algarve.
              
              Refusal message guidelines:
              - If in Portuguese, reply: "Desculpe, mas eu sou o Guia de IA da Discover Faro e apenas posso responder a questões sobre Faro e a região do Algarve (turismo, locais históricos, praias, gastronomia, estadias, etc.). Como posso ajudar a planear a sua viagem ao Algarve hoje? 🌴"
              - If in English or other language, reply: "I'm sorry, but as the Discover Faro AI Assistant, I can only help you with questions regarding Faro and the Algarve region (tourism, local landmarks, beaches, food, accommodation, etc.). How can I help you plan your Algarve trip today? 🌴"
              
              Ensure your answers are concise (under 120 words), warm, enthusiastic, and offer practical, highly curated local advice.`
            },
            { role: "user", content: text }
          ]
        })
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content || "Ocorreu um erro ao obter a resposta.";
      setAiResponse(reply);
      setChatState('response');
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("Desculpe, estou com alguma dificuldade em aceder ao meu cérebro de inteligência neste momento. No entanto, recomendo vivamente uma visita à magnífica Sé de Faro, um passeio de barco na Ria Formosa e provar um pastel de nata acabado de sair do forno! 🌴☕");
      setChatState('response');
    }
  };

  const resetChat = () => {
    setInputValue('');
    setChatState('idle');
  };

  return (
    <section className="relative w-full min-h-[650px] py-32 flex flex-col items-center justify-center overflow-hidden bg-[#e0f2fe]/10 select-none">
      
      {/* Apple AI Screen/Section Border Glow Effect */}
      <AnimatePresence>
        {chatState === 'loading' && (
          <motion.div
            key="apple-ai-border-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-40 pointer-events-none"
          >
            {/* Ambient Halo (highly blurred soft glow radiating inwards/outwards) */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "200% 0%"]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundImage: "linear-gradient(to right, #38bdf8, #818cf8, #c084fc, #f472b6, #fb7185, #fb923c, #38bdf8)",
                backgroundSize: "200% auto",
              } as any}
              className="absolute inset-0 opacity-45 blur-[32px] border-[16px] border-transparent"
            />
            
            {/* Sharp Apple AI Glowing Border Outline */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "200% 0%"]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundImage: "linear-gradient(to right, #38bdf8, #818cf8, #c084fc, #f472b6, #fb7185, #fb923c, #38bdf8)",
                backgroundSize: "200% auto",
                border: "4px solid transparent",
                WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "destination-out",
                maskComposite: "exclude",
              } as any}
              className="absolute inset-0 opacity-90"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exquisite soft animated "liquid glass" morphing mesh gradient backdrop (skiper84 dominant style) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Sky Blue Liquid Blob */}
        <motion.div
          animate={{
            x: [0, 90, -70, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.25, 0.9, 1],
            borderRadius: ["42% 58% 70% 30% / 45% 45% 55% 55%", "70% 30% 52% 48% / 60% 40% 60% 40%", "48% 52% 35% 65% / 40% 65% 35% 60%", "42% 58% 70% 30% / 45% 45% 55% 55%"]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-15%] w-[85%] h-[85%] bg-sky-200/50 blur-[100px]"
        />
        {/* Soft Vibrant Cyan Liquid Blob */}
        <motion.div
          animate={{
            x: [0, -80, 90, 0],
            y: [0, 60, -70, 0],
            scale: [1, 0.95, 1.2, 1],
            borderRadius: ["50% 50% 30% 70% / 50% 60% 40% 50%", "30% 70% 70% 30% / 50% 30% 70% 50%", "60% 40% 48% 52% / 45% 55% 45% 55%", "50% 50% 30% 70% / 50% 60% 40% 50%"]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] right-[-10%] w-[80%] h-[80%] bg-cyan-200/45 blur-[90px]"
        />
        {/* Soft Ice Blue Center Liquid Blob */}
        <motion.div
          animate={{
            x: [50, -50, 50],
            y: [-30, 30, -30],
            scale: [0.9, 1.15, 0.9],
            borderRadius: ["40% 60% 50% 50% / 40% 40% 60% 60%", "60% 40% 60% 40% / 50% 60% 40% 50%", "40% 60% 50% 50% / 40% 40% 60% 60%"]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[15%] w-[60%] h-[60%] bg-blue-100/60 blur-[110px]"
        />
        {/* Pastel Lavender Blob (subtle overlay color transition) */}
        <motion.div
          animate={{
            x: [-60, 40, -60],
            y: [40, -40, 40],
            scale: [0.95, 1.1, 0.95],
            borderRadius: ["45% 55% 60% 40% / 40% 50% 50% 60%", "50% 50% 40% 60% / 60% 40% 60% 40%", "45% 55% 60% 40% / 40% 50% 50% 60%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[-5%] w-[65%] h-[65%] bg-purple-100/40 blur-[100px]"
        />

        {/* Heavy Liquid Frosted Glass Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[110px] saturate-[170%]" />
        
        {/* Subtle radial glass highlight shine */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.45)_0%,transparent_60%)] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10 flex flex-col items-center justify-center flex-1">
        <AnimatePresence mode="wait">
          
          {/* STATE 1: IDLE */}
          {chatState === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center space-y-12 text-center"
            >
              <div className="space-y-4">
                
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-800 leading-none">
                  Faro AI Guide
                </h2>
                <p className="text-slate-500 text-sm md:text-base font-semibold max-w-md mx-auto">
                  Ask about beaches, gastronomy, hotels, or monuments. The AI only responds to Faro/Algarve queries.
                </p>
              </div>

              {/* Minimalist Premium Pill Input Bar (Exact clone of user references) */}
              <div className="w-full max-w-xl bg-white rounded-full shadow-[0_15px_45px_rgba(0,0,0,0.04)] border border-slate-100/80 p-2 flex items-center gap-3 h-16 group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-slate-200">
                <div className="pl-3">
                  <Plus className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" size={20} />
                </div>
                
                <input
                  type="text"
                  placeholder="Ask anything..."
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleSendMessage(inputValue);
                  }}
                  className="flex-1 bg-transparent px-2 text-slate-800 placeholder-slate-400 focus:outline-none text-base font-semibold"
                />

                <div className="flex items-center pr-1.5">
                  <button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim()}
                    className="w-11 h-11 rounded-full bg-slate-950 text-white flex items-center justify-center cursor-pointer hover:bg-slate-850 active:scale-95 transition-all shadow-md shrink-0 disabled:pointer-events-none"
                  >
                    <ArrowUp size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Suggestions Chips */}
              <div className="flex flex-wrap justify-center gap-3 pt-2 select-none">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="px-4 py-2 rounded-full bg-white/40 border border-white/80 hover:bg-white/70 active:scale-95 transition-all text-[10px] font-black text-slate-600 tracking-wider uppercase shadow-sm cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STATE 2: LOADING (With Google-style search bar loading border and rotating loading texts) */}
          {chatState === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center space-y-8 text-center"
            >
              {/* Google-style glowing border search bar */}
              <div className="relative w-full max-w-xl p-[2px] rounded-full overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.04)] border border-slate-100/80">
                {/* Flowing Google Gradient Background */}
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 0%", "200% 0%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundImage: "linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4)",
                    backgroundSize: "200% auto",
                    position: "absolute",
                    inset: 0,
                    borderRadius: "9999px",
                  } as any}
                />
                
                {/* Search Bar Inner Content (White background) */}
                <div className="relative w-full bg-white rounded-full p-2 flex items-center gap-3 h-16 shadow-[0_10px_30px_rgba(66,133,244,0.06)]">
                  <div className="pl-3">
                    <Plus className="text-slate-300 shrink-0" size={20} />
                  </div>
                  
                  <input
                    type="text"
                    disabled
                    value={userQuery}
                    className="flex-1 bg-transparent px-2 text-slate-500 text-base font-semibold focus:outline-none select-none cursor-not-allowed"
                  />

                  <div className="flex items-center pr-1.5">
                    <button
                      disabled
                      className="w-11 h-11 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center shrink-0 cursor-not-allowed"
                    >
                      <ArrowUp size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Centered rotating loading text */}
              <motion.p
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="text-slate-500 text-lg md:text-xl font-semibold tracking-tight"
              >
                {loadingText}
              </motion.p>
            </motion.div>
          )}

          {/* STATE 3: RESPONSE */}
          {chatState === 'response' && (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl flex flex-col items-center space-y-10 text-center"
            >
              {/* Previous query highlight */}
              <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                Asked: "{userQuery}"
              </div>

              {/* Minimalist Centered Responsive Glassmorphic Card */}
              <div className="relative px-8 py-8 md:px-12 md:py-10 rounded-[2.2rem] bg-white/45 backdrop-blur-md border border-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.03)] max-w-2xl">
                <TypographicResponse text={aiResponse} />
              </div>

              {/* Circular plus button to reset / ask again */}
              <div className="flex flex-col items-center gap-2">
                <motion.button
                  onClick={resetChat}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-slate-950 text-white flex items-center justify-center cursor-pointer hover:bg-slate-850 shadow-lg"
                >
                  <Plus size={24} strokeWidth={2.5} />
                </motion.button>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                  Ask another question
                </span>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};

// Words Preloader Component (Skiper UI inspired)
const WordsPreloader = ({ onComplete }: { onComplete: () => void }) => {
  const [index, setIndex] = useState(0);
  const words = [
    "Olá",              // PT
    "Welcome",          // EN
    "Bienvenido",       // ES
    "Bienvenue",        // FR
    "Willkommen",       // DE
    "Welkom",           // NL
    "Benvenuto",        // IT
    "欢迎",             // ZH
    "Добро пожаловать", // RU
  ];

  useEffect(() => {
    if (index === words.length - 1) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timeout);
    }

    const interval = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 280);

    return () => clearTimeout(interval);
  }, [index]);

  const slideUp = {
    initial: {
      top: 0
    },
    exit: {
      top: "-100vh",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any, delay: 0.1 }
    }
  };

  const pathVariants = {
    initial: {
      d: "M0 0 L100 0 L100 100 Q50 150 0 100 L0 0",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }
    },
    exit: {
      d: "M0 0 L100 0 L100 100 Q50 100 0 100 L0 0",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <motion.div 
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#38bdf8] to-[#0ea5e9] text-white overflow-hidden"
    >
      {/* Translucent glowing background circles to match the header sky theme */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/25 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/10 blur-[80px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping absolute -left-8" />
        <span className="w-2.5 h-2.5 rounded-full bg-white absolute -left-8" />
        
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-black tracking-tight drop-shadow-md"
        >
          {words[index]}
        </motion.p>
      </div>

      <svg className="absolute top-0 w-full h-[calc(100%+300px)] pointer-events-none fill-[#0ea5e9] z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path 
          variants={pathVariants}
          initial="initial"
          exit="exit"
        />
      </svg>
    </motion.div>
  );
};

const GradientCursor = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" as any }}
    className="inline-block w-[4px] h-[1.15em] ml-1 bg-gradient-to-b from-[#38bdf8] via-[#ec4899] to-[#fbbf24] rounded-full align-middle shadow-[0_0_10px_rgba(236,72,153,0.3)]"
  />
);

export default function Home() {
  const [preloaderActive, setPreloaderActive] = useState(true);
  const [heroIntroState, setHeroIntroState] = useState<'waiting' | 'typing' | 'completed'>('waiting');
  const [typedLine1, setTypedLine1] = useState('');
  const [typedLine2, setTypedLine2] = useState('');

  useEffect(() => {
    if (preloaderActive || heroIntroState === 'typing') {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [preloaderActive, heroIntroState]);

  const line1Text = "You capture the beauty.";
  const line2Text = "We handle the rest.";

  useEffect(() => {
    if (heroIntroState !== 'typing') return;

    let interval: NodeJS.Timeout;
    let intervalLine2: NodeJS.Timeout;

    // Delay typing by 1200ms to allow the words preloader slide-up transition to fully complete!
    const delayTimeout = setTimeout(() => {
      let charIdx = 0;
      let isTypingLine1 = true;
      
      interval = setInterval(() => {
        if (isTypingLine1) {
          if (charIdx < line1Text.length) {
            setTypedLine1(line1Text.slice(0, charIdx + 1));
            charIdx++;
          } else {
            isTypingLine1 = false;
            charIdx = 0;
            clearInterval(interval);
            setTimeout(() => {
              startLine2();
            }, 350);
          }
        }
      }, 65);

      const startLine2 = () => {
        intervalLine2 = setInterval(() => {
          if (charIdx < line2Text.length) {
            setTypedLine2(line2Text.slice(0, charIdx + 1));
            charIdx++;
          } else {
            clearInterval(intervalLine2);
            setTimeout(() => {
              setHeroIntroState('completed');
            }, 900);
          }
        }, 65);
      };
    }, 1400);

    return () => {
      clearTimeout(delayTimeout);
      if (interval) clearInterval(interval);
      if (intervalLine2) clearInterval(intervalLine2);
    };
  }, [heroIntroState]);

  const ctaRef = useScrollAnimation();
  const [iosSubmitted, setIosSubmitted] = useState(false);
  const [androidSubmitted, setAndroidSubmitted] = useState(false);

  // Parallax Hero
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="min-h-screen bg-gray-50 selection:bg-sky-200 overflow-x-clip">
      <AnimatePresence mode="wait">
        {preloaderActive && (
          <WordsPreloader onComplete={() => {
            setPreloaderActive(false);
            setHeroIntroState('typing');
          }} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {heroIntroState === 'completed' && <Navbar />}
      </AnimatePresence>

      {/* Hero Section (Roamy Style) */}
      <section className="relative min-h-[110svh] flex items-start md:items-center justify-center overflow-hidden roamy-sky-bg pt-28 md:pt-32 pb-48">
        {/* Sky Enhancements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/20 blur-[120px] rounded-full pointer-events-none" />
          {heroIntroState === 'completed' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <MovingClouds count={6} speedRange={[70, 110]} opacityRange={[0.2, 0.4]} />
              <AnimatedBirds />
            </motion.div>
          )}
        </div>

        <motion.div
          style={{ y: y2, opacity: opacityText }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10 max-w-4xl mx-auto mt-2 md:mt-3"
          >
            <div className="space-y-2 select-none">
              {heroIntroState !== 'completed' ? (
                <>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl min-h-[2.1em] text-center">
                    {typedLine1.slice(0, 11)}
                    {typedLine1.length > 11 && <br />}
                    {typedLine1.slice(11)}
                    {heroIntroState === 'typing' && typedLine2 === '' && <GradientCursor />}
                  </h1>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-vartigo text-sky-100/90 drop-shadow-xl min-h-[1.2em] text-center">
                    {typedLine2}
                    {heroIntroState === 'typing' && typedLine2 !== '' && <GradientCursor />}
                  </h2>
                </>
              ) : (
                <>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl text-center">
                    You capture <br />
                    the beauty.
                  </h1>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-vartigo text-sky-100/90 drop-shadow-xl text-center">
                    We handle the rest.
                  </h2>
                </>
              )}
            </div>

            {/* Store Buttons - White pill style */}
            {heroIntroState === 'completed' && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              >
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
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Smooth gradient transition — blue sky fading to white */}
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(249,250,251,0.3) 30%, rgba(249,250,251,0.7) 60%, rgb(249,250,251) 100%)' }} />
      </section>

      {/* "Everything you need" App Showcase Section */}
      <AppShowcaseSection />

      {/* Interactive AI Chat Section */}
      <FaroAIChat />

      {/* Continuation Carousel of App Screenshots */}
      <ScreensCarouselSection />

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
                <PreOrderForm type="android" submitted={androidSubmitted} onSubmit={() => setAndroidSubmitted(true)} />
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
                <h3 className="text-2xl md:text-3xl font-medium text-white/40 tracking-tight">
                  Developed for the <br className="hidden md:block" />
                  <span className="text-white font-black">Faro Next Generation 2026</span>{" "}
                  <span className="text-white/40 font-medium">Hackathon</span>
                </h3>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-16 md:gap-24">
                <motion.a
                  href="https://www.cm-faro.pt/pt/Default.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 1, 0.36, 1] }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center gap-4 group cursor-pointer"
                  aria-label="Municipality of Faro website"
                >
                  <div className="h-16 md:h-20 transition-all duration-500 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100">
                    <img src="/cmFaro.png" alt="Municipality of Faro" className="h-full object-contain" />
                  </div>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">Municipality of Faro</span>
                </motion.a>

                <motion.a
                  href="https://dypall.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.21, 1, 0.36, 1] }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center gap-4 group cursor-pointer"
                  aria-label="DYPALL Network website"
                >
                  <div className="h-12 md:h-16 transition-all duration-500 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100">
                    <img src="/dypall.png" alt="DYPALL Network" className="h-full object-contain" />
                  </div>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">DYPALL Network</span>
                </motion.a>
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
                  © 2026 DiscoverFaro.
                </div>
              </div>

              <div className="flex items-center gap-10 text-[10px] font-bold tracking-widest uppercase">
                <a href="mailto:al35126@agr-tc.pt" className="hover:text-sky-300 transition-colors text-white/80">Support</a>
                <Link href="/terms" className="hover:text-sky-300 transition-colors text-white/80">Terms</Link>
                <Link href="/privacy" className="hover:text-sky-300 transition-colors text-white/80">Privacy</Link>
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
