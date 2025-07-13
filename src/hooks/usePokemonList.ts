import {
  useInfiniteQuery,
  useQueries,
  useQueryClient,
} from '@tanstack/react-query';

import { getPokemonList, getPokemonDetailByUrl } from '@/services/pokeApi';
import { PokemonDetail } from '@/types/pokemon';

export const usePokemonList = () => {
  const queryClient = useQueryClient();
  // Main query for pagination list (name + url)
  const listQuery = useInfiniteQuery({
    queryKey: ['pokemon-list'],
    queryFn: ({ pageParam = 0 }) => getPokemonList(pageParam, 24),
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage.next;
      if (!nextUrl) return undefined;
      const offset = new URL(nextUrl).searchParams.get('offset');
      return offset ? parseInt(offset) : undefined;
    },
    initialPageParam: 0,
  });

  // Combined all pagination results (all pokemon names and URLs)
  const allPokemon =
    listQuery.data?.pages.flatMap((page) => page.results) ?? [];

  // Fetch details from each url (parallel) → to get id, name, type, sprite
  const detailQueries = useQueries({
    queries: allPokemon.map((pokemon) => ({
      queryKey: ['pokemon-detail', pokemon.name],
      queryFn: () => getPokemonDetailByUrl(pokemon.url),
      staleTime: 1000 * 60 * 10,
    })),
  });

  // Only fetch successful data (avoid error/null)
  const pokemonDetails: PokemonDetail[] = detailQueries
    .filter((q) => q.data)
    .map((q) => q.data as PokemonDetail);

  const resetPagination = async () => {
    await queryClient.removeQueries({ queryKey: ['pokemon-list'] });
    await queryClient.prefetchInfiniteQuery({
      queryKey: ['pokemon-list'],
      queryFn: ({ pageParam = 0 }) => getPokemonList(pageParam, 24),
      initialPageParam: 0,
    });
  };

  return {
    ...listQuery,
    pokemonDetails,
    isLoadingDetails: detailQueries.some((q) => q.isLoading),
    resetPagination,
  };
};
