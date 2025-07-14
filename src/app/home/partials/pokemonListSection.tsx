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
    resetPagination,
  } = usePokemonList();

  const previousCountRef = useRef(0);
  const [isUserLoadingMore, setIsUserLoadingMore] = React.useState(false);
  const [isResetting, setIsResetting] = React.useState(false);

  const isLoadingMore =
    isUserLoadingMore &&
    (isLoadingDetails || pokemonDetails.length === previousCountRef.current);

  const isInitialDetailEmpty = !isLoading && pokemonDetails.length === 0;

  useEffect(() => {
    if (pokemonDetails.length > previousCountRef.current && !isLoadingDetails) {
      setIsUserLoadingMore(false);
      previousCountRef.current = pokemonDetails.length;
    }
  }, [pokemonDetails.length, isLoadingDetails]);

  const handleLoadMore = () => {
    setIsUserLoadingMore(true);
    fetchNextPage();
  };

  const handleResetPagination = async () => {
    setIsResetting(true);
    await resetPagination();
    // await new Promise((res) => setTimeout(res, 300));
    setIsResetting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className='flex-center min-h-screen -translate-x-15'>
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
          onResetPagination={handleResetPagination}
          isResetting={isResetting}
        />
      )}
    </main>
  );
};

export default PokemonListSection;
