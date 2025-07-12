import { useQuery } from '@tanstack/react-query';

import { getPokemonDetail } from '@/services/pokeApi';

export const useSearchPokemon = (name: string) => {
  return useQuery({
    queryKey: ['search-pokemon', name],
    queryFn: () => getPokemonDetail(name),
    enabled: !!name,
    retry: false,
  });
};
