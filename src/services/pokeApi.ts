import api from '@/lib/axios';
import {
  PokemonListResponse,
  PokemonDetail,
  PokemonSpecies,
  EvolutionChain,
} from '@/types/pokemon';

export const getPokemonList = async (offset = 0, limit = 24) => {
  const res = await api.get<PokemonListResponse>('/pokemon', {
    params: { offset, limit },
  });
  return res.data;
};

export const getPokemonDetailByUrl = async (url: string) => {
  const res = await api.get<PokemonDetail>(url);
  return res.data;
};

export const getPokemonDetail = async (name: string) => {
  const res = await api.get<PokemonDetail>(`/pokemon/${name}`);
  return res.data;
};

export const getPokemonSpecies = async (name: string) => {
  const res = await api.get<PokemonSpecies>(`/pokemon-species/${name}`);
  return res.data;
};

export const getEvolutionChain = async (id: number) => {
  const res = await api.get<EvolutionChain>(`/evolution-chain/${id}`);
  return res.data;
};
