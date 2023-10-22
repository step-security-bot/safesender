import React, { ReactElement, useContext, useEffect, useState } from 'react';

export interface ErrorContextProps {
    showErrorDialog: boolean,
    setShowDialog: ( state: boolean ) => void,
}

const ErrorContext = React.createContext<ErrorContextProps>( {
    showErrorDialog: false,
    setShowDialog: () => { },
} );

export const useErrorContext = () => {
    return useContext( ErrorContext );
}


export const ErrorProvider = ( { children }: { children: any } ): ReactElement => {

    const [ showErrorDialog, setShowErrorDialog ] = useState<boolean>( false );

    useEffect( () => {

        if ( showErrorDialog ) {
            window.scrollTo( { top: 0, behavior: 'smooth' } );
            document.body.style.overflow = 'hidden';
        }

    }, [ showErrorDialog ] )

    const setShowDialogHadler = ( state: boolean ) => {
        setShowErrorDialog( state ); 1
    }

    return (
        <ErrorContext.Provider value={{ showErrorDialog, setShowDialog: setShowDialogHadler }}>
            {children}
        </ErrorContext.Provider>
    )

}