import React, { FC, ReactNode, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import Deck, { DeckProps }  from '../Deck/Deck';


interface CardSceneProps extends React.HTMLProps<HTMLDivElement> {}
const decks : DeckProps[] = [
  { name: "Cool deck", numberOfCards: 10 },
  { name: "OP deck", numberOfCards: 8 }
];

const CardScene : FC<CardSceneProps> = (props: CardSceneProps) => {

  const [selectedDeck, setSelectedDeck] = useState(decks[0]);

  return (
    <div className={"p-4 flex flex-1 w-full h-full justify-between items-center bg-amber-50/50"}>
            <Select.Root value={selectedDeck.name} onValueChange={(value) => {
              const deck = decks.find(deck => deck.name === value);
              if (deck) setSelectedDeck(deck);
            }}>
              <Select.Trigger className="w-64 py-2 px-3 text-left bg-gray-800 text-white rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                <Select.Value>{selectedDeck.name}</Select.Value>
              </Select.Trigger>
              <Select.Content position='popper' collisionPadding={0} className="absolute w-64 bg-gray-700 text-white rounded-lg shadow-lg">
                <Select.Viewport>
              {decks.map((deck, index) => (
                <Select.Item
                  key={deck.name + index}
                  value={deck.name}
                  className="cursor-pointer select-none py-2 px-3 rounded-lg"
                >
                  <Select.ItemText>{deck.name}</Select.ItemText>
                </Select.Item>
              ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
      <Deck name={selectedDeck.name} numberOfCards={selectedDeck.numberOfCards} />
    </div>
  );
};

export default CardScene;