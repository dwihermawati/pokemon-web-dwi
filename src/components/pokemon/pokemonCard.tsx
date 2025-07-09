import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import Badge from '../ui/badge';
import { capitalize } from '@/lib/formatStatName';
import { generateClamp } from '@/function/generate-clamp';

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
        'bg-neutral-25 group flex flex-col border border-neutral-300 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.01] hover:drop-shadow'
      )}
      style={
        variant === 'default'
          ? {
              padding: generateClamp(12, 24, 1248),
              gap: generateClamp(0, 24, 1248, { safeMin: true }),
              borderRadius: generateClamp(16, 24, 1248),
            }
          : { padding: '1rem', gap: '0.75rem', borderRadius: '1rem' }
      }
    >
      <div
        className={cn(
          'flex-center aspect-square h-50 w-auto',
          variant === 'evolution' && 'h-40'
        )}
        style={{
          backgroundImage: 'url(/images/bg-pokemon-card.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <Image
          src={pokeImage}
          alt={pokeName}
          width={0}
          height={0}
          sizes='100vw'
          className='size-full cursor-pointer object-contain'
        />
      </div>
      {variant === 'default' ? (
        <div className='flex cursor-pointer flex-col gap-4'>
          <div>
            <p
              className='font-regular text-neutral-500'
              style={{
                fontSize: generateClamp(14, 16, 1248),
                lineHeight: generateClamp(28, 30, 1248),
              }}
            >
              {pokeId.toString().padStart(3, '0')}
            </p>
            <p
              className='group-hover:text-primary-400 font-semibold text-neutral-900 transition-all duration-300 ease-in-out'
              style={{
                fontSize: generateClamp(16, 20, 1248),
                lineHeight: generateClamp(30, 34, 1248),
              }}
            >
              {capitalize(pokeName)}
            </p>
          </div>
          {pokeType && <Badge badge={pokeType} />}
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
