import React from 'react';
import { Point } from './Point';
import { Title } from './Title';

export const Points = () => {
  return (
    <div className='relative w-[200px] h-[204px] border border-dashed border-gray-400'>
      <Point />
      <Title />
    </div>
  )
}
