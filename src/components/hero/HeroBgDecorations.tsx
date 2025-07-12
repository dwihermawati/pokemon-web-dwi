import React from 'react';

import { generateClamp } from '@/function/generate-clamp';
import { generateClampInverse } from '@/function/generate-clamp-inverse';

const HeroBgDecorations = () => {
  return (
    <>
      <div className='absolute inset-0 z-0 opacity-60'>
        <div
          className='animate-twinkle h-full w-full bg-contain'
          style={{
            backgroundImage: 'url(/images/pattern-hero-decoration.png)',
            backgroundRepeat: 'repeat',
          }}
        />
      </div>
      <div
        className='pointer-events-none absolute bottom-0 z-15 w-full bg-contain bg-[position:left_bottom] bg-repeat-x max-md:bg-cover max-md:bg-center lg:bottom-[-0.2%]'
        style={{
          backgroundImage: "url('/images/cloud-hero-decoration.svg')",
          height: generateClamp(82, 132.54, 1440),
        }}
      />
      <div className='absolute z-10 h-full w-full max-w-360 overflow-hidden'>
        <div
          className='animate-breathe absolute aspect-square transform bg-contain bg-no-repeat'
          style={{
            width: generateClamp(161, 328, 1440),
            backgroundImage: "url('/images/charizard-hero-decoration.png')",
            left: generateClamp(7, 75, 1440),
            bottom: generateClampInverse(-24, -27, 1440),
          }}
        />
        <div
          className='animate-breathe absolute aspect-square transform bg-contain bg-no-repeat'
          style={{
            width: generateClamp(147, 278, 1440),
            backgroundImage: "url('/images/pikachu-hero-decoration.png')",
            left: generateClamp(199, 1089, 1440),
            top: generateClamp(383, 391, 1440),
            // bottom: generateClampInverse(-24, -27, 1440),
          }}
        />
      </div>
    </>
  );
};

export default HeroBgDecorations;
