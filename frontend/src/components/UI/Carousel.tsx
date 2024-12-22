import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import React, { useState } from 'react';

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    items: JSX.Element[];
}

const Carousel: React.FC<CarouselProps> = ({ items, ...props }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === items.length - 1 ? 0 : prevIndex + 1
        );
    };

    const previousSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? items.length - 1 : prevIndex - 1
        );
    };

    if (!items.length) {
        return <div className="text-center text-gray-500">No items to display</div>;
    }

    return (
        <div className={ clsx('relative flex flex-col items-center justify-center', props.className && props.className)}>
            <div className="flex items-center min-h-80 justify-between w-full">
                <button 
                    onClick={previousSlide}
                    className="p-2 w-16 h-16 text-2xl dark:bg-darkbglighter rounded-full hover:bg-darkbglighter/50 transition-colors"
                >
                    <ChevronLeftIcon/>
                </button>
                <div className="mx-4 contentishere first:shadow-intense">
                    {items[currentIndex]}
                </div>
                <button 
                    onClick={nextSlide}
                    className="p-2 w-16 h-16 text-2xl dark:bg-darkbglighter rounded-full hover:bg-darkbglighter/50  transition-colors"
                >
                    <ChevronRightIcon/>
                </button>
            </div>
            
            <div className="flex gap-2 mt-4">
                {items.map((_, index) => (
                    <span
                        key={index}
                        className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
                            index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;