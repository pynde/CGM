/**
 * Calculates the top-left position to center a child element within a parent element.
 * @param parentWidth Width of the parent element
 * @param parentHeight Height of the parent element
 * @param childWidth Width of the child element
 * @param childHeight Height of the child element
 * @returns { x: number, y: number }
 */
export function centerElement(
    parentWidth: number,
    parentHeight: number,
    childWidth: number,
    childHeight: number
): { x: number; y: number } {
    return {
        x: (parentWidth - childWidth) / 2,
        y: (parentHeight - childHeight) / 2,
    };
}

/**
 * Calculates the top-left position to align a child element to the top-left of the parent.
 * @returns { x: number, y: number }
 */
export function alignTopLeft(): { x: number; y: number } {
    return { x: 0, y: 0 };
}

/**
 * Calculates the top-left position to align a child element to the bottom-right of the parent.
 * @param parentWidth Width of the parent element
 * @param parentHeight Height of the parent element
 * @param childWidth Width of the child element
 * @param childHeight Height of the child element
 * @returns { x: number, y: number }
 */
export function alignBottomRight(
    parentWidth: number,
    parentHeight: number,
    childWidth: number,
    childHeight: number
): { x: number; y: number } {
    return {
        x: parentWidth - childWidth,
        y: parentHeight - childHeight,
    };
}

/**
 * Calculates the top-left position to align a child element to the top-right of the parent.
 * @param parentWidth Width of the parent element
 * @param childWidth Width of the child element
 * @returns { x: number, y: number }
 */
export function alignTopRight(
    parentWidth: number,
    childWidth: number
): { x: number; y: number } {
    return {
        x: parentWidth - childWidth,
        y: 0,
    };
}

/**
 * Calculates the top-left position to align a child element to the bottom-left of the parent.
 * @param parentHeight Height of the parent element
 * @param childHeight Height of the child element
 * @returns { x: number, y: number }
 */
export function alignBottomLeft(
    parentHeight: number,
    childHeight: number
): { x: number; y: number } {
    return {
        x: 0,
        y: parentHeight - childHeight,
    };
}