import React, { FC, useEffect } from 'react';
import { FACE_VISIBLE_ENUM, GAME_COMPONENT_ENUM } from '@shared/enums/enums';
import { CardType, GameComponent, TailwindCSS} from "@shared/types/types"
import useGameComponent from '@root/src/hooks/GameComponentHooks';
import { useVisuals } from '@root/src/hooks/VisualsHooks';

export type CardProps = GameComponent<CardType> & {
  tailwindCSS?: TailwindCSS,
}


export const Card: FC<CardProps> = ({ 
  visibleSide=FACE_VISIBLE_ENUM.FRONT, 
  ...props 
}: CardProps) => {
  const card : GameComponent<CardType> = {...props, type: GAME_COMPONENT_ENUM.CARD};
  const GC_Card = useGameComponent(card);
  const styledCard = useVisuals(card.style);
  
  const handleClick = () => {
    GC_Card.selectComponent(GC_Card.component);
  }

  return(
        <div 
          onClick={handleClick} 
          className={`Card relative text-center text-black bg-green-500 bg-cover rounded-md ` + props.tailwindCSS + GC_Card.getGCStyle } 
          style={ 
            {  
              backgroundImage: `url(${props.style.imgUrls ? props.style.imgUrls[0] : ''})`, 
              width: `${styledCard.resize(props.style.width, 300)}px`,
              height: `${styledCard.resize(props.style.height, 300)}px`,
            }
          }
          
          >
          <div className='bg-white m-2'>{ props.name }</div>
          <div className='bg-white m-2'>{ props.price?.map(item => {return item.resource.value + item.type}) }</div>
        </div>
  )
};
