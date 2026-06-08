'use client';

import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop h-20 bg-surface shadow-sm border-b border-outline-variant/30">
      <div className="flex items-center gap-gutter">
        <span className="text-headline-md font-headline-md font-bold text-primary">
          Salama Kenya
        </span>
        <div className="hidden md:flex gap-stack-lg items-center">
          <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
            Home
          </a>
          <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
            Latest Alerts
          </a>
          <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
            Resources
          </a>
        </div>
      </div>
      <div className="flex items-center gap-stack-md">
        <button className="flex items-center gap-2 bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold hover:bg-secondary-container transition-all shadow-md">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            report
          </span>
          Report Scam
        </button>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-on-surface"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
      
      {/* Mobile menu - optional */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-surface shadow-lg border-b border-outline-variant/30 md:hidden">
          <div className="flex flex-col p-4 gap-4">
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
              Home
            </a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
              Latest Alerts
            </a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#">
              Resources
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}