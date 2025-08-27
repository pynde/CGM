import React, { FC } from 'react';
import { CARD_MIXTURE_ENUM, FACE_VISIBLE_ENUM, TYPE_ENUM } from '@shared/enums/enums';
import GameComponent from '../GameComponent/GameComponent';

export interface DeckProps {
  name: string,
  numberOfCards: number,
  face?: FACE_VISIBLE_ENUM,
  image?: URL,
  cardMixture?: CARD_MIXTURE_ENUM
  canBeBrowsed?: boolean
}

const Deck : FC<DeckProps> = (props: DeckProps) => {
  return (
    <div className={'Deck'}>
      { "DECK: " + props.name }
     { props.face === FACE_VISIBLE_ENUM.FRONT 
     ? 
     <GameComponent ownerId={''} id='' name={"testi" + FACE_VISIBLE_ENUM.FRONT} actions={[]} price={[]} type={TYPE_ENUM.GAME_COMPONENT} renderAs= 'html' style={{
          imgUrls: [],
          width: 200,
          height: 300, 
          
        }}/> 
     : 
     <GameComponent ownerId={''} id='' name={"testi" + FACE_VISIBLE_ENUM.BACK} actions={[]} price={[]} type={TYPE_ENUM.GAME_COMPONENT} renderAs= 'html' style={{
          imgUrls: [],
          width: 200,
          height: 300, 
          
        }}/>}
     <h2 style={{color: 'red', fontWeight: 'bold'}}>KORTIT OVAT VÄÄRILLÄ PROPEILLA</h2>
    </div>
  );
};

export default Deck;