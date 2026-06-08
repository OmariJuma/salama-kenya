'use client';

export default function SearchVerifyCard() {
  return (
    <div className="md:col-span-1 bg-white rounded-3xl p-stack-lg border border-outline-variant/30 action-card-shadow flex flex-col h-full">
      <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-3xl">search_check</span>
      </div>
      <h3 className="font-headline-md text-headline-md mb-3 text-primary">Search &amp; Verify</h3>
      <p className="text-on-surface-variant text-body-md mb-8 flex-grow">
        Check any phone number, business, or SACCO name against our national fraud database.
      </p>
      <div className="space-y-3">
        <div className="relative group">
          <input
            className="w-full h-14 bg-surface-container border-2 border-transparent focus:border-primary focus:ring-0 rounded-xl px-4 pr-12 transition-all outline-none"
            placeholder="Enter name or +254..."
            type="text"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">arrow_circle_right</span>
          </button>
        </div>
        <p className="text-caption text-on-surface-variant italic">e.g., +254 712 345 678 or "Ushirika SACCO"</p>
      </div>
    </div>
  );
}