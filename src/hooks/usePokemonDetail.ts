import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import {
  getPokemonDetail,
  getPokemonSpecies,
  getEvolutionChain,
} from '@/services/pokeApi';

export const usePokemonDetail = (name: string) => {
  const detailQuery = useQuery({
    queryKey: ['pokemon-detail', name],
    queryFn: () => getPokemonDetail(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 5,
  });

  const speciesName = detailQuery.data?.species?.name;

  const speciesQuery = useQuery({
    queryKey: ['pokemon-species', speciesName],
    queryFn: () => getPokemonSpecies(speciesName!),
    enabled: !!speciesName,
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
    if (evolutionQuery.data && speciesQuery.data) {
      const chain = evolutionQuery.data.chain;
      const speciesNames: string[] = [];

      speciesNames.push(chain.species.name);
      if (chain.evolves_to.length) {
        speciesNames.push(chain.evolves_to[0].species.name);
        if (chain.evolves_to[0].evolves_to.length) {
          speciesNames.push(chain.evolves_to[0].evolves_to[0].species.name);
        }
      }

      const allVarieties = speciesQuery.data.varieties;
      const validPokemonNames = speciesNames.map((speciesName) => {
        const match = allVarieties.find((v) =>
          v.pokemon.name.includes(speciesName)
        );
        return match?.pokemon.name ?? speciesName;
      });

      const uniqueNames = Array.from(new Set(validPokemonNames));
      setEvolutionNames(uniqueNames);
    }
  }, [evolutionQuery.data, speciesQuery.data]);

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
