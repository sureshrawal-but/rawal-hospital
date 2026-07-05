import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Rawal Hospital - Excellence in Healthcare',
    template: '%s | Rawal Hospital',
  },
  description: 'Providing compassionate, high-quality healthcare services. Rawal Hospital offers multi-specialty medical care with state-of-the-art facilities.',
  keywords: ['hospital', 'healthcare', 'medical', 'doctors', 'emergency', 'Rawal Hospital'],
  openGraph: {
    title: 'Rawal Hospital - Excellence in Healthcare',
    description: 'Providing compassionate, high-quality healthcare services.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
