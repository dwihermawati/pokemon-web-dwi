'use client';

import { generateClamp } from '@/function/generate-clamp';
import { motion, useScroll, useTransform } from 'motion/react';
import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import SearchBar from '../ui/searchBar';

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

  return (
    <motion.header
      style={{ background }}
      className={cn(
        'fixed top-0 z-50 w-full',
        variant === 'secondary' && 'drop-shadow'
      )}
    >
      <div
        className={cn(
          'custom-container flex items-center justify-center',
          variant === 'secondary' && 'justify-between gap-2'
        )}
        style={{ height: generateClamp(64, 80, 1248) }}
      >
        <div className='flex items-center gap-1 md:gap-2'>
          <Image
            src='/icons/icon-pokemon.svg'
            alt='logo'
            width={0}
            height={0}
            style={{ width: generateClamp(28, 40, 1248), height: 'auto' }}
          />
          <span
            className='font-semibold text-neutral-900 max-md:hidden'
            style={{
              fontSize: generateClamp(19.91, 28.44, 1248),
              lineHeight: generateClamp(24.9, 35.6, 1248),
              letterSpacing: '-0.04em',
            }}
          >
            Pokedex
          </span>
        </div>
        {variant === 'secondary' && <SearchBar />}
      </div>
    </motion.header>
  );
};

export default Navbar;
