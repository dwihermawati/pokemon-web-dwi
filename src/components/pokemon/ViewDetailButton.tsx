'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

type ViewDetailButtonProps = {
  name: string;
  className?: string;
};

export const ViewDetailButton: React.FC<ViewDetailButtonProps> = ({
  name,
  className,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pokemon/${name}`, { scroll: false });
  };

  return (
    <button
      onClick={handleClick}
      aria-label='View detail'
      className={cn(
        'flex-center relative size-10 cursor-pointer rounded-full bg-neutral-400 text-white transition-all hover:scale-105 hover:opacity-70 active:scale-95',
        className
      )}
      title='View Detail'
    >
      <Icon icon='hugeicons:pokemon' className='size-6' />
    </button>
  );
};
