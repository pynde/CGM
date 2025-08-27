import React, { FC } from 'react';

export interface CardProps {}

export const TemplateName : FC<CardProps> = () => {
  return (
    <div className={"flex w-full h-full justify-center items-center bg-stone-900/25"}>
      TemplateName
    </div>
  );
};