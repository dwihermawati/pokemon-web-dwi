import React from 'react';

import { capitalize } from '@/lib/formatStatName';
import { cn } from '@/lib/utils';

type BadgeProps = {
  label?: string;
  badge: string[];
  className?: string;
};

const Badge: React.FC<BadgeProps> = ({ label, badge, className }) => {
  const uniqueBadge = [...new Set(badge)];
  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <p className='text-lg-semibold md:text-xl-semibold mb-1 text-neutral-900 md:mb-2.5'>
          {label}
        </p>
      )}
      <div className='flex flex-wrap gap-3'>
        {uniqueBadge.map((item) => (
          <div
            key={item}
            className='text-md-medium flex-center h-9 rounded-md border border-neutral-300 bg-white p-2 text-neutral-900'
          >
            {capitalize(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badge;
