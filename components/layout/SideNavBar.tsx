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

export default function SideNavBar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-surface-container-low shadow-md z-40 overflow-y-auto">
      <div className="flex flex-col h-full pt-24 pb-6">
        <div className="mb-stack-lg px-6">
          {/* <div className="font-headline-md text-headline-md font-bold text-primary">Salama Kenya</div> */}
          <div className="font-caption text-on-surface-variant mt-1">Citizen Protection Portal</div>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${pathname === item.path
                ? 'bg-primary-container text-on-primary-container font-bold'
                : 'text-on-surface-variant hover:bg-surface-variant'
                }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="font-label-md text-label-md">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-3 pt-4">
          <div className="p-4 bg-surface-variant rounded-xl border border-outline-variant">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold">
                JD
              </div>
              <div>
                <div className="font-label-md text-label-md text-on-surface">Joshua D.</div>
                <div className="font-caption text-caption text-on-surface-variant">Verified Contributor</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}