'use client';

import React, { useEffect, useRef } from 'react';
import { PacmanLoader } from 'react-spinners';

import { generateClamp } from '@/function/generate-clamp';
import { cn } from '@/lib/utils';
import { PokemonDetail } from '@/types/pokemon';

import PokemonCard from './pokemonCard';

type PokemonCardListProps = {
  pokemons: PokemonDetail[];
  variant?: 'default' | 'evolution';
  label?: string;
  style?: React.CSSProperties;
  withLoadMoreButton?: boolean;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isLoadingMore?: boolean;
  onResetPagination?: () => void;
  isResetting?: boolean;
};

const PokemonCardList: React.FC<PokemonCardListProps> = ({
  pokemons,
  variant = 'default',
  label,
  style,
  withLoadMoreButton,
  onLoadMore,
  hasNextPage,
  isLoadingMore,
  onResetPagination,
  isResetting,
}) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoadingMore && loadMoreRef.current) {
      loadMoreRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLoadingMore]);

  return (
    <div className='flex flex-col' style={{ gap: 24, ...style }}>
      {label && (
        <p
          className='font-bold text-neutral-900'
          style={{
            fontSize: generateClamp(24, 32, 1248),
            lineHeight: generateClamp(36, 46, 1248),
          }}
        >
          {label}
        </p>
      )}
      <div
        className={cn(
          'grid gap-4 transition-opacity duration-500',
          isResetting ? 'pointer-events-none opacity-50' : 'opacity-100',
          variant === 'default'
            ? 'grid-cols-[repeat(auto-fit,minmax(288px,1fr))]'
            : 'sc670:grid-cols-[repeat(auto-fill,minmax(192px,192px))] grid-cols-1 md:gap-5'
        )}
      >
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokeId={pokemon.id}
            pokeName={pokemon.name}
            pokeImage={
              pokemon.sprites.other?.['official-artwork']?.front_default ||
              pokemon.sprites.front_default
            }
            pokeType={pokemon.types.map((t) => t.type.name)}
            variant={variant}
          />
        ))}
      </div>
      {withLoadMoreButton && (
        <div ref={loadMoreRef} className='mt-6 flex justify-center'>
          {isLoadingMore ? (
            <div className='-translate-x-15'>
              <PacmanLoader size={30} color='#ffcb05' />
            </div>
          ) : hasNextPage ? (
            <button
              type='button'
              onClick={onLoadMore}
              disabled={isLoadingMore}
              className={cn(
                'text-sm-semibold md:text-md-semibold mx-auto mt-6 cursor-pointer rounded-full border border-neutral-300 py-2 text-neutral-900 transition-all duration-300 ease-in-out max-md:px-2',
                isLoadingMore
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-accent-yellow hover:scale-103 hover:drop-shadow'
              )}
              style={{
                width: generateClamp(180, 237, 1248),
                height: generateClamp(44, 52, 1248),
              }}
            >
              Load More
            </button>
          ) : !isLoadingMore ? (
            <div className='flex-center flex-col gap-3'>
              <p className='mt-4 text-sm text-neutral-500'>No more Pokémon</p>
              <button
                type='button'
                onClick={onResetPagination}
                disabled={isResetting}
                className='text-sm-semibold md:text-md-semibold hover:bg-accent-yellow mx-auto cursor-pointer rounded-full border border-neutral-300 py-2 text-neutral-900 transition-all duration-300 ease-in-out hover:scale-103 hover:drop-shadow max-md:px-2'
                style={{
                  width: generateClamp(180, 237, 1248),
                  height: generateClamp(44, 52, 1248),
                }}
              >
                {isResetting ? (
                  <PacmanLoader size={16} color='#ffcb05' />
                ) : (
                  'Load Less'
                )}
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default PokemonCardList;
