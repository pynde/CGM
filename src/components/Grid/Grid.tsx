import React, { FC, ReactNode } from 'react';

interface GridProps {
  children: ReactNode
}

const Grid : FC<GridProps> = ({ children }) => {
  return (
    <div>
      { children }
    </div>
  );
};

export default Grid;