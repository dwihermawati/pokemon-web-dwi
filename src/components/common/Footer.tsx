'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { generateClamp } from '@/function/generate-clamp';
import { cn } from '@/lib/utils';

type FooterProps = {
  classname?: string;
};

const Footer: React.FC<FooterProps> = ({ classname }) => {
  const pathname = usePathname();
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <footer className={cn('border-t border-t-neutral-300', classname)}>
      <div className='custom-container flex h-30 items-center justify-between gap-4 py-6 max-md:flex-col max-md:items-start md:py-2'>
        <Link
          href='/'
          className='flex items-center gap-1 hover:translate-x-0.5 md:gap-2'
          scroll={false}
          onClick={handleLogoClick}
        >
          <Image
            src='/icons/icon-pokemon.svg'
            alt='logo'
            width={0}
            height={0}
            style={{ width: generateClamp(28, 40, 1248), height: 'auto' }}
          />
          <span
            className='font-semibold text-neutral-900'
            style={{
              fontSize: generateClamp(19.91, 28.44, 1248),
              lineHeight: generateClamp(24.9, 35.6, 1248),
              letterSpacing: '-0.04em',
            }}
          >
            Pokedex
          </span>
        </Link>
        <p
          className='font-regular text-neutral-600'
          style={{
            fontSize: generateClamp(12, 16, 1248),
            lineHeight: generateClamp(24, 30, 1248),
          }}
        >
          Copyright by{' '}
          <a
            href='https://dwi-hermawati.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#0093dd] underline underline-offset-3 hover:brightness-130'
            title='dwi-hermawati.vercel.app'
          >
            Dwi Hermawati
          </a>{' '}
          ©2025 Pokedex
        </p>
      </div>
    </footer>
  );
};

export default Footer;
