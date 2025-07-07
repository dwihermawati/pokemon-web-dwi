'use client';

import { generateClamp } from '@/function/generate-clamp';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import SearchBar from '../ui/searchBar';
import Link from 'next/link';

type NavbarProps = {
  variant?: 'default' | 'secondary';
};
const Navbar: React.FC<NavbarProps> = ({ variant = 'default' }) => {
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255,255,255,0', 'rgba(255,255,255,1)']
  );

  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 0);
  });

  return (
    <motion.header
      style={{ background }}
      className={cn(
        'fixed top-0 z-50 w-full',
        variant === 'secondary' && 'drop-shadow',
        scrolled && 'card-shadow'
      )}
    >
      <div
        className={cn(
          'custom-container flex items-center justify-center',
          variant === 'secondary' && 'justify-between gap-2'
        )}
        style={{ height: generateClamp(64, 80, 1248) }}
      >
        <Link href='/' className='flex items-center gap-1 md:gap-2'>
          <Image
            src='/icons/icon-pokemon.svg'
            alt='logo'
            width={0}
            height={0}
            style={{ width: generateClamp(28, 40, 1248), height: 'auto' }}
          />
          <span
            className={cn(
              'font-semibold text-neutral-900',
              variant === 'secondary' && 'max-md:hidden'
            )}
            style={{
              fontSize: generateClamp(19.91, 28.44, 1248),
              lineHeight: generateClamp(24.9, 35.6, 1248),
              letterSpacing: '-0.04em',
            }}
          >
            Pokedex
          </span>
        </Link>
        {variant === 'secondary' && <SearchBar />}
      </div>
    </motion.header>
  );
};

export default Navbar;
