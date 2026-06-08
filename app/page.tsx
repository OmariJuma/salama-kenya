'use client';

import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AlertTicker from '@/components/AlertTicker';
import SearchVerifyCard from '@/components/SearchVerifyCard';
import ReportCard from '@/components/ReportCard';
import AIAnalyzerCard from '@/components/AIAnalyzerCard';
import SafetyChecklist from '@/components/SafetyChecklist';
import EmergencyCTA from '@/components/EmergencyCTA';
import Footer from '@/components/Footer';

export default function Home() {
  // useEffect(() => {
  //   // Intersection observer for action cards animation
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add('opacity-100', 'translate-y-0');
  //           entry.target.classList.remove('opacity-0', 'translate-y-10');
  //         }
  //       });
  //     },
  //     { threshold: 0.1 }
  //   );

  //   document.querySelectorAll('.action-card-shadow').forEach((el) => {
  //     el.classList.add('transition-all', 'duration-500', 'opacity-0', 'translate-y-10');
  //     observer.observe(el);
  //   });

  //   // Input focus effect
  //   const searchInput = document.querySelector('input[placeholder*="Enter name"]');
  //   if (searchInput) {
  //     const handleFocus = () => {
  //       searchInput.parentElement?.classList.remove('border-transparent');
  //       searchInput.parentElement?.classList.add('border-primary', 'bg-white');
  //     };
  //     const handleBlur = () => {
  //       searchInput.parentElement?.classList.add('border-transparent');
  //       searchInput.parentElement?.classList.remove('border-primary', 'bg-white');
  //     };

  //     searchInput.addEventListener('focus', handleFocus);
  //     searchInput.addEventListener('blur', handleBlur);

  //     return () => {
  //       searchInput.removeEventListener('focus', handleFocus);
  //       searchInput.removeEventListener('blur', handleBlur);
  //       observer.disconnect();
  //     };
  //   }

  //   return () => observer.disconnect();
  // }, []);

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <HeroSection />
        <AlertTicker />

        {/* Action Grid */}
        <section className="py-12 md:py-20 bg-surface">
          <div className="max-w-container-max-width mx-auto px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SearchVerifyCard />
              <ReportCard />
              <AIAnalyzerCard />
            </div>
          </div>
        </section>

        {/* Secondary Content */}
        <section className="py-16 bg-surface-container-low border-t border-outline-variant/30">
          <div className="max-w-container-max-width mx-auto px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-headline-lg text-headline-lg mb-6">Your Safety is Our Priority</h2>
                <p className="font-body-lg text-on-surface-variant mb-8">
                  Salama Kenya is an independent civic platform dedicated to protecting Kenyans from the
                  rising wave of digital fraud. We leverage data and community reporting to keep our economy safe.
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
              <SafetyChecklist />
            </div>
          </div>
        </section>

        {/* Final Emergency CTA */}
        <section className="py-20 bg-white">
          <EmergencyCTA />
        </section>
      </main>
      <Footer />
    </>
  );
}