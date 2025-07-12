'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';

import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';

import { generateClamp } from '@/function/generate-clamp';
import { usePokemonDetail } from '@/hooks/usePokemonDetail';

import DetailPokemonSection from './detailPokemon';

const DetailPokemon = () => {
  const params = useParams();
  const name = params?.id as string;

  const { detail, isLoading, isError, description, evolutionNames } =
    usePokemonDetail(name);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Navbar variant='secondary' />
      {isLoading || isError || !detail ? (
        <div className='flex min-h-screen flex-col items-center justify-center'>
          <div className='flex flex-1 items-center justify-center'>
            {isLoading ? (
              <PacmanLoader size={50} color='#ffcb05' />
            ) : (
              <span
                className='text-center font-medium text-neutral-700'
                style={{
                  fontSize: generateClamp(14, 16, 1248),
                  lineHeight: generateClamp(28, 30, 1248),
                }}
              >
                Failed to load Pokémon details.
              </span>
            )}
          </div>
          <Footer classname='w-full fixed bottom-0 left-0' />
        </div>
      ) : (
        <>
          <main
            style={{
              marginTop: generateClamp(88, 128, 1248),
              marginBottom: generateClamp(40, 80, 1248),
              gap: generateClamp(0, 24, 1248),
            }}
            className='custom-container flex flex-col'
          >
            <Link
              href='/'
              scroll={false}
              className='hover:text-accent-yellow flex-start w-25 cursor-pointer gap-2 text-neutral-900 transition-all duration-300 hover:-translate-x-2'
            >
              <Icon icon='formkit:arrowleft' className='size-6' />
              <span className='text-md-medium'>Back</span>
            </Link>

            <DetailPokemonSection
              pokemon={detail}
              description={description}
              evolutionNames={evolutionNames}
            />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default DetailPokemon;
