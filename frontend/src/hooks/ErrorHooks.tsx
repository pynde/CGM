import { ErrorType } from "@shared/types/types"

export const useErrors = () => {
    const checkIfErrorsExist = (errors: ErrorType[]) => {
        if(errors.length > 0) return true;
        else return false
    }
    return { 
        checkIfErrorsExist 
    }
}