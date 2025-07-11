import { useQueries } from '@tanstack/react-query';
import { getPokemonDetail } from '@/services/pokeApi';
import { PokemonDetail } from '@/types/pokemon';

const useEvolutionPokemon = (names: string[]) => {
  const queries = useQueries({
    queries: names.map((name) => ({
      queryKey: ['pokemon-detail', name],
      queryFn: () => getPokemonDetail(name),
      enabled: !!name,
      staleTime: 1000 * 60 * 10,
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);

  const data: PokemonDetail[] = queries
    .filter((q) => q.data)
    .map((q) => q.data as PokemonDetail);

  return { data, isLoading };
};

export default useEvolutionPokemon;
