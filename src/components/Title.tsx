type TitleProps = {
  point: {
    v: number;
    y: number;
    x?: number;
  }
}

export const Title = ({ point }: TitleProps) => {
  return (
    <div 
      className='absolute  left-[100px] -translate-x-2/4 -translate-y-2/4 font-mono text-base text-sky-600' 
      style={{top: `${point.y}px`, left:`${point.x}px`}} 
    >
      {point.v}
    </div>
  )
}
