import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface-container-highest border-t-2 border-outline-variant">
      <div className="max-w-container-max-width mx-auto grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div>
          <div className="font-headline-md text-headline-md font-bold text-primary mb-2">Salama Kenya</div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            The Salama Kenya Civic Tech initiative is dedicated to protecting citizens through education, 
            real-time alerts, and advanced AI fraud detection.
          </p>
          <p className="font-label-md text-label-md text-on-surface-variant mt-4">
            © 2024 Salama Kenya Civic Tech. Protecting Kenyan Citizens.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-gutter">
          <div className="flex flex-col gap-2">
            <span className="font-label-md font-bold text-on-surface">Resources</span>
            <Link href="#" className="font-label-md text-on-surface-variant hover:text-primary underline transition-all">
              Emergency Contacts
            </Link>
            <Link href="#" className="font-label-md text-on-surface-variant hover:text-primary underline transition-all">
              Fraud Education
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-label-md font-bold text-on-surface">Legal</span>
            <Link href="#" className="font-label-md text-on-surface-variant hover:text-primary underline transition-all">
              Privacy Policy
            </Link>
            <Link href="#" className="font-label-md text-on-surface-variant hover:text-primary underline transition-all">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}