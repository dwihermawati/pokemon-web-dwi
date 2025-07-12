'use client';

import React, { useEffect, useRef } from 'react';
import { PacmanLoader } from 'react-spinners';

import PokemonCardList from '@/components/pokemon/pokemonCardList';

import { generateClamp } from '@/function/generate-clamp';
import { generateClampInverse } from '@/function/generate-clamp-inverse';
import { usePokemonList } from '@/hooks/usePokemonList';

const PokemonListSection = () => {
  const {
    pokemonDetails,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isLoadingDetails,
  } = usePokemonList();

  const previousCountRef = useRef(0);
  const [isUserLoadingMore, setIsUserLoadingMore] = React.useState(false);

  const isLoadingMore =
    isUserLoadingMore &&
    (isLoadingDetails || pokemonDetails.length === previousCountRef.current);

  const isInitialDetailEmpty = !isLoading && pokemonDetails.length === 0;

  useEffect(() => {
    if (pokemonDetails.length > previousCountRef.current) {
      setIsUserLoadingMore(false);
      previousCountRef.current = pokemonDetails.length;
    }
  }, [pokemonDetails.length]);

  const handleLoadMore = () => {
    setIsUserLoadingMore(true);
    fetchNextPage();
  };

  return (
    <main
      className='custom-container'
      style={{
        marginTop: generateClampInverse(44, 21, 1248),
        marginBottom: generateClamp(40, 80, 1248),
      }}
    >
      {isLoading || isInitialDetailEmpty ? (
        <div className='flex-center min-h-screen'>
          <PacmanLoader size={50} color='#ffcb05' />
        </div>
      ) : (
        <PokemonCardList
          label='List Pokemon'
          pokemons={pokemonDetails}
          variant='default'
          withLoadMoreButton
          hasNextPage={hasNextPage}
          onLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
        />
      )}
    </main>
  );
};

export default PokemonListSection;
