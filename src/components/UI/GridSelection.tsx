import React, { useEffect, useMemo } from "react";


type GridSelectionProps = {
  width: number;
  height: number;
}

const GridSelection: React.FC<GridSelectionProps> = (props: GridSelectionProps) => {
  const MULTIPLIER = 3;
  const COLUMNS = 16 * MULTIPLIER;
  const ROWS = 9 * MULTIPLIER;
  const CELL_SIZE = Math.min(40, Math.min(props.width / COLUMNS, props.height / ROWS));


  const memoizedCells = useMemo(() => {
          const array = [...Array(COLUMNS * ROWS)].map((_, index) => {
          const col = index % Math.floor((COLUMNS * CELL_SIZE) / CELL_SIZE);
          const row = Math.floor((index * CELL_SIZE) / (COLUMNS * CELL_SIZE)) 
          return (
            <>
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
