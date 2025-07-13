'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { PacmanLoader } from 'react-spinners';

import Footer from '@/components/common/Footer';
import PokemonCard from '@/components/pokemon/pokemonCard';

import { generateClamp } from '@/function/generate-clamp';
import { useSearchPokemon } from '@/hooks/useSearchPokemon';
import { capitalize } from '@/lib/formatStatName';

const SearchResultPokemon = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const { data, isLoading, isError } = useSearchPokemon(query);

  if (isLoading) {
    return (
      <>
        <div className='flex-center min-h-screen -translate-x-15'>
          <PacmanLoader size={50} color='#ffcb05' />
        </div>
        <Footer classname='w-full fixed bottom-0 left-0' />
      </>
    );
  }

  return (
    <>
      <main
        className='custom-container'
        style={{ marginTop: generateClamp(80, 140, 1248) }}
      >
        {isError || !data ? (
          <>
            <p
              className='font-bold text-neutral-900'
              style={{
                fontSize: generateClamp(24, 32, 1248),
                lineHeight: generateClamp(36, 46, 1248),
              }}
            >
              No results found for &quot;{capitalize(query)}&quot;
            </p>
            <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <div className='flex-center flex-col gap-6'>
                <Image
                  src='/images/pokemon-3d.png'
                  alt='not found pokemon'
                  width={0}
                  height={0}
                  sizes='100vw'
                  style={{
                    width: generateClamp(92, 130, 1248),
                  }}
                  className='aspect-square h-auto'
                />
                <div className='text-center'>
                  <p className='text-md-bold mb-1 text-neutral-900'>
                    Pokémon Not Found
                  </p>
                  <p
                    className='font-regular text-neutral-900'
                    style={{
                      fontSize: generateClamp(14, 16, 1248),
                      lineHeight: generateClamp(28, 30, 1248),
                    }}
                  >
                    Change Your Keywords
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div
            className='mb-[274px] flex flex-col md:mb-[219px]'
            style={{
              gap: generateClamp(16, 24, 1248),
            }}
          >
            <p
              className='font-bold text-neutral-900'
              style={{
                fontSize: generateClamp(24, 32, 1248),
                lineHeight: generateClamp(36, 46, 1248),
              }}
            >
              Search Results for &quot;{capitalize(query)}&quot;
            </p>
            <div className='w-full md:max-w-[288px]'>
              <PokemonCard
                pokeId={data.id}
                pokeName={data.name}
                pokeImage={
                  data.sprites.other?.['official-artwork']?.front_default ||
                  data.sprites.front_default
                }
                pokeType={data.types.map((t) => t.type.name)}
                variant='default'
                className='sm:w-[288px]'
              />
            </div>
          </div>
        )}
      </main>
      <Footer
        classname={isError || !data ? 'fixed bottom-0 w-full' : 'w-full'}
      />
    </>
  );
};

export default SearchResultPokemon;
