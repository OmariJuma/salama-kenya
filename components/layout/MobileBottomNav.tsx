'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/', icon: 'home' },
  { name: 'Verify', path: '/verify', icon: 'search' },
  { name: 'Alerts', path: '/alerts', icon: 'notifications' },
  { name: 'Report Scam', path: '/report', icon: 'report' },
  { name: 'AI Analyzer', path: '/ai-analyzer', icon: 'psychology' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center h-16 z-50 px-4">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`flex flex-col items-center gap-1 transition-colors ${pathname === item.path ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
            }`}
        >
          <span className="material-symbols-outlined text-xl">{item.icon}</span>
          <span className="text-[10px] font-bold">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}