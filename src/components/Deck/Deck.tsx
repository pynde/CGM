import { CARD_MIXTURE_ENUM, FACE_VISIBLE_ENUM, TYPES_AS_STRING } from '@shared/enums/enums';
import { FC } from 'react';

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
      {props.name}
     <h2 style={{color: 'red', fontWeight: 'bold'}}>KORTIT OVAT VÄÄRILLÄ PROPEILLA</h2>
    </div>
  );
};

export default Deck;