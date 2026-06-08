import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Salama Kenya | Immediate Civic Protection',
  description: 'Immediate verification and reporting tools for Kenyans',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface font-body-md overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}