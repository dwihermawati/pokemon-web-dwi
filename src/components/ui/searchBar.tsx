'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { generateClamp } from '@/function/generate-clamp';
import TypingPlaceholderInput from './typingPlaceholderInput';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== '/search') {
      setQuery('');
    }
  }, [pathname]);

  const handleSubmit = () => {
    const trimmed = query.trim();
    if (trimmed.length > 0) {
      router.push(`/search?query=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className='flex-between focus-within:border-primary-300 w-full gap-1.5 rounded-full bg-neutral-100 focus-within:border md:w-129.5'
      style={{
        paddingInline: generateClamp(16, 24, 1248),
        height: generateClamp(48, 56, 1248),
      }}
    >
      <TypingPlaceholderInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className='w-full'
      />

      <div className='flex-center gap-4'>
        {query && (
          <div
            className='aspect-square size-5 rounded-full bg-neutral-400 p-1 hover:bg-black md:size-6'
            onClick={() => setQuery('')}
            aria-label='Clear search'
            title='Clear Search'
          >
            <Icon icon='ph:x-bold' className='size-full text-white' />
          </div>
        )}

        <div
          onClick={handleSubmit}
          aria-label='Submit search'
          className='bg-secondary-300 hover:bg-primary-300 flex-center aspect-square rounded-full text-white hover:text-black'
          style={{ width: generateClamp(28, 40, 1248), height: 'auto' }}
        >
          <Icon
            icon='uil:search'
            style={{ width: generateClamp(16.8, 24, 1248) }}
            className='size-full'
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
