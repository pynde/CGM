import { GameStateContext } from '@root/src/context/GameStateContext';
import { BankType, isTypeOf, Owner } from '@shared/types/types';
import React, { FC, useContext, useMemo } from 'react';

export interface BankProps extends Owner<BankType> {
  
}

export const Bank : FC<BankProps> = (props: BankProps) => {

  const { gameState } = useContext(GameStateContext);

  const getBankResources: JSX.Element[] | null = useMemo<JSX.Element[] | null>(() => {
    if(isTypeOf<Owner<BankType>>(props, props.type)) {
      const resourceElements = [];
      for(let i = 0; i < props.resources.length; i++) {
        resourceElements.push(<div key={i} className='p-4 m-2'>{props.resources[i].resource.value + props.resources[i].type}</div>)
      }
      return resourceElements;
    }
    else return null;
  }, props.resources.map(resource => resource.amount));

  return (
    <div className={"flex grow self-stretch justify-center items-center bg-stone-900/25"}>
      { getBankResources }
    </div>
  );
};