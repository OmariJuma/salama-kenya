'use client';

import PageLayout from '@/components/layout/PageLayout';

export default function AlertsPage() {
  const scams = [
    {
      id: 1,
      title: 'New Fake KRA Tax Refund Scam',
      description: "Fraudsters are sending emails with the KRA logo claiming a tax refund is ready. They ask for bank details and PINs via a malicious link...",
      risk: 'high',
      date: 'October 24, 2024',
    },
    {
      id: 2,
      title: 'WhatsApp Account Takeover Warning',
      description: "Users report receiving calls from 'WhatsApp Support' asking for a 6-digit verification code. Providing this code allows hackers to take over your account.",
      risk: 'medium',
      date: 'October 22, 2024',
    },
    {
      id: 3,
      title: 'Fraudsters Impersonating Bank Agents',
      description: "Cold callers are claiming to be from major banks, citing 'suspicious activity' on your account to trick you into revealing mobile banking credentials.",
      risk: 'high',
      date: 'October 21, 2024',
    },
  ];

  const trendingScams = [
    { name: 'Fake Job Offers via Telegram', reports: 120 },
    { name: 'Fake Land Sale Listings', reports: 85 },
    { name: 'Pyramid Scheme Apps', reports: 64 },
  ];

  const safetyTips = [
    'Always verify bank calls by hanging up and dialing the official number on your card.',
    'Enable Two-Factor Authentication (2FA) on all your social media and messaging apps.',
    'Never share your M-PESA or bank PIN with anyone, including staff from those companies.',
  ];

  return (
    <PageLayout>
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg">
        {/* Breaking Alert Banner */}
        <div className="mb-stack-lg bg-secondary-container text-on-secondary-container p-4 rounded-xl flex items-center space-x-4 animate-pulse">
          <span className="material-symbols-outlined text-3xl">warning</span>
          <div className="flex-1">
            <span className="font-bold font-label-md">BREAKING ALERT:</span>
            <span className="font-body-md ml-2">
              Massive Phishing Wave targeting M-PESA users through fake 'Account Locked' SMS notifications. Do not click any links!
            </span>
          </div>
          <button className="bg-on-secondary-container text-secondary px-4 py-1 rounded-full text-sm font-bold">
            Details
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Feed Section */}
          <section className="lg:col-span-8">
            <div className="flex items-center justify-between mb-stack-md">
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Latest Scam Feed</h1>
              <div className="flex items-center space-x-2 bg-surface-container px-3 py-1 rounded-full border border-outline-variant">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                <span className="font-label-md text-label-md">Filter</span>
              </div>
            </div>

            <div className="space-y-stack-md">
              {scams.map((scam) => (
                <div
                  key={scam.id}
                  className={`bg-surface p-6 rounded-xl scam-card-shadow risk-${scam.risk} hover:scale-[1.01] transition-transform cursor-pointer`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`${scam.risk === 'high' ? 'bg-secondary' : 'bg-secondary-fixed'} text-on-secondary px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase`}>
                      {scam.risk} RISK
                    </span>
                    <span className="font-caption text-on-surface-variant">{scam.date}</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{scam.title}</h3>
                  <p className="text-on-surface-variant mb-4 font-body-md">{scam.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <span className="material-symbols-outlined text-primary text-xl">share</span>
                      <span className="material-symbols-outlined text-primary text-xl">bookmark</span>
                    </div>
                    <a href="#" className="font-label-md text-primary flex items-center hover:underline">
                      Read Full Analysis <span className="material-symbols-outlined ml-1">chevron_right</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-stack-lg border-2 border-primary text-primary py-3 rounded-xl font-bold hover:bg-primary hover:text-on-primary transition-all">
              Load More Scams
            </button>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-stack-lg">
            {/* Trending Scams */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center">
                <span className="material-symbols-outlined mr-2 text-secondary">trending_up</span>
                Trending Scams
              </h2>
              <ul className="space-y-4">
                {trendingScams.map((scam, index) => (
                  <li key={index}>
                    <div className="space-y-1">
                      <div className="font-label-md text-on-surface hover:text-primary transition-colors cursor-pointer">
                        {index + 1}. {scam.name}
                      </div>
                      <div className="font-caption text-on-surface-variant">Reported {scam.reports} times today</div>
                    </div>
                    {index < trendingScams.length - 1 && <hr className="border-outline-variant mt-4" />}
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Analysis Promo */}
            <div className="bg-primary p-6 rounded-xl text-on-primary relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-headline-md text-headline-md mb-2">Unsure of a link?</h3>
                <p className="font-body-md mb-4 text-primary-fixed">
                  Our AI Analyzer can scan URLs or SMS texts to detect fraudulent patterns in seconds.
                </p>
                <button className="bg-primary-fixed text-on-primary-fixed px-6 py-2 rounded-lg font-bold">
                  Try AI Scan
                </button>
              </div>
              <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[120px] opacity-10">
                psychology
              </span>
            </div>

            {/* Safety Tips */}
            <div className="bg-surface-container-high p-6 rounded-xl">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center">
                <span className="material-symbols-outlined mr-2 text-primary">verified_user</span>
                Safety Tips
              </h2>
              <div className="space-y-stack-md">
                {safetyTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-primary text-on-primary p-1 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <p className="font-body-md text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Card */}
            <div className="bg-surface p-6 rounded-xl border border-outline-variant card-shadow">
              <img
                alt="Newsletter"
                className="w-full h-32 object-cover rounded-lg mb-4"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACXn4gdERt-bV0HCXV7d6uCEMH57hNgVsvHvPHhze0iRSQBQPol9chzb5dywFL5tHrZIuQXoshjSyGBNGbvABYO5Ps3iUMsP7F4WzkSJ_roUUY3dYGppZWDPM2vphSVl6SaHflSA0ZCu1CmeG4ZfyCMVTaSqjX-ZvjMc2-IdB3LqYLn6vFGa7ZX-XX7Efy9ygEIK66I6EFGYcJJP5OKo3vGLescZRwDIsPpkUpRx88sIRx5mVgg-vkP3FjYY9fLZlKmv_XxlKsvg"
              />
              <h4 className="font-label-md mb-2">Stay Informed Weekly</h4>
              <p className="font-caption mb-4">Get the latest fraud trends delivered to your inbox every Monday.</p>
              <input
                className="w-full mb-3 p-2 rounded-lg border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Email address"
                type="email"
              />
              <button className="w-full bg-on-surface text-surface py-2 rounded-lg font-bold text-sm">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </PageLayout>
  );
}