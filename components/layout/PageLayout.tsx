import { ReactNode } from 'react';
import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';
import MobileBottomNav from './MobileBottomNav';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  showTopNav?: boolean;
}

export default function PageLayout({ children, showTopNav = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation - visible on all screens */}
      {showTopNav && <TopNavBar />}
      
      {/* Side Navigation - fixed on large screens, hidden on mobile */}
      <SideNavBar />
      
      {/* Main Content - shifts right on large screens to accommodate sidebar */}
      <div className="lg:ml-64">
        {/* Content container with padding for top nav */}
        <div className="pt-20">
          {children}
        </div>
        
        {/* Footer - only visible on large screens, mobile has its own nav */}
        <div className="hidden lg:block">
          <Footer />
        </div>
      </div>
      
      {/* Mobile Bottom Navigation - only visible on mobile */}
      <MobileBottomNav />
    </div>
  );
}