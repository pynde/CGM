import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import React, { useState } from 'react';

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string
    arrayLength: number;
    setIndex?: (index: number) => void;
}
/**
 * Carousel component that displays its children one at a time with navigation buttons.
 * Allows cycling through children using left/right arrows.
 * Optionally accepts a getCurrentItem callback to retrieve the current item.
 */

const Carousel: React.FC<CarouselProps> = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        const i = props.arrayLength-1 === currentIndex ? 0 : currentIndex + 1;
        setCurrentIndex(i);
        props.setIndex && props.setIndex(i);
    };

    const previousSlide = () => {
        const i = currentIndex === 0 ? props.arrayLength - 1 : currentIndex - 1;
        setCurrentIndex(i);
        props.setIndex && props.setIndex(i);
    };

    if (React.Children.count(props.children) === 0) {
        return <div className="text-center text-gray-500">No items to display</div>;
    }

    return (
        <div className={ clsx('relative flex flex-col items-center justify-center', props.className && props.className)}>
            <div className="flex items-center p-2 justify-center w-full gap-2">                
                <button 
                    onClick={previousSlide}
                    className="p-2 w-16 h-16 text-2xl dark:bg-darkbglighter rounded-full hover:bg-darkbglighter/50 transition-colors"
                >
                        <ChevronLeftIcon/>
                </button>
                <span>{props.title}</span>              
                <button 
                    onClick={nextSlide}
                    className="p-2 w-16 h-16 text-2xl dark:bg-darkbglighter rounded-full hover:bg-darkbglighter/50  transition-colors"
                    >
                        <ChevronRightIcon/>
                </button>
            </div>
                <div className="mx-4 contentishere first:shadow-intense">
                    { props.children }
                </div>
        </div>
    );
};

export default Carousel;