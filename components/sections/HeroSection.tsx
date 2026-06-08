export default function HeroSection() {
  return (
    <section className="bg-primary text-on-primary py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 100 L100 0 V100 H0 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="relative z-10 max-w-container-max-width mx-auto px-margin-desktop text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/20">
          <span className="material-symbols-outlined text-primary-fixed-dim text-sm">
            verified_user
          </span>
          <span className="font-label-md text-xs uppercase tracking-wider">
            Official Civic Protection Platform
          </span>
        </div>
        <h1 className="font-headline-xl text-headline-xl mb-6 leading-tight">
          Stop Fraud. <span className="text-primary-fixed">Protect Your Wealth.</span>
        </h1>
        <p className="font-body-lg text-body-lg max-w-2xl mx-auto opacity-90 mb-0">
          Immediate verification and reporting tools for Kenyans. If something feels wrong, check it here instantly.
        </p>
      </div>
    </section>
  );
}