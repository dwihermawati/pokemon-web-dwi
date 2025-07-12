'use client';

import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { capitalize } from '@/lib/formatStatName';
import { cn } from '@/lib/utils';
import {
  addToFavorite,
  removeFromFavorite,
} from '@/redux/features/favoritePokemonSlice';
import { useAppDispatch } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { PokemonCardData } from '@/types/pokemon';

type FavoriteButtonProps = {
  pokemon: PokemonCardData;
  className?: string;
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  pokemon,
  className,
}) => {
  const dispatch = useAppDispatch();
  const favorites = useSelector((state: RootState) => state.favorite.items);
  const isFavorited = favorites.some((item) => item.id === pokemon.id);

  const [pulse, setPulse] = useState(false);

  const handleToggleFavorite = () => {
    if (isFavorited) {
      dispatch(removeFromFavorite(pokemon.id));
      toast.error(
        `${capitalize(pokemon.name)} has been removed from favorites`
      );
    } else {
      dispatch(addToFavorite(pokemon));
      toast.success(`${capitalize(pokemon.name)} has been added to favorites`);

      // Trigger pulse animation
      setPulse(true);
      setTimeout(() => setPulse(false), 500); // reset after 500ms
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      aria-label='Toggle favorite'
      className={cn(
        'flex-center relative size-10 cursor-pointer rounded-full text-white transition-all',
        isFavorited
          ? 'bg-accent-yellow hover:opacity-70'
          : 'bg-neutral-400 hover:text-black hover:opacity-70',
        'hover:scale-105 active:scale-95',
        className
      )}
      title={isFavorited ? 'Remove from favorite' : 'Add to favorite'}
    >
      {pulse && (
        <span className='bg-accent-yellow absolute inline-flex h-full w-full animate-ping rounded-full opacity-75' />
      )}
      <Icon
        icon={isFavorited ? 'uis:favorite' : 'uit:favorite'}
        className='size-6'
        color='#ffffff'
      />
    </button>
  );
};
