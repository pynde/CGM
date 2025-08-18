import React, { useEffect, useMemo } from "react";
import { Layer, Rect, } from "react-konva";

interface SelectionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

type GridSelectionProps = {
  width: number;
  height: number;
}

const GridSelection: React.FC<GridSelectionProps> = (props: GridSelectionProps) => {
  const MULTIPLIER = 3;
  const COLUMNS = 16 * MULTIPLIER;
  const ROWS = 9 * MULTIPLIER;
  const CELL_SIZE = Math.min(40, Math.min(props.width / COLUMNS, props.height / ROWS));


  useEffect(() => {
    console.log('width and height', props.width, props.height);
  }, [props.width]);

  const memoizedCells = useMemo(() => {
          const array = [...Array(COLUMNS * ROWS)].map((_, index) => {
          const col = index % Math.floor((COLUMNS * CELL_SIZE) / CELL_SIZE);
          const row = Math.floor((index * CELL_SIZE) / (COLUMNS * CELL_SIZE)) 
          return (
            <>
              <Rect
                x={col * CELL_SIZE}
                y={row * CELL_SIZE}
                width={CELL_SIZE}
                height={CELL_SIZE}
                stroke={`rgb(150, 180, 200)`}
                strokeWidth={0.5}
                fill={'white'}
              />
            </>
          );
        })
        return array;
  }, [props.width, props.height])

  return (
        <>
          {memoizedCells}
        </>

  );
};

export default GridSelection;
