/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';
import { PacmanLoader } from 'react-spinners';

import PokemonCardList from '@/components/pokemon/pokemonCardList';
import SizeDisplay from '@/components/pokemon/sizeDisplay';
import StatsSection from '@/components/pokemon/statBar';
import Badge from '@/components/ui/badge';

import { generateClamp } from '@/function/generate-clamp';
import useEvolutionPokemon from '@/hooks/useEvolutionPokemon';
import { capitalize } from '@/lib/formatStatName';
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
  const { data: evolutionCards, isLoading: isEvolutionLoading } =
    useEvolutionPokemon(evolutionNames);

  return (
    <div className='flex flex-col gap-12'>
      <div
        className='flex flex-wrap items-start'
        style={{ gap: generateClamp(0.1, 48, 1248) }}
      >
        <div
          className='mx-auto aspect-square h-auto flex-[3.1] shrink-0 basis-80'
          style={{ width: generateClamp(320, 479, 1248) }}
        >
          <img
            src={pokemon.sprites.other?.['official-artwork']?.front_default}
            alt={pokemon.name}
            className='size-full object-contain'
          />
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
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={80}
                height={80}
              />
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
