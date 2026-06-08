export default function EmergencyCTA() {
  return (
    <div className="max-w-container-max-width mx-auto px-margin-desktop text-center">
      <h2 className="font-headline-xl text-headline-xl mb-6">Need Immediate Help?</h2>
      <p className="font-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto">
        If you've just lost money, contact your bank and report to the DCI cybercrime unit immediately. 
        Use our directory for direct contacts.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button className="bg-on-surface text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-primary transition-all">
          <span className="material-symbols-outlined">call</span>
          Emergency Directory
        </button>
        <button className="bg-surface-container text-on-surface border border-outline-variant px-10 py-4 rounded-full font-bold hover:bg-surface-container-high transition-all">
          Download Offline Guide
        </button>
      </div>
    </div>
  );
}