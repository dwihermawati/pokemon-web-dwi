/* eslint-disable @next/next/no-img-element */
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { generateClamp } from '@/function/generate-clamp';
import { capitalize } from '@/lib/formatStatName';
import { cn } from '@/lib/utils';

import { FavoriteButton } from './favoritePokemonButton';
import { ViewDetailButton } from './ViewDetailButton';
import Badge from '../ui/badge';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '../ui/dialog';

type PokemonCardProps = {
  pokeImage: string;
  pokeId: number;
  pokeName: string;
  pokeType?: string[];
  variant?: 'default' | 'evolution';
  className?: string;
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokeImage,
  pokeId,
  pokeName,
  pokeType,
  variant = 'default',
  className,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isMainImageLoaded, setIsMainImageLoaded] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${pokeName}`, { scroll: false });
  };
  return (
    <>
      <div
        className={cn(
          'bg-neutral-25 relative flex flex-col border border-neutral-300 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.01] hover:drop-shadow',
          className
        )}
        style={
          variant === 'default'
            ? {
                padding: generateClamp(12, 24, 1248),
                gap: generateClamp(0.1, 24, 1248),
                borderRadius: generateClamp(16, 24, 1248),
              }
            : { padding: '1rem', gap: '0.75rem', borderRadius: '1rem' }
        }
      >
        {/* Action Button */}
        <div
          className={cn(
            'absolute right-5 bottom-5 z-10 flex gap-3',
            variant === 'evolution'
              ? 'max-sc670:flex-col sc670:right-3 sc670:bottom-13 flex'
              : 'flex-col'
          )}
        >
          <FavoriteButton
            pokemon={{
              id: pokeId,
              name: pokeName,
              image: pokeImage,
              types: pokeType?.map((type) => ({ type: { name: type } })) || [],
            }}
            className={cn(variant === 'evolution' && 'sc670:size-7')}
          />
          <ViewDetailButton
            name={pokeName}
            className={cn(variant === 'evolution' && 'sc670:size-7')}
          />
        </div>

        {/* Card Image */}
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
          <img
            src={pokeImage}
            alt={pokeName}
            className='size-full cursor-pointer object-contain hover:scale-103 hover:brightness-105 active:scale-95'
            onClick={() => setDialogOpen(true)}
          />
        </div>

        {/* Card Content */}
        {variant === 'default' ? (
          <div className='mr-11 flex flex-col gap-4' onClick={handleClick}>
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
                className='hover:text-primary-400 cursor-pointer font-semibold text-neutral-900 transition-all duration-300 ease-in-out'
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
          <div onClick={handleClick}>
            <p className='text-md-regular text-neutral-500'>
              {pokeId.toString().padStart(3, '0')}
            </p>
            <p className='text-xl-semibold hover:text-primary-400 cursor-pointer text-neutral-900 transition-all duration-300 ease-in-out'>
              {capitalize(pokeName)}
            </p>
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <div className='flex-between'>
            <DialogTitle>{capitalize(pokeName)}</DialogTitle>
            <DialogClose>
              <XIcon className='text-accent-yellow size-9 cursor-pointer opacity-100 transition-opacity hover:opacity-70 max-md:size-8' />
            </DialogClose>
          </div>

          <div className='relative mx-auto aspect-square h-full w-full max-w-[300px]'>
            {!isMainImageLoaded && (
              <div className='flex-center absolute inset-0 pb-3'>
                <img
                  src='/images/bg-pokemon-card.png'
                  alt='skeleton'
                  className='size-full object-contain opacity-30'
                />
              </div>
            )}
            <img
              src={pokeImage}
              alt={pokeName}
              className={cn(
                'size-full object-contain transition-opacity duration-300',
                isMainImageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => setIsMainImageLoaded(true)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PokemonCard;
