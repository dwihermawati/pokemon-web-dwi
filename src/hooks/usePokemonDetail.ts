import { useQuery } from '@tanstack/react-query';
import {
  getPokemonDetail,
  getPokemonSpecies,
  getEvolutionChain,
} from '@/services/pokeApi';
import { useEffect, useState } from 'react';

export const usePokemonDetail = (name: string) => {
  const detailQuery = useQuery({
    queryKey: ['pokemon-detail', name],
    queryFn: () => getPokemonDetail(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 5,
  });

  const speciesQuery = useQuery({
    queryKey: ['pokemon-species', name],
    queryFn: () => getPokemonSpecies(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 10,
  });

  const [evolutionNames, setEvolutionNames] = useState<string[]>([]);

  // Get evolution chain from species once available
  const evolutionChainUrl = speciesQuery.data?.evolution_chain?.url;
  const evolutionId = evolutionChainUrl
    ? parseInt(evolutionChainUrl.split('/').filter(Boolean).pop()!)
    : null;

  const evolutionQuery = useQuery({
    queryKey: ['evolution-chain', evolutionId],
    queryFn: () => getEvolutionChain(evolutionId!),
    enabled: !!evolutionId,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (evolutionQuery.data) {
      const chain = evolutionQuery.data.chain;
      const names: string[] = [];

      names.push(chain.species.name);
      if (chain.evolves_to.length) {
        names.push(chain.evolves_to[0].species.name);
        if (chain.evolves_to[0].evolves_to.length) {
          names.push(chain.evolves_to[0].evolves_to[0].species.name);
        }
      }

      setEvolutionNames(names);
    }
  }, [evolutionQuery.data]);

  const description =
    speciesQuery.data?.flavor_text_entries
      ?.find((entry) => entry.language?.name === 'en')
      ?.flavor_text?.replace(/\n|\f/g, ' ') ?? '';

  return {
    detail: detailQuery.data,
    description,
    evolutionNames,
    isLoading:
      detailQuery.isLoading ||
      speciesQuery.isLoading ||
      evolutionQuery.isLoading,
    isError:
      detailQuery.isError || speciesQuery.isError || evolutionQuery.isError,
  };
};
