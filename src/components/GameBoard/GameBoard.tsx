import React, { FC } from 'react';

interface GameBoardProps {}

const GameBoard : FC<GameBoardProps> = () => {
  return (
    <div className={"flex w-full h-full justify-center items-center bg-stone-900/25"}>
      GameBoard
    </div>
  );
};

export default GameBoard;