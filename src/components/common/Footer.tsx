import { generateClamp } from '@/function/generate-clamp';
import Image from 'next/image';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className='custom-container flex h-30 items-center justify-between gap-4 py-6 max-md:flex-col max-md:items-start md:py-2'>
        <div className='flex items-center gap-1 md:gap-2'>
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
        </div>
        <p
          className='font-regular text-neutral-600'
          style={{
            fontSize: generateClamp(12, 16, 1248),
            lineHeight: generateClamp(24, 30, 1248),
          }}
        >
          Copyright by Dwi Hermawati ©2025 Pokedex
        </p>
      </div>
    </footer>
  );
};

export default Footer;
