import React, { Suspense } from 'react';

import Navbar from '@/components/common/Navbar';

import SearchResultPokemon from './searchResultPokemon';

const Search = () => {
  return (
    <>
      <Navbar variant='secondary' />
      <Suspense fallback={null}>
        <SearchResultPokemon />
      </Suspense>
    </>
  );
};

export default Search;
