'use client';

import { Icon } from '@iconify/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { generateClamp } from '@/function/generate-clamp';
import { cn } from '@/lib/utils';

import TypingPlaceholderInput from './typingPlaceholderInput';

type SearchBarProps = {
  classname?: string;
  style?: React.CSSProperties;
};

const SearchBar: React.FC<SearchBarProps> = ({ classname, style }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlQuery = searchParams.get('query') || '';

  const [query, setQuery] = useState(urlQuery);

  useEffect(() => {
    if (pathname !== '/search') {
      setQuery(urlQuery);
    }
  }, [pathname, urlQuery]);

  const handleSubmit = () => {
    const trimmed = query.trim();
    if (trimmed.length > 0) {
      router.push(`/search?query=${encodeURIComponent(trimmed)}`, {
        scroll: false,
      });
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
      className={cn(
        'flex-between focus-within:border-primary-300 w-full gap-1.5 rounded-full bg-neutral-100 py-2 focus-within:border md:w-129.5',
        classname
      )}
      style={{
        ...style,
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
          style={{ height: generateClamp(28, 40, 1248), width: 'auto' }}
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
