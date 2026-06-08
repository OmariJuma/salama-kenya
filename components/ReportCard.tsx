export default function ReportCard() {
  return (
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
      <button className="w-full bg-secondary text-on-secondary py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-secondary-container transition-all active:scale-[0.98]">
        Start Incident Report
        <span className="material-symbols-outlined">flag</span>
      </button>
    </div>
  );
}