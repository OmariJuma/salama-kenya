export default function EducationSection() {
  return (
    <section className="py-16 bg-surface-container-low border-t border-outline-variant/30">
      <div className="max-w-container-max-width mx-auto px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline-lg text-headline-lg mb-6">Your Safety is Our Priority</h2>
            <p className="font-body-lg text-on-surface-variant mb-8">
              Salama Kenya is an independent civic platform dedicated to protecting Kenyans from the rising wave of digital fraud. 
              We leverage data and community reporting to keep our economy safe.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-4 rounded-xl border border-outline-variant/20">
                <p className="text-headline-md font-bold text-primary">85k+</p>
                <p className="text-caption font-semibold uppercase text-on-surface-variant">Reports Filed</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-outline-variant/20">
                <p className="text-headline-md font-bold text-primary">1.2M</p>
                <p className="text-caption font-semibold uppercase text-on-surface-variant">Active Users</p>
              </div>
            </div>
            <a className="inline-flex items-center gap-2 text-primary font-bold hover:underline" href="#">
              Learn how we protect your data
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>

          <div className="bg-white rounded-3xl p-stack-lg border border-outline-variant/30 shadow-sm">
            <h3 className="font-headline-md text-headline-md mb-6">Civic Safety Checklists</h3>
            <div className="space-y-4">
              {[
                { icon: 'smartphone', title: 'Mobile Money Security', desc: 'How to handle "reversal" calls and SMS.' },
                { icon: 'home_work', title: 'Land & Property Verification', desc: 'Steps to verify title deeds through the Ardhi portal.' },
                { icon: 'work_outline', title: 'Job Offer Verification', desc: 'Identifying legitimate recruitment agencies.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 hover:bg-surface-container rounded-xl transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-caption text-on-surface-variant">{item.desc}</p>
                  </div>
                  <span className="material-symbols-outlined ml-auto text-outline-variant group-hover:text-primary">
                    chevron_right
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}