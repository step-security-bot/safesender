import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useDataContext } from '../../core/context/DataContext';
import { FileLoader } from '../fileLoader/FileLoader';
import { FileReaderProvider } from '../../core/context/FileReadContext';


export default function MainBox(): React.ReactElement {

    const [ hasFile, setHasFile ] = useState<boolean>( false );

    const router = useRouter();

    const dataContext = useDataContext();

    useEffect( () => {
        if ( dataContext.link ) {
            router.push( { pathname: '/link-ready' } )
        }

    }, [ dataContext, router ] );

    return (
        <div>
            <FileReaderProvider>
                <FileLoader
                    hasFile={setHasFile}
                    setLink={dataContext.setLink}
                />
            </FileReaderProvider>
        </div>
    )
}