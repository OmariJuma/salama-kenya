'use client';

export default function AlertTicker() {
  return (
    <div className="bg-on-surface text-white py-3 border-y border-outline-variant/20 overflow-hidden relative">
      <div className="max-w-container-max-width mx-auto px-margin-desktop flex items-center relative z-10">
        <span className="bg-secondary text-on-secondary text-[10px] font-bold px-2 py-0.5 rounded mr-4 shrink-0 uppercase tracking-tighter">
          Live Alerts
        </span>
        <div className="ticker-container w-full">
          <p className="ticker-text text-caption font-semibold">
            <span className="mx-8">• NAIROBI: New mobile money reversal scam targeting traders</span>
            <span className="mx-8">• MOMBASA: Fake land titles circulating in Likoni area</span>
            <span className="mx-8">• ELDORET: Overseas job agency "Global Works" flagged as fraudulent</span>
            <span className="mx-8">• KISUMU: Digital loan apps requesting upfront "activation fees" are SCAMS</span>
          </p>
        </div>
      </div>
    </div>
  );
}