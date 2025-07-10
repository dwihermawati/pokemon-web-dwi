import Navbar from '@/components/common/Navbar';
import React from 'react';
import SearchResultPokemon from './searchResultPokemon';

const Search = () => {
  return (
    <>
      <Navbar variant='secondary' />
      <SearchResultPokemon />
    </>
  );
};

export default Search;
