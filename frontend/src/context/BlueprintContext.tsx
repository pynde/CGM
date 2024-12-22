import { BlueprintType } from "@shared/types/types";
import { createContext } from "react";

// Define the context type
export type BlueprintContextType = {
    blueprint: BlueprintType,
    updateBlueprint: (bp: Partial<BlueprintType>) => void
  };


export const BlueprintContext = createContext<BlueprintContextType>({ blueprint: {
  gameComponents: [],
  resources: [],
  actions: [],
  },
  updateBlueprint: () => {} 
});