'use client';

import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';

type Step = 1 | 2 | 3 | 4;

export default function ReportPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    scamType: 'impersonation', // Default enum value
    description: '',
    fraudsterName: '',
    phoneNumber: '',
    platform: 'phone', // Default enum value
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const updateStep = (step: Step) => {
    setCurrentStep(step);
  };

  const nextStep = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep((currentStep + 1) as Step);
    } else {
      setIsSubmitting(true);
      setSubmitError('');
      
      try {
        const response = await fetch('/api/reports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reportType: formData.platform,
            subject: formData.phoneNumber || formData.fraudsterName || 'Unknown',
            scamCategory: formData.scamType,
            description: formData.description,
            language: 'en',
            evidence: [],
          }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to submit report');
        }
        
        setIsSuccess(true);
      } catch (err: any) {
        setSubmitError(err.message || 'An error occurred while submitting');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const progressWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const scamTypes = [
    { value: 'fake_loan', label: 'Fake Loan' },
    { value: 'impersonation', label: 'Impersonation / M-Pesa Reversal' },
    { value: 'phishing', label: 'Phishing / Social Media Hack' },
    { value: 'job_scam', label: 'Fake Job Opportunity' },
    { value: 'investment', label: 'Investment / Wash-Wash' },
    { value: 'other', label: 'Other' },
  ];

  const platforms = [
    { value: 'phone', label: 'Phone Number / SMS / Call' },
    { value: 'website', label: 'Website' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'business', label: 'Business Name' },
  ];

  if (isSuccess) {
    return (
      <PageLayout>
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-0 py-stack-lg text-center min-h-[60vh] flex flex-col justify-center items-center">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary mb-4">Report Submitted</h1>
          <p className="text-on-surface-variant font-body-lg max-w-lg mb-8">
            Thank you for helping protect the community. Your report has been successfully submitted and will be analyzed to alert others.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                setFormData({ scamType: 'impersonation', description: '', fraudsterName: '', phoneNumber: '', platform: 'phone' });
                setCurrentStep(1);
                setIsSuccess(false);
              }}
              className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold shadow-md hover:opacity-90 transition-opacity"
            >
              Report Another Scam
            </button>
            <a href="/" className="bg-surface-container text-on-surface px-6 py-3 rounded-lg font-bold hover:bg-surface-variant transition-colors">
              Return Home
            </a>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-margin-mobile md:px-0 pb-stack-lg">
        <div className="mb-stack-lg text-center">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Report a Scam</h1>
          <p className="text-on-surface-variant font-body-lg">Your report helps protect millions of Kenyan citizens from digital fraud.</p>
        </div>

        {/* Progress Stepper */}
        <div className="relative flex items-center justify-between mb-12 px-4 md:px-8">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-container -translate-y-1/2 z-0"></div>
          <div
            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${progressWidth}%` }}
          ></div>

          {[
            { step: 1, label: 'Event' },
            { step: 2, label: 'Fraudster' },
            { step: 3, label: 'Evidence' },
            { step: 4, label: 'Submit' },
          ].map((item) => (
            <div key={item.step} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold card-shadow transition-all ${item.step <= currentStep
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface-variant'
                  }`}
              >
                {item.step}
              </div>
              <span
                className={`absolute -bottom-7 text-xs font-bold whitespace-nowrap ${item.step <= currentStep ? 'text-primary' : 'text-on-surface-variant'
                  }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-surface-bright rounded-xl card-shadow p-stack-md md:p-stack-lg border border-outline-variant/30 overflow-hidden min-h-[500px] flex flex-col">
          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="step-transition flex-1">
              <div className="mb-gutter">
                <h2 className="font-headline-md text-headline-md mb-2">Step 1: What happened?</h2>
                <p className="text-on-surface-variant font-body-md">Briefly describe the incident and the type of scam you encountered.</p>
              </div>
              <div className="space-y-stack-lg">
                <div className="space-y-stack-sm">
                  <label className="block font-label-md text-label-md text-on-surface">Scam Type</label>
                  <select
                    className="w-full h-12 bg-surface px-4 rounded-lg border-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors input-inset appearance-none cursor-pointer"
                    value={formData.scamType}
                    onChange={(e) => setFormData({ ...formData, scamType: e.target.value })}
                  >
                    {scamTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-stack-sm">
                  <label className="block font-label-md text-label-md text-on-surface">Detailed Description</label>
                  <textarea
                    className="w-full bg-surface p-4 rounded-lg border-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors input-inset resize-none"
                    placeholder="Describe how the contact was made, what they asked for, and what happened next..."
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="step-transition flex-1">
              <div className="mb-gutter">
                <h2 className="font-headline-md text-headline-md mb-2">Step 2: Fraudster Details</h2>
                <p className="text-on-surface-variant font-body-md">
                  Provide any information you have about the individual or entity that contacted you.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div className="space-y-stack-sm">
                  <label className="block font-label-md text-label-md text-on-surface">Fraudster Name/Alias</label>
                  <input
                    className="w-full h-12 bg-surface px-4 rounded-lg border-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors input-inset"
                    placeholder="e.g. Agent Kamau"
                    type="text"
                    value={formData.fraudsterName}
                    onChange={(e) => setFormData({ ...formData, fraudsterName: e.target.value })}
                  />
                </div>
                <div className="space-y-stack-sm">
                  <label className="block font-label-md text-label-md text-on-surface">Phone Number / ID</label>
                  <input
                    className="w-full h-12 bg-surface px-4 rounded-lg border-2 border-outline-variant focus:border-primary focus:ring-0 transition-colors input-inset"
                    placeholder="e.g. 0712 345 678"
                    type="text"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-stack-sm md:col-span-2">
                  <label className="block font-label-md text-label-md text-on-surface">Platform Used</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-sm">
                    {platforms.map((plat) => (
                      <label
                        key={plat.value}
                        className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-colors ${formData.platform === plat.value
                            ? 'border-primary bg-primary/10'
                            : 'border-outline-variant hover:bg-surface-container'
                          }`}
                      >
                        <input
                          type="radio"
                          name="platform"
                          className="text-primary focus:ring-primary"
                          checked={formData.platform === plat.value}
                          onChange={() => setFormData({ ...formData, platform: plat.value })}
                        />
                        <span className="text-sm font-semibold">{plat.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="step-transition flex-1">
              <div className="mb-gutter">
                <h2 className="font-headline-md text-headline-md mb-2">Step 3: Upload Evidence</h2>
                <p className="text-on-surface-variant font-body-md">
                  Screenshots of chats, transaction records, or call logs help us build a stronger case.
                </p>
              </div>
              <div className="border-2 border-dashed border-outline-variant rounded-xl p-stack-lg flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                </div>
                <p className="font-bold text-on-surface mb-1">Drag and drop screenshots here</p>
                <p className="text-sm text-on-surface-variant mb-4">PNG, JPG or PDF up to 10MB</p>
                <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold">Select Files</button>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <div className="step-transition flex-1">
              <div className="mb-gutter">
                <h2 className="font-headline-md text-headline-md mb-2">Step 4: Review &amp; Submit</h2>
                <p className="text-on-surface-variant font-body-md">Please verify the information before finalizing the report.</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-primary-container/10 border-l-4 border-primary rounded-r-lg">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-bold text-primary uppercase">Scam Category</span>
                    <button className="text-xs font-bold text-primary underline" onClick={() => updateStep(1)}>
                      Edit
                    </button>
                  </div>
                  <p className="font-bold text-on-surface">{scamTypes.find(t => t.value === formData.scamType)?.label || formData.scamType}</p>
                </div>
                <div className="p-4 bg-surface border border-outline-variant rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-bold text-on-surface-variant uppercase">Target Details</span>
                    <button className="text-xs font-bold text-primary underline" onClick={() => updateStep(2)}>
                      Edit
                    </button>
                  </div>
                  <p className="font-bold text-on-surface">
                    Name: {formData.fraudsterName || 'Unknown'} | Number: {formData.phoneNumber || 'Not provided'}
                  </p>
                </div>
                <div className="p-4 bg-surface border border-outline-variant rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-bold text-on-surface-variant uppercase">Attached Files</span>
                    <button className="text-xs font-bold text-primary underline" onClick={() => updateStep(3)}>
                      Edit
                    </button>
                  </div>
                  <p className="font-bold text-on-surface">No files attached</p>
                </div>
              </div>
              <div className="mt-stack-lg p-stack-md bg-surface-container-high rounded-xl flex gap-stack-md items-start">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
                <p className="text-sm font-body-md text-on-surface-variant leading-relaxed">
                  By clicking submit, you confirm that the information provided is accurate. We will analyze this data to identify trends and alert other citizens.
                </p>
              </div>

              {submitError && (
                <div className="mt-4 p-4 bg-error-container text-on-error-container rounded-lg font-bold">
                  {submitError}
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-stack-lg pt-stack-md border-t border-outline-variant/30 flex justify-between items-center">
            <button
              onClick={prevStep}
              className={`px-6 py-3 font-bold text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2 ${currentStep === 1 ? 'invisible' : ''
                }`}
            >
              <span className="material-symbols-outlined">arrow_back</span> Back
            </button>
            <div className="flex gap-4">
              <button className="px-6 py-3 font-bold text-secondary hover:underline">Cancel</button>
              <button
                onClick={nextStep}
                className={`px-8 py-3 rounded-lg font-bold card-shadow hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 ${currentStep === totalSteps ? 'bg-secondary text-on-secondary' : 'bg-primary text-on-primary'
                  } disabled:opacity-50`}
                disabled={isSubmitting}
              >
                {currentStep === totalSteps ? (
                  <>
                    {isSubmitting ? 'Submitting...' : 'Submit Report'} {!isSubmitting && <span className="material-symbols-outlined">check</span>}
                  </>
                ) : (
                  <>
                    Next <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* AI Assistant Module */}
        <div className="mt-stack-lg bg-surface border border-primary/20 p-stack-md rounded-xl card-shadow flex flex-col md:flex-row items-center gap-gutter" style={{ borderLeft: '4px solid #106e09' }}>
          <div className="w-16 h-16 shrink-0 bg-primary-fixed-dim/30 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-1">AI Smart Tip</h4>
            <p className="text-sm text-on-surface-variant">
              Our analyzer suggests that most M-Pesa fraud happens on weekends. Reporting this now helps our AI update real-time risk scores for millions of users.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}