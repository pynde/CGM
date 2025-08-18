import { useState } from "react";

export interface CarouselState<T> {
    currentIndex: number;
    currentItem: T | undefined;
    next: () => void;
    prev: () => void;
    goTo: (index: number) => void;
    hasNext: boolean;
    hasPrev: boolean;
}

export function useCarousel<T>(items: T[], initialIndex: number = 0): CarouselState<T> {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < items.length - 1;

    const next = () => {
        setCurrentIndex((i) => (i < items.length - 1 ? i + 1 : i));
    };

    const prev = () => {
        setCurrentIndex((i) => (i > 0 ? i - 1 : i));
    };

    const goTo = (index: number) => {
        if (index >= 0 && index < items.length) {
            setCurrentIndex(index);
        }
    };

    return {
        currentIndex,
        currentItem: items[currentIndex],
        next,
        prev,
        goTo,
        hasNext,
        hasPrev,
    };
}