import { ResourceType, MultipleValues, FixedValue } from "../types/types";

// Utility function to sum multiple values
export const sumMultipleValues = (values: MultipleValues): number => {
    return values.reduce((acc, val) => acc + val, 0);
};

// Utility function to multiply fixed value
export const multiplyFixedValue = (value: FixedValue, multiplier: number): number => {
    return value * multiplier;
};

// Utility function to add resources
export const addResources = (resource1: ResourceType, resource2: ResourceType): ResourceType => {
    if (resource1.type !== resource2.type) {
        throw new Error("Resource types must match to add them");
    }

    return {
        ...resource1,
        amount: resource1.amount + resource2.amount
    };
};

// Utility function to subtract resources
export const subtractResources = (resource1: ResourceType, resource2: ResourceType): ResourceType => {
    if (resource1.type !== resource2.type) {
        throw new Error("Resource types must match to subtract them");
    }

    return {
        ...resource1,
        amount: resource1.amount - resource2.amount
    };
};

// Utility function to check if resource amount is positive
export const isResourceAmountPositive = (resource: ResourceType): boolean => {
    return resource.amount > 0;
};

// Utility function to convert resource to string
export const resourceToString = (resource: ResourceType): string => {
    return `${resource.type}: ${resource.amount}`;
};