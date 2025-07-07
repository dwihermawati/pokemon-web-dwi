import SearchBar from '@/components/ui/searchBar';
import { generateClamp } from '@/function/generate-clamp';
import { generateClampInverse } from '@/function/generate-clamp-inverse';
import Image from 'next/image';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section
      className='bg-primary-300 flex-center cloud-decoration-hero relative w-full'
      // style={{ minHeight: generateClamp(520, 677, 1440) }}
    >
      {/* <div
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[132px] w-full -translate-x-1/2 transform border border-red-500 bg-[url('/images/cloud-hero-decoration.png')] bg-contain bg-repeat-x"
        style={{
          top: generateClamp(441, 555, 1440),
          height: generateClamp(82, 132, 1440),
        }}
      /> */}
      <div
        className='flex-center w-full flex-col max-sm:mx-4'
        style={{
          marginTop: generateClamp(128, 140, 1440),
          marginBottom: generateClamp(120, 210, 1440),
        }}
      >
        <div
          className='flex flex-col items-center'
          style={{
            gap: generateClamp(8, 15, 1440),
          }}
        >
          <Image
            src='/images/logo-pokemon.png'
            alt='logo'
            width={0}
            height={0}
            sizes='100vw'
            style={{ height: generateClamp(38, 64, 1440), width: 'auto' }}
          />
          <h1
            className='md:display-2xl-bold display-sm-bold text-center text-neutral-900'
            style={{
              fontSize: generateClamp(28, 48, 1440),
              lineHeight: generateClamp(38, 60, 1440),
              maxWidth: generateClamp(297, 686, 1440),
            }}
          >
            Discover the Most Powerful Pokémon in the Wild!
          </h1>
          <p
            className='text-center font-medium text-neutral-800 md:text-neutral-900'
            style={{
              fontSize: generateClamp(14, 16, 1440),
              lineHeight: generateClamp(28, 30, 1440),
            }}
          >
            Train, Battle, and Collect Your Favorites!
          </p>
        </div>
        <SearchBar
          style={{
            marginTop: generateClamp(15, 30, 1440),
            maxWidth: generateClamp(361, 518, 1440),
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
