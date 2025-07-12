import React from 'react';

import { capitalize } from '@/lib/formatStatName';

type BadgeProps = {
  label?: string;
  badge: string[];
};

const Badge: React.FC<BadgeProps> = ({ label, badge }) => {
  return (
    <div className='flex flex-col'>
      {label && (
        <p className='text-lg-semibold md:text-xl-semibold mb-1 text-neutral-900 md:mb-2.5'>
          {label}
        </p>
      )}
      <div className='flex gap-3'>
        {badge.map((item) => (
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
