/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useState } from 'react';
import { PacmanLoader } from 'react-spinners';

import PokemonCardList from '@/components/pokemon/pokemonCardList';
import SizeDisplay from '@/components/pokemon/sizeDisplay';
import StatsSection from '@/components/pokemon/statBar';
import Badge from '@/components/ui/badge';

import { generateClamp } from '@/function/generate-clamp';
import useEvolutionPokemon from '@/hooks/useEvolutionPokemon';
import { capitalize } from '@/lib/formatStatName';
import { cn } from '@/lib/utils';
import { PokemonDetail } from '@/types/pokemon';

type DetailPokemonSectionProps = {
  pokemon: PokemonDetail;
  evolutionNames: string[];
  description: string;
};

const DetailPokemonSection: React.FC<DetailPokemonSectionProps> = ({
  pokemon,
  evolutionNames,
  description,
}) => {
  const [isMainImageLoaded, setIsMainImageLoaded] = useState(false);
  const [isArtworkImageLoaded, setIsArtworkImageLoaded] = useState(false);
  const { data: evolutionCards, isLoading: isEvolutionLoading } =
    useEvolutionPokemon(evolutionNames);

  return (
    <div className='flex flex-col gap-12'>
      <div
        className='flex flex-wrap items-start'
        style={{ gap: generateClamp(0.1, 48, 1248) }}
      >
        <div
          className='relative mx-auto aspect-square h-auto flex-[3.1] shrink-0 basis-80'
          style={{ width: generateClamp(320, 479, 1248) }}
        >
          {!isMainImageLoaded && (
            <div className='flex-center absolute inset-0'>
              <Image
                src='/images/bg-pokemon-card.png'
                alt='skeleton'
                width={0}
                height={0}
                sizes='100vw'
                className='size-full object-contain'
              />
            </div>
          )}
          {pokemon.sprites.other?.['official-artwork']?.front_default ? (
            <img
              src={pokemon.sprites.other?.['official-artwork']?.front_default}
              alt={pokemon.name}
              className={cn(
                'size-full object-contain transition-opacity duration-300',
                isMainImageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => setIsMainImageLoaded(true)}
            />
          ) : (
            <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
              Image not available
            </p>
          )}
        </div>
        <div
          className='flex flex-[6.9] basis-80 flex-col'
          style={{ gap: generateClamp(16, 20, 1248) }}
        >
          <div
            className='border-b border-b-neutral-300'
            style={{ paddingBottom: generateClamp(16, 20, 1248) }}
          >
            <Image
              src='/images/pokemon-3d.png'
              alt='icon'
              width={32}
              height={32}
              sizes='100vw'
              style={{ width: generateClamp(32, 40, 1248), height: 'auto' }}
              className='mb-4 aspect-square'
            />
            <div>
              <p
                className='font-regular text-neutral-500'
                style={{
                  fontSize: generateClamp(16, 18, 1248),
                  lineHeight: generateClamp(30, 32, 1248),
                }}
              >
                {pokemon.id.toString().padStart(3, '0')}
              </p>
              <p
                className='font-bold text-neutral-900'
                style={{
                  fontSize: generateClamp(24, 40, 1248),
                  lineHeight: generateClamp(36, 56, 1248),
                }}
              >
                {capitalize(pokemon.name)}
              </p>
              <p>{description}</p>
            </div>
          </div>
          <div
            className='flex flex-wrap'
            style={{ gap: generateClamp(16, 24, 1248) }}
          >
            <div className='flex-[5.0] basis-80'>
              <Badge
                label='Type'
                badge={pokemon.types.map((t) => t.type.name)}
              />
            </div>
            <div className='flex-[5.0] basis-80'>
              <Badge
                label='Abilities'
                badge={pokemon.abilities.map((t) => t.ability.name)}
              />
            </div>
          </div>
          <div
            className='flex flex-wrap border-b border-b-neutral-300'
            style={{
              gap: generateClamp(16, 24, 1248),
              paddingBottom: generateClamp(16, 20, 1248),
            }}
          >
            <div className='flex-[5.0] basis-80'>
              <SizeDisplay weight={pokemon.weight} height={pokemon.height} />
            </div>
            <div className='flex-[5.0] basis-80'>
              <p
                className='mb-2.5 font-semibold text-neutral-900'
                style={{
                  fontSize: generateClamp(18, 20, 1248),
                  lineHeight: generateClamp(32, 34, 1248),
                }}
              >
                Artwork
              </p>
              <div className='relative size-20'>
                {!isArtworkImageLoaded && (
                  <Image
                    src='/images/bg-pokemon-card.png'
                    alt='skeleton'
                    width={80}
                    height={80}
                    className='object-contain'
                  />
                )}
                {pokemon.sprites.front_default ? (
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className={cn(
                      'absolute inset-0 object-contain',
                      isArtworkImageLoaded ? 'opacity-100' : 'opacity-0'
                    )}
                    width={80}
                    height={80}
                    onLoad={() => setIsArtworkImageLoaded(true)}
                  />
                ) : (
                  <p className='text-xs-regular absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center'>
                    Image not available
                  </p>
                )}
              </div>
            </div>
          </div>
          <StatsSection key={pokemon.id} stats={pokemon.stats} />
        </div>
      </div>
      {isEvolutionLoading ? (
        <PacmanLoader size={30} color='#ffcb05' />
      ) : evolutionCards.length > 0 ? (
        <PokemonCardList
          pokemons={evolutionCards}
          label='Evolution Chain'
          variant='evolution'
        />
      ) : null}
    </div>
  );
};

export default DetailPokemonSection;
