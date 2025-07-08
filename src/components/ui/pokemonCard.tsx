import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import Badge from './badge';

type PokemonCardProps = {
  pokeImage: string;
  pokeId: number;
  pokeName: string;
  pokeType?: string[];
  variant?: 'default' | 'evolution';
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokeImage,
  pokeId,
  pokeName,
  pokeType,
  variant = 'default',
}) => {
  return (
    <div
      className={cn(
        'bg-neutral-25 flex flex-col gap-0 rounded-2xl border border-neutral-300 p-3 md:gap-6 md:rounded-4xl md:p-6',
        variant === 'evolution' && 'gap-3 p-4 md:gap-3 md:rounded-2xl md:p-4'
      )}
    >
      <div
        className={cn(
          'flex-center aspect-square h-50 w-auto',
          variant === 'evolution' && 'h-40'
        )}
        style={{ backgroundImage: 'url(/images/bg-pokemon-card.png)' }}
      >
        <Image
          src={pokeImage}
          alt={pokeName}
          width={0}
          height={0}
          className='size-full object-contain'
        />
      </div>
      {variant === 'default' ? (
        <div className='flex flex-col gap-4'>
          <div>
            <p className='text-md-regular max-md:text-sm-regular text-neutral-500'>
              {pokeId}
            </p>
            <p className='text-xl-semibold max-md:text-md-semibold text-neutral-900'>
              {pokeName}
            </p>
          </div>
          <Badge badge={pokeType} />
        </div>
      ) : (
        <div>
          <p className='text-md-regular text-neutral-500'>{pokeId}</p>
          <p className='text-xl-semibold text-neutral-900'>{pokeName}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
