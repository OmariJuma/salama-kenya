'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Search', path: '/verify' },
    { name: 'Alerts', path: '/alerts' },
    { name: 'AI Analyzer', path: '/ai-analyzer' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 bg-surface shadow-sm border-b border-outline-variant/30">
      <Link href="/" className="font-headline-md text-headline-md font-bold text-primary">
        Salama Kenya
      </Link>

      <nav className="hidden md:flex items-center gap-gutter">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`font-label-md text-label-md transition-colors ${pathname === item.path
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-on-surface-variant hover:text-primary'
              }`}
          >
            {item.name}
          </Link>
        ))}
        <Link href="/report" className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all active:scale-95">
          Report Scam
        </Link>
      </nav>

      <button className="md:hidden text-on-surface">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
}