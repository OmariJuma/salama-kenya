export default function SafetyChecklist() {
  return (
    <div className="bg-white rounded-3xl p-stack-lg border border-outline-variant/30 shadow-sm">
      <h3 className="font-headline-md text-headline-md mb-6">Civic Safety Checklists</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 hover:bg-surface-container rounded-xl transition-colors cursor-pointer group">
          <span className="material-symbols-outlined text-primary">smartphone</span>
          <div>
            <h4 className="font-bold">Mobile Money Security</h4>
            <p className="text-caption text-on-surface-variant">How to handle "reversal" calls and SMS.</p>
          </div>
          <span className="material-symbols-outlined ml-auto text-outline-variant group-hover:text-primary">
            chevron_right
          </span>
        </div>
        <div className="flex items-start gap-4 p-4 hover:bg-surface-container rounded-xl transition-colors cursor-pointer group">
          <span className="material-symbols-outlined text-primary">home_work</span>
          <div>
            <h4 className="font-bold">Land &amp; Property Verification</h4>
            <p className="text-caption text-on-surface-variant">Steps to verify title deeds through the Ardhi portal.</p>
          </div>
          <span className="material-symbols-outlined ml-auto text-outline-variant group-hover:text-primary">
            chevron_right
          </span>
        </div>
        <div className="flex items-start gap-4 p-4 hover:bg-surface-container rounded-xl transition-colors cursor-pointer group">
          <span className="material-symbols-outlined text-primary">work_outline</span>
          <div>
            <h4 className="font-bold">Job Offer Verification</h4>
            <p className="text-caption text-on-surface-variant">Identifying legitimate recruitment agencies.</p>
          </div>
          <span className="material-symbols-outlined ml-auto text-outline-variant group-hover:text-primary">
            chevron_right
          </span>
        </div>
      </div>
    </div>
  );
}