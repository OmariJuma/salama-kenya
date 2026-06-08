'use client';

import { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import AlertTicker from '@/components/sections/AlertTicker';
import HeroSection from '@/components/sections/HeroSection';
import ActionGrid from '@/components/sections/ActionGrid';
import EducationSection from '@/components/sections/EducationSection';
import EmergencyCTA from '@/components/sections/EmergencyCTA';

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.action-card-shadow').forEach((el) => {
      el.classList.add('transition-all', 'duration-500', 'opacity-0', 'translate-y-10');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <PageLayout>
      <HeroSection />
      <AlertTicker />
      <ActionGrid />
      <EducationSection />
      <EmergencyCTA />
    </PageLayout>
  );
}