export type DetailTypePokemon = {
  type: {
    name: string;
  };
};

export type DetailAbilityPokemon = {
  ability: {
    name: string;
  };
};

export type DetailStatPokemon = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

export type PokemonDetail = {
  id: number;
  name: string;
  types: DetailTypePokemon[];
  abilities: DetailAbilityPokemon[];
  sprites: {
    front_default: string;
    other?: {
      ['official-artwork']?: { front_default: string };
    };
  };
  weight: number;
  height: number;
  stats: DetailStatPokemon[];
};

export type PokemonSpecies = {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
};

export type EvolutionChain = {
  id: number;
  chain: {
    species: { name: string };
    evolves_to: {
      species: { name: string };
      evolves_to: {
        species: { name: string };
      }[];
    }[];
  };
};
