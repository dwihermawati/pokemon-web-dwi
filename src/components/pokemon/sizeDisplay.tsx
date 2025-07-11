// components/pokemon/SizeDisplay.tsx
import React from 'react';
import { Icon } from '@iconify/react';
import { formatHeight, formatWeight } from '@/lib/formatMeasurement';
import { generateClamp } from '@/function/generate-clamp';

type SizeDisplayProps = {
  height: number;
  weight: number;
};

const SizeDisplay: React.FC<SizeDisplayProps> = ({ height, weight }) => {
  return (
    <>
      <p
        className='font-semibold text-neutral-900'
        style={{
          marginBottom: generateClamp(4, 10, 1248),
          fontSize: generateClamp(18, 20, 1248),
          lineHeight: generateClamp(32, 34, 1248),
        }}
      >
        Size
      </p>
      <div className='flex gap-12'>
        <div className='flex w-20 flex-col gap-1'>
          <div className='flex'>
            <Icon
              icon='material-symbols:weight-outline'
              className='size-6 text-neutral-900'
            />
            <span className='text-md-regular text-neutral-700'>Weight</span>
          </div>
          <span className='display-md-bold text-neutral-900'>
            {formatWeight(weight)} <span className='text-md-regular'>Kg</span>
          </span>
        </div>
        <div className='flex w-20 flex-col gap-1'>
          <div className='flex'>
            <Icon
              icon='fluent:ruler-24-regular'
              className='size-6 text-neutral-900'
            />
            <span className='text-md-regular text-neutral-700'>Height</span>
          </div>
          <span className='display-md-bold text-neutral-900'>
            {formatHeight(height)} <span className='text-md-regular'>m</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default SizeDisplay;
