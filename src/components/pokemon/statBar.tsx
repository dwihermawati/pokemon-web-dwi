import React from 'react';

import formatStatName from '@/lib/formatStatName';

type Stat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

type StatsSectionProps = {
  stats: Stat[];
};

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <section className='flex flex-col gap-2 md:gap-3'>
      <h2 className='text-xl-semibold text-neutral-900'>Stats</h2>
      {stats.map(({ base_stat, stat }) => (
        <StatBar key={stat.name} label={stat.name} value={base_stat} />
      ))}
    </section>
  );
};
export default StatsSection;

type StatBarProps = {
  label: string;
  value: number;
  max?: number;
};

const StatBar: React.FC<StatBarProps> = ({ label, value, max = 100 }) => {
  const percentage = Math.min((value / max) * 100, 100);

  const getColor = (val: number) => {
    if (val >= 80) return 'bg-accent-green';
    if (val >= 40) return 'bg-accent-yellow';
    return 'bg-accent-red';
  };

  return (
    <div className='flex items-center gap-4'>
      <span className='md:text-md-regular text-sm-regular w-25 text-neutral-900'>
        {formatStatName(label)}
      </span>
      <span className='text-sm-semibold md:text-md-semibold w-5.5 text-neutral-900'>
        {value}
      </span>
      <div className='h-3 flex-1 overflow-hidden rounded-full bg-neutral-200'>
        <div
          className={`h-full ${getColor(value)} rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
