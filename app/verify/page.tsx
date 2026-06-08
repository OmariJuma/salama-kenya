'use client';

import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';

type FilterType = 'phone' | 'business' | 'website' | 'social';

export default function VerifyPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('phone');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const filters = [
    { id: 'phone', label: 'Phone Number', icon: 'call' },
    { id: 'business', label: 'Business Name', icon: 'store' },
    { id: 'website', label: 'Website', icon: 'language' },
    { id: 'social_media', label: 'Social Media', icon: 'share' },
  ] as const;

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setError('');
    setHasSearched(true);
    
    try {
      // Map frontend filter 'social' to 'social_media' if needed, though we already changed the ID above
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to search');
      }
      
      // Merge searchIndex and standalone reports for display
      const indexResults = (data.results?.searchIndex || []).map((idx: any) => ({
        id: idx.id,
        title: idx.subject,
        identifier: idx.subjectType,
        risk: idx.riskScore,
        reports: idx.totalReports,
        lastReported: new Date(idx.lastReportedAt).toLocaleDateString(),
        icon: idx.subjectType === 'phone' ? 'call' : idx.subjectType === 'website' ? 'language' : idx.subjectType === 'business' ? 'store' : 'share',
        iconBg: idx.riskScore === 'high' || idx.riskScore === 'critical' ? 'error-container' : idx.riskScore === 'medium' ? 'tertiary-fixed' : 'primary-container',
        iconColor: idx.riskScore === 'high' || idx.riskScore === 'critical' ? 'error' : idx.riskScore === 'medium' ? 'tertiary' : 'on-primary-container',
        isVerified: idx.riskScore === 'low'
      }));
      
      setResults(indexResults);
    } catch (err: any) {
      setError(err.message || 'An error occurred during search');
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskStyles = (risk: string) => {
    switch (risk) {
      case 'critical':
      case 'high':
        return { border: 'border-secondary', bg: 'bg-secondary', text: 'High Risk' };
      case 'medium':
        return { border: 'border-tertiary-container', bg: 'bg-tertiary-container', text: 'Medium Risk' };
      default:
        return { border: 'border-primary', bg: 'bg-primary', text: 'Low Risk' };
    }
  };

  return (
    <PageLayout>
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        {/* Hero Search Section */}
        <section className="mb-stack-lg">
          <div className="text-center mb-10">
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">Verify Before You Trust</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Cross-check phone numbers, websites, or business handles against our national database of reported fraudulent activities.
            </p>
          </div>

          <div className="bg-surface p-6 md:p-10 rounded-xl shadow-md border border-outline-variant max-w-4xl mx-auto">
            <div className="flex flex-col gap-6">
              {/* Filters */}
              <div className="flex flex-wrap gap-3 justify-center">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-full border-2 font-label-md text-label-md flex items-center gap-2 transition-all ${activeFilter === filter.id
                        ? 'border-primary bg-primary text-on-primary'
                        : 'border-outline-variant hover:border-primary hover:text-primary text-on-surface-variant'
                      }`}
                  >
                    <span className="material-symbols-outlined text-sm">{filter.icon}</span>
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">
                  search
                </span>
                <input
                  className="w-full pl-12 pr-32 py-4 rounded-xl border-2 border-outline-variant focus:border-primary focus:ring-0 transition-all text-body-lg font-body-lg outline-none bg-surface-container-low"
                  placeholder="Enter phone number (+254...), URL, or @handle"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-on-primary px-6 py-2 rounded-lg font-bold hover:opacity-90 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Verify Now'}
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Results Section */}
          <div className="lg:col-span-2 space-y-gutter">
            <div className="flex justify-between items-center">
              <h2 className="font-headline-md text-headline-md text-on-surface">Recent Community Flags</h2>
              <a href="#" className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline">
                View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            <div className="grid gap-stack-md">
              {isLoading && (
                <div className="text-center py-8">
                  <div className="inline-block w-8 h-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-2"></div>
                  <p className="text-on-surface-variant font-body-md">Searching records...</p>
                </div>
              )}
              
              {error && (
                <div className="bg-error-container text-on-error-container p-4 rounded-xl">
                  {error}
                </div>
              )}

              {!isLoading && hasSearched && results.length === 0 && !error && (
                <div className="text-center py-8 bg-surface rounded-xl border border-outline-variant">
                  <span className="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
                  <p className="font-headline-md text-on-surface">No reports found</p>
                  <p className="text-on-surface-variant">This entity has not been flagged by the community yet.</p>
                </div>
              )}

              {!isLoading && results.map((result) => {
                const riskStyle = getRiskStyles(result.risk);
                return (
                  <div
                    key={result.id}
                    className={`bg-surface rounded-xl p-stack-md border-l-4 ${riskStyle.border} shadow-sm border-y border-r border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow`}
                  >
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-${result.iconBg} flex items-center justify-center text-${result.iconColor}`}>
                        <span className="material-symbols-outlined">{result.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-headline-md text-[18px] text-on-surface">{result.title}</h3>
                        <p className="font-label-md text-label-md text-on-surface-variant capitalize">{result.identifier.replace('_', ' ')}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`${riskStyle.bg} text-on-secondary px-2 py-0.5 rounded text-[10px] font-bold uppercase`}>
                            {riskStyle.text}
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            {result.isVerified ? result.lastReported : `Last reported: ${result.lastReported}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`font-headline-md ${result.risk === 'high' || result.risk === 'critical' ? 'text-secondary' : result.risk === 'medium' ? 'text-tertiary-container' : 'text-primary'}`}>
                        {result.reports} Reports
                      </span>
                      <button className="text-primary font-label-md text-label-md underline">
                        {result.isVerified ? 'View Credentials' : 'View Details'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-gutter">
            <div className="bg-surface rounded-xl p-6 border border-primary shadow-sm ai-glow">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary">psychology</span>
                <h3 className="font-headline-md text-[18px] text-primary">AI Smart Analysis</h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                Our AI recently identified a spike in <b>'Pre-recorded Customs'</b> voice calls targeting residents in Nairobi. Avoid sharing OTPs over the phone.
              </p>
              <div className="bg-primary-container/10 p-3 rounded-lg border border-primary/20">
                <p className="font-caption text-caption text-primary font-bold">Recommended Action:</p>
                <p className="font-caption text-caption text-on-surface-variant">Block numbers starting with +216 and report them immediately.</p>
              </div>
            </div>

            <div className="bg-surface-container-high rounded-xl p-6 shadow-sm border border-outline-variant">
              <h3 className="font-headline-md text-[18px] text-on-surface mb-4">How it Works</h3>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Search', desc: 'Enter the entity details you want to verify.' },
                  { step: 2, title: 'Analyze', desc: 'Our system checks reports from thousands of Kenyans and official blacklists.' },
                  { step: 3, title: 'Report', desc: 'Help others by reporting your own encounter if it was fraudulent.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-on-surface">{item.title}</p>
                      <p className="font-caption text-caption text-on-surface-variant">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}