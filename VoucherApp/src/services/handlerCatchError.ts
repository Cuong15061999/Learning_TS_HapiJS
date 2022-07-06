export const handleCatchError = (error: unknown) => {
    if (typeof error === 'string'){
        return error.toUpperCase();
    }else if(error instanceof Error){
        return error.message;
    } else{
        return 'error'
    }
}