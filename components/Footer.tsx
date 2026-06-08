export default function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t-2 border-outline-variant/30">
      <div className="w-full py-stack-lg px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-gutter max-w-container-max-width mx-auto">
        <div className="flex flex-col gap-stack-md">
          <span className="font-headline-md text-headline-md font-bold text-primary">Salama Kenya</span>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
            Salama Kenya is a civic tech initiative dedicated to creating a fraud-free digital environment 
            through education and verified data.
          </p>
          <p className="font-label-md text-label-md text-on-surface-variant mt-4">
            © 2024 Salama Kenya Civic Tech. Protecting Kenyan Citizens.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-stack-lg">
          <div className="flex flex-col gap-stack-sm">
            <p className="font-bold text-on-surface">Platform</p>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">
              Emergency Contacts
            </a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">
              Fraud Education
            </a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">
              AI Analyzer
            </a>
          </div>
          <div className="flex flex-col gap-stack-sm">
            <p className="font-bold text-on-surface">Legal</p>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">
              Privacy Policy
            </a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">
              Terms of Service
            </a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">
              Data Protection
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}