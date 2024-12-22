import React, { FC } from 'react';
import { Card } from '../Card/Card';
import { CARD_MIXTURE_ENUM, FACE_VISIBLE_ENUM, GAME_COMPONENT_ENUM } from '@shared/enums/enums';

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
     <Card ownerId={''} id='' name={"testi" + FACE_VISIBLE_ENUM.FRONT} actions={[]} price={[]} type={GAME_COMPONENT_ENUM.CARD} style={{
          imgUrls: [],
          width: 200,
          height: 300
        }}/> 
     : 
     <Card ownerId={''} visibleSide={FACE_VISIBLE_ENUM.BACK} name={"testi" + FACE_VISIBLE_ENUM.BACK} id={''} actions={[]} price={[]} type={GAME_COMPONENT_ENUM.CARD} style={{
          imgUrls: [],
          width: 200,
          height: 300
        }}/>}
     <h2 style={{color: 'red', fontWeight: 'bold'}}>KORTIT OVAT VÄÄRILLÄ PROPEILLA</h2>
    </div>
  );
};

export default Deck;