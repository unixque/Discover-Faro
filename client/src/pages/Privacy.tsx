import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Privacy() {
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
              Privacy Policy
            </h1>
            <p className="text-xs text-zinc-400 mt-3 font-mono">
              Last updated: May 19, 2026
            </p>
          </div>

          {/* Legal Text */}
          <div className="space-y-10 text-sm md:text-[15px] leading-relaxed text-zinc-650">
            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 tracking-tight">1. Information We Collect</h2>
              <p>
                At DiscoverFaro, we value your privacy. We collect very limited personal information to deliver our services. Specifically, if you sign up for our waitlist or pre-order alerts, we collect:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-2 text-zinc-650">
                <li><strong className="text-zinc-950 font-semibold">Email Address:</strong> Used solely to send updates, waitlist positions, and release notifications.</li>
                <li><strong className="text-zinc-950 font-semibold">Device Information:</strong> Technical log data to optimize the platform experience.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 tracking-tight">2. How We Use Your Data</h2>
              <p>
                The collected information is used purely for support and operational purposes:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-2 text-zinc-650">
                <li>To manage your waitlist placement and pre-order registration.</li>
                <li>To provide responsive technical support and answer email inquiries.</li>
                <li>To maintain application safety, fix bugs, and refine UI performance.</li>
                <li>We do not sell, rent, or share your email address or usage details with third-party advertisers.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 tracking-tight">3. Third-Party Integrations & APIs</h2>
              <p>
                Our application integrates deep-linking navigation with Google Maps and Apple Maps. When you request route exploration, coordinates are passed directly to your native mapping application. Please refer to their respective privacy terms regarding location tracking.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 tracking-tight">4. Data Retention & Security</h2>
              <p>
                We retain your email waitlist registration details only for as long as necessary to fulfill the operational launch of DiscoverFaro. We leverage industry-standard hosting security and encryption to safeguard your data against unauthorized access, loss, or alteration.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-zinc-950 tracking-tight">5. Your Rights</h2>
              <p>
                You hold full control over your personal data. At any point, you have the right to request access to the email address we hold, ask for its immediate deletion from our database, or opt-out of waitlist updates. Simply contact us at{" "}
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
            <span className="hover:text-zinc-900 transition-colors cursor-pointer" onClick={() => setLocation("/terms")}>Terms of Service</span>
            <span className="hover:text-zinc-900 transition-colors cursor-pointer" onClick={handleGoHome}>Home</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
