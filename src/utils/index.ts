import { PointType } from "../types";
const axisYHeight = 200;

export const randomNumber =(min: number, max: number) => {
  return Math.random() * (max - min) + min;
}

export const randomRoundNumber = (min: number, max: number) => {
  return Math.round(randomNumber(min, max));
}

export const getDy = (v: number) => {
  return axisYHeight - (v / axisYHeight * axisYHeight);
}

export const calc = (ps: PointType[]) => {
  const points: PointType[] = ps.map(p => ({
    v: p.v, 
    y: p.y, 
    x: p.x,
    dy: undefined,
    dx: undefined,
  }))
  // up - 12
  // down + 12

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const pNext = points[i - 1];
    const pPrev = points[i + 1];
    // console.log(p.v, {p, pNext, pPrev});

    const h = 22;
    const hmin = 20;
    if (!pNext && pPrev) {
      // console.log(p.v, {p, pNext, pPrev});
      if (p.y > hmin) {
        p.dy = p.y - 12;
      } else if (pPrev.y - p.y >= h) {
        p.dy = p.y + 12;
      } else if (points[i + 2]) {
        const pPrev2 = points[i + 2];
        if (pPrev2.y - pPrev.y > h) {
          p.dy = pPrev.y + 12;
          pPrev.dy = pPrev.y + 12;
        } else if (axisYHeight - pPrev2.y > h) {
          p.dy = pPrev2.y + 12;
          pPrev2.dy = p.dy;
        }
      }
    } else if (pNext && pPrev) {
      // console.log(p.v, {p, pNext, pPrev});
      if (p.dy && pPrev.y - p.y > h * 2) {
        p.dy += 14;
      } else if (p.y - pNext.y > h && pNext.dy && p.y - pNext.dy > h) {
        p.dy = p.y - 12;
      } else if (!p.dy &&pPrev.y - p.y > h) {
        p.dy = p.y + 12;
      } else if (pPrev.dy) {
        p.dy = pPrev.dy + 14;
        pPrev.dy = p.dy + 14;
      } else if (axisYHeight - pPrev.y >= h * 2) {
        p.dy = pPrev.y + 12;
        pPrev.dy = p.dy + 14;
      } else if (pNext.dy){
        p.dy = pNext.dy;
        pNext.dy = p.dy -14;
      }
    } else if (pNext && !pPrev) {
      // console.log(p.v, {p, pNext, pPrev});
      if (!p.dy) {
        if (axisYHeight - p.y <= h && p.y - pNext.y > h) {
          p.dy = p.y - 12;
        } else if (p.y - pNext.y >= h && pNext.dy && p.y - pNext.dy > h) {
          p.dy = p.y - 12;
        } else if (axisYHeight - p.y > h) {
          p.dy = p.y + 12;
        } else if (pNext.dy && p.y - pNext.dy > 24 && p.y - pNext.y >= h) {
          p.dy = p.y - 12;
        } else if (p.y + 12 < axisYHeight) {
          p.dy = p.y + 12;
        } else if (points[i - 2]) {
          const pNext2 = points[i - 2];
          if (pNext.dy && pNext.y - pNext2.y > h * 2) {
            p.dy = pNext.dy;
            pNext.dy = p.dy - 14;
          } else if (pNext2.dy) {
            const dy = pNext2.dy
            pNext2.dy -= 14;
            p.dy = pNext.dy;
            pNext.dy = dy;
          }
        }
        // console.log('case');
      }
    }
  
  }
  // console.log({points});
  return points;
}