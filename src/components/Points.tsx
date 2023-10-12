import { useEffect, useState } from 'react';
import { Point } from './Point';
import { Title } from './Title';
import { calc, getDy, randomRoundNumber } from '../utils';
import { PointType } from '../types';

const p1 = randomRoundNumber(0, 200);
const p2 = randomRoundNumber(0, 200);
const p3 = randomRoundNumber(0, 200);

// test value
// const testP1 = 190;
// const testP2 = 157;
// const testP3 = 124;

const points = [
  // {v: testP1, y: getDy(testP1), x: 100},
  // {v: testP2, y: getDy(testP2), x: 100},
  // {v: testP3, y: getDy(testP3), x: 100}
  {v: p1, y: getDy(p1), x: 100},
  {v: p2, y: getDy(p2), x: 100},
  {v: p3, y: getDy(p3), x: 100},
];
points.sort((a, b) => b.v - a.v);

export const Points = () => {
  const [data, setData] = useState(points);
  const [dataTitles, setDataTitles] = useState<PointType[]>([]);

  const randomHandler = () => {
    const p1 = randomRoundNumber(0, 200);
    const p2 = randomRoundNumber(0, 200);
    const p3 = randomRoundNumber(0, 200);
    const points = [
      {v: p1, y: getDy(p1), x: 100},
      {v: p2, y: getDy(p2), x: 100},
      {v: p3, y: getDy(p3), x: 100},
    ];
    points.sort((a, b) => b.v - a.v);
    setData(points);
  }

  useEffect(() => {
    const uniq = data.filter((d, i) => {
      return data.findIndex((a) => a.v === d.v) === i;
    });
    const p = calc(uniq);
    setDataTitles(p);
  }, [data]);

  return (
    <>
      <div className='relative w-[200px] h-[204px] border border-dashed border-gray-400 rounded'>
        {data.map((p, i) => <Point key={i} y={p.y} />)}
        {dataTitles.map((p, i) => (p.dy 
          ? <Title key={i} point={{y: p.dy, v: p.v, x: p.dx}} />
          : null))}
      </div>
      <button 
        className="mt-4 bg-sky-500 hover:bg-sky-400 text-white font-bold py-2 px-4 rounded"
        onClick={randomHandler}
      >
        Random
      </button>
    </>
  );
}
