import React, { useContext, useState } from 'react';


export interface LoaderContextProps {
    isLoading: boolean;
    setIsLoading: (state: boolean) => void;
}

const LoaderContext = React.createContext<LoaderContextProps>( { isLoading: false, setIsLoading: () => { } } );

export const useLoader = () => {
    return useContext(LoaderContext);
}


export const LoaderProvider = ( { children }: { children: any } ): React.ReactElement => {

    const [ isLoading, setIsLoading ] = useState( false );


    const toggleLoader = ( state: boolean ) => {
        setIsLoading( state );
    }

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading: toggleLoader }}>
            {children}
        </LoaderContext.Provider>
    )

}