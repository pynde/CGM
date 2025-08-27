import { VisualType } from '@shared/types/types';


export const useVisuals = (visuals: Partial<VisualType>) => {
    // Add your visual-related state and logic here
    const resize = (widthOrHeight: number, maxSize: number = 300) => {
        if (visuals.width && visuals.height) {
           const higherDim = Math.max(visuals.width, visuals.height);
            const ratio = widthOrHeight / higherDim;
            const MAX_SIZE = Math.min(maxSize, higherDim);
            return ratio * MAX_SIZE; 
        }
        else return -1
      }
    
    return {
        resize
    };
};


