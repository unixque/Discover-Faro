import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Terms() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-white text-zinc-800 font-sans antialiased selection:bg-zinc-100 selection:text-black">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-zinc-200/60">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleGoHome}>
            <div className="w-8 h-8 flex items-center justify-center overflow-hidden bg-zinc-50 rounded border border-zinc-100 p-0.5">
              <img src="/Logonbg2.png" alt="DiscoverFaro Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg font-bold text-zinc-900 tracking-tight">DiscoverFaro</span>
          </div>

          <button
            onClick={handleGoHome}
            className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1.5 uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <main className="space-y-12">
          {/* Header Title */}
          <div className="border-b border-zinc-200 pb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-zinc-400 mt-3 font-mono">
              Last updated: May 19, 2026
            </p>
          </div>

          {/* Legal Text */}
          <div className="space-y-10 text-sm md:text-[15px] leading-relaxed text-zinc-650">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 tracking-tight">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the DiscoverFaro application or landing page, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, users, and others who access the service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 tracking-tight">2. Description of Service</h2>
              <p>
                DiscoverFaro is an AI-powered travel assistant built to enrich tourism in Faro, Portugal. Key features include AI Monument Recognition, route planning, map integration with Google Maps and Apple Maps, and personalized recommendations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 tracking-tight">3. User Conduct & Accounts</h2>
              <p>
                To pre-order or join the waitlist, you may provide your email address. You agree to provide accurate, current, and complete information. You are solely responsible for keeping your credentials secure and agree not to share your access. We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 tracking-tight">4. Intellectual Property</h2>
              <p>
                All content, graphics, interactive visual elements, code, custom layouts, and branding elements are the exclusive intellectual property of DiscoverFaro and its partners. Any unauthorized replication, reproduction, or redistribution of these assets is strictly prohibited.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 tracking-tight">5. Limitation of Liability</h2>
              <p>
                DiscoverFaro acts as a cultural guide and digital planner. While we aim to provide accurate navigation details, opening hours, and monument history, we are not liable for any disruptions, delays, closed attractions, or safety hazards encountered during your physical exploration of Faro. Use all navigation integrations responsibly and observe real-world signage.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 tracking-tight">6. Contact Information</h2>
              <p>
                If you have any questions, feedback, or inquiries regarding these Terms of Service, please reach out to our team at{" "}
                <a href="mailto:al35126@agr-tc.pt" className="text-zinc-950 font-medium underline underline-offset-4 hover:text-sky-600 transition-colors">
                  al35126@agr-tc.pt
                </a>.
              </p>
            </section>
          </div>
        </main>

        {/* Minimal Footer */}
        <footer className="mt-24 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <span>© 2026 DiscoverFaro.</span>
          <div className="flex gap-6">
            <span className="hover:text-zinc-900 transition-colors cursor-pointer" onClick={() => setLocation("/privacy")}>Privacy Policy</span>
            <span className="hover:text-zinc-900 transition-colors cursor-pointer" onClick={handleGoHome}>Home</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
