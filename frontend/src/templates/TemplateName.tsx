import React, { FC } from 'react';

export interface TemplateName {}

export const TemplateName : FC<TemplateName> = () => {
  return (
    <div className={"flex w-full h-full justify-center items-center bg-stone-900/25"}>
      TemplateName
    </div>
  );
};