import Link from 'next/link';

export default function ActionGrid() {
  return (
    <section className="py-12 md:py-20 bg-surface">
      <div className="max-w-container-max-width mx-auto px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Search & Verify Card */}
          <div className="md:col-span-1 bg-white rounded-3xl p-stack-lg border border-outline-variant/30 action-card-shadow flex flex-col h-full">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">search_check</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-3 text-primary">Search &amp; Verify</h3>
            <p className="text-on-surface-variant text-body-md mb-8 flex-grow">
              Check any phone number, business, or SACCO name against our national fraud database.
            </p>
            <Link href="/verify">
              <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:bg-primary-container hover:text-on-primary-container transition-all">
                Start Verification
              </button>
            </Link>
          </div>

          {/* Report a Scam Card */}
          <div className="md:col-span-1 bg-white rounded-3xl p-stack-lg border-2 border-secondary/20 action-card-shadow flex flex-col h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-9xl text-secondary">warning</span>
            </div>
            <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                report
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-3 text-secondary">Report an Incident</h3>
            <p className="text-on-surface-variant text-body-md mb-8 flex-grow">
              Been targeted? Reporting immediately helps block fraud accounts and warns others in real-time.
            </p>
            <Link href="/report">
              <button className="w-full bg-secondary text-on-secondary py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-secondary-container transition-all active:scale-[0.98]">
                Start Incident Report
                <span className="material-symbols-outlined">flag</span>
              </button>
            </Link>
          </div>

          {/* AI Scam Analyzer Card */}
          <div className="md:col-span-1 bg-inverse-surface text-white rounded-3xl p-stack-lg action-card-shadow flex flex-col h-full">
            <div className="w-14 h-14 bg-white/10 text-primary-fixed-dim rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl">psychology</span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-3 text-white">AI Scam Analyzer</h3>
            <p className="text-white/70 text-body-md mb-8 flex-grow">
              Paste a suspicious SMS message or email content. Our AI checks for known deceptive patterns.
            </p>
            <Link href="/ai-analyzer">
              <button className="w-full bg-primary-fixed text-on-primary-fixed py-4 rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">analytics</span>
                Analyze Risk Level
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}