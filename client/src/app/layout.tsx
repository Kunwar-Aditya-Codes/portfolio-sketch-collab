import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/sonner';

const inter = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster richColors={true} />
      </body>
    </html>
  );
}
