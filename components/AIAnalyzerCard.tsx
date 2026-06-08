export default function AIAnalyzerCard() {
  return (
    <div className="md:col-span-1 bg-inverse-surface text-white rounded-3xl p-stack-lg action-card-shadow flex flex-col h-full">
      <div className="w-14 h-14 bg-white/10 text-primary-fixed-dim rounded-2xl flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-3xl">psychology</span>
      </div>
      <h3 className="font-headline-md text-headline-md mb-3 text-white">AI Scam Analyzer</h3>
      <p className="text-white/70 text-body-md mb-8 flex-grow">
        Paste a suspicious SMS message or email content. Our AI checks for known deceptive patterns.
      </p>
      <div className="space-y-4">
        <div className="bg-white/5 border border-white/20 rounded-xl p-4 h-32 flex items-center justify-center text-white/40 cursor-text hover:bg-white/10 transition-colors">
          <p className="text-caption text-center">Click to paste suspicious text here for instant analysis...</p>
        </div>
        <button className="w-full bg-primary-fixed text-on-primary-fixed py-4 rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">analytics</span>
          Analyze Risk Level
        </button>
      </div>
    </div>
  );
}