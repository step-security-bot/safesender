import React, { ReactElement, useContext, useState } from 'react';


export interface FileReaderContextProps {
    progress: number,
    isReadingFinished: boolean,
    setProgress: ( progress: number ) => void,
    setIsReadingFinished: (state: boolean) => void,
}

const FileReaderContext = React.createContext<FileReaderContextProps>( {
    progress: 0,
    isReadingFinished: false,
    setProgress: () => { },
    setIsReadingFinished: () => { },
} );

export const useFileReader = () => {
    return useContext( FileReaderContext );
}


export const FileReaderProvider = ( { children }: { children: any } ): ReactElement => {

    const [ progress, setProgress ] = useState<number>( 0 );
    const [ isReadingFinished, setIsReadingFinished ] = useState<boolean>(false);

    const setProgressHandler = ( prog: number ) => {
        console.log( '[FileReaderProvider] - setProgressHandler' );
        setProgress( prog );
    }

    const setIsReadingProcessFinished = (state: boolean) => {
        console.log( '[FileReaderProvider] - setIsReadingProcessFinished' );
        setIsReadingFinished(state);
    }

    return (
        <FileReaderContext.Provider value={{ progress, isReadingFinished, setIsReadingFinished: setIsReadingProcessFinished, setProgress: setProgressHandler }}>
            {children}
        </FileReaderContext.Provider>
    )

}