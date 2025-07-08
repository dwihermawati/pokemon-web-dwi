import React from 'react';

type BadgeProps = {
  label?: string;
  badge: string[];
};

const Badge: React.FC<BadgeProps> = ({ label, badge }) => {
  return (
    <div className='flex flex-col gap-1 md:gap-2.5'>
      <span className='text-lg-semibold md:text-xl-semibold text-neutral-900'>
        {label}
      </span>
      <div className='flex gap-3'>
        {badge.map((item) => (
          <div
            key={item}
            className='text-md-medium h-9 rounded-md border border-neutral-300 bg-white p-2 text-neutral-900'
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badge;
