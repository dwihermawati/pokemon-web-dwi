import clsx from 'clsx';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'Discover the Most Powerful Pokémon in the Wild!',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={clsx(poppins.variable, 'antialiased')}>
        <Providers>
          {children} <ToastContainer position='top-center' autoClose={3000} />
        </Providers>
      </body>
    </html>
  );
}
