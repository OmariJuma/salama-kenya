'use client';

import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';

export default function AIAnalyzerPage() {
  const [message, setMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleAnalyze = async () => {
    if (!message.trim()) {
      alert('Please paste a message or upload a screenshot to analyze.');
      return;
    }

    setIsAnalyzing(true);
    setResult(null);
    setError('');

    try {
      const response = await fetch('/api/checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputType: 'text', rawInput: message, language: 'en' }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze message');
      }
      
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <PageLayout>
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop w-full">
        {/* Hero Title */}
        <section className="mb-stack-lg">
          <h2 className="font-headline-xl text-headline-xl text-primary mb-2">AI Scam Analyzer</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Protect yourself from digital fraud. Our advanced AI scans messages, SMS, and screenshots to detect
            manipulative patterns and malicious links commonly used by scammers in Kenya.
          </p>
        </section>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
          {/* Input Section */}
          <div className="xl:col-span-2 space-y-gutter">
            <div className="bg-white p-gutter rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant">
              <label className="block font-label-md text-label-md mb-stack-sm text-on-surface">
                Paste a WhatsApp message or SMS
              </label>
              <textarea
                className="w-full h-48 p-4 rounded-lg border-2 border-surface-container-highest focus:border-primary focus:ring-0 transition-colors font-body-md bg-surface-container-lowest"
                placeholder="e.g. 'Dear customer, your account has been suspended. Click here to verify...'"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="bg-white p-gutter rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-low transition-colors group">
                <span className="material-symbols-outlined text-4xl text-outline mb-2 group-hover:text-primary transition-colors">
                  cloud_upload
                </span>
                <span className="font-label-md text-label-md text-on-surface">Upload a Screenshot</span>
                <span className="font-caption text-caption text-on-surface-variant mt-1">PNG, JPG or JPEG (Max 5MB)</span>
              </div>

              <button
                onClick={handleAnalyze}
                className="bg-primary text-on-primary rounded-xl font-bold text-headline-md flex flex-col items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg min-h-[120px]"
              >
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  bolt
                </span>
                Analyze Message
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="relative rounded-xl bg-white p-gutter border border-primary/20 shadow-sm ai-glow min-h-[400px] flex flex-col">
            <div className="flex items-center gap-3 mb-stack-lg border-b border-outline-variant pb-stack-sm">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <h3 className="font-headline-md text-headline-md text-primary">Analysis Result</h3>
            </div>

            {isAnalyzing && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-stack-lg"></div>
                <p className="font-label-md text-label-md text-on-surface-variant animate-pulse">
                  Analyzing message...
                </p>
              </div>
            )}

            {error && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <p className="font-label-md text-label-md text-error">{error}</p>
              </div>
            )}

            {result && (
              <div className="flex-1 space-y-gutter animate-fadeIn">
                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant block mb-2">Risk Level</span>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                    result.riskLevel === 'critical' || result.riskLevel === 'high' 
                      ? 'bg-error-container text-on-error-container border-error/20' 
                      : result.riskLevel === 'medium'
                      ? 'bg-tertiary-container text-on-tertiary-container border-tertiary/20'
                      : 'bg-primary-container text-on-primary-container border-primary/20'
                  }`}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      warning
                    </span>
                    <span className="font-bold capitalize">{result.riskLevel} Risk</span>
                  </div>
                </div>

                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant block mb-stack-sm">Scam Indicators</span>
                  <ul className="space-y-stack-sm">
                    {result.scamIndicators && result.scamIndicators.length > 0 ? (
                      result.scamIndicators.map((indicator: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-on-surface">
                          <span className="material-symbols-outlined text-secondary text-lg">cancel</span>
                          <span className="font-body-md text-body-md">{indicator}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-on-surface-variant font-body-md">No specific indicators found.</li>
                    )}
                  </ul>
                </div>
                
                {result.similarPatterns && result.similarPatterns.length > 0 && (
                  <div>
                    <span className="font-label-md text-label-md text-on-surface-variant block mb-stack-sm">Similar Patterns</span>
                    <div className="flex flex-wrap gap-2">
                      {result.similarPatterns.map((pattern: string, idx: number) => (
                        <span key={idx} className="bg-surface-container-high px-3 py-1 rounded-full text-sm text-on-surface-variant">
                          {pattern}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-gutter border-t border-outline-variant">
                  <span className="font-label-md text-label-md text-on-surface-variant block mb-stack-sm">Recommended Action</span>
                  <div className="bg-primary/5 p-stack-md rounded-lg border-l-4 border-primary">
                    <p className="font-body-md text-body-md font-bold text-primary">
                      {result.recommendedAction}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!isAnalyzing && !result && !error && (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <p className="font-label-md text-label-md text-on-surface-variant">Enter a message to start analysis</p>
              </div>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <section className="mt-stack-lg grid grid-cols-1 md:grid-cols-3 gap-gutter pb-12">
          {[
            { icon: 'verified_user', title: 'Privacy First', desc: 'Your uploaded data is processed in real-time and never stored on our servers.', color: 'primary' },
            { icon: 'smart_toy', title: 'Neural Scan', desc: 'Trained on 10,000+ localized scam attempts reported by Kenyan citizens.', color: 'tertiary' },
            { icon: 'campaign', title: 'Report Link', desc: 'Once identified, you can instantly report the numbers to local authorities.', color: 'secondary' },
          ].map((card, idx) => (
            <div key={idx} className={`bg-white p-gutter rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border-l-4 border-${card.color}`}>
              <span className={`material-symbols-outlined text-${card.color} mb-2`}>{card.icon}</span>
              <h4 className="font-headline-md text-headline-md mb-2">{card.title}</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">{card.desc}</p>
            </div>
          ))}
        </section>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </PageLayout>
  );
}