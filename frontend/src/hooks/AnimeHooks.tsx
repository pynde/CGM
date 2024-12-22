import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

type AnimeProps = {
    selector: string,
    ref_a: React.RefObject<SVGSVGElement> | null,
    ref_b: React.RefObject<SVGSVGElement> | null,
    animationProps?: anime.AnimeParams,
}

const useAnime = ({ selector, animationProps, ref_a, ref_b }: AnimeProps) => {
    console.log('ref_a', ref_a, 'ref_b', ref_b);
    useEffect(() => {
        if (!ref_a?.current || !ref_b?.current) return;
        
        // Locate the morphable element (e.g., a <polygon> or <path>)
        const targetElement_a = ref_a.current.querySelector<SVGPolygonElement | SVGPathElement>(
            selector
        );
        const targetElement_b = ref_b.current.querySelector<SVGPolygonElement | SVGPathElement>(
            selector
        )

        console.log('targetElement_a', targetElement_a);
        console.log('targetElement_b', targetElement_b);

        if (!targetElement_a || !targetElement_b) {
            console.warn(`No element found with selectors: ${selector}`);
            return;
        }

        // Dynamically extract the "points" or "d" attribute
        const path_a = targetElement_a.getAttribute('d');
        const path_b = targetElement_b.getAttribute('d');

        if (!path_a || !path_b) {
            console.warn(`No "d" attribute found on the target element.`);
            return;
        }

        // Dynamically construct animation targets
        const generatedPath = [
            { value: path_a },
            { value: path_b },
        ];

        // Apply the anime.js animation
        anime({
            targets: targetElement_a,
            d: generatedPath,
            easing: 'easeInOutSine',
            duration: 2000,
            loop: true,
            ...animationProps, // Allow additional customizations
        });
    }, [animationProps, selector]);

};

export default useAnime;