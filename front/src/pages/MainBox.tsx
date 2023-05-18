import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { LinkReady } from '../components/shared/linkReady/LinkReady';
import { FileLoader } from '../components/fileLoader/FileLoader';
import { DownloadFile } from '../components/fileDownloader/DownloadFile';


export default function MainBox(): React.ReactElement {

    const [ hasFile, setHasFile ] = useState<boolean>( false );
    const [ link, setLink ] = useState<string>( '' );
    const [ token, setToken ] = useState<string>( '' );

    const router = useRouter();

    const { query } = router;

    useEffect( () => {
        if ( 'token' in query && query.token ) {

            setToken( query.token as string );
        }
    }, [ query ] );


    const getCurrentView = (): React.ReactElement => {

        if ( link ) {
            return <LinkReady extLink={link} />;
        } else if ( !link && !token ) {
            return <FileLoader hasFile={setHasFile} setLink={setLink} />;
        } else if ( !link && token ) {
            return <DownloadFile token={token} />
        }

        return <></>
    }

    return (
        <div className='w-[580px]'>

            {
                !token && <div className="pt-[8px] h-[72px] leading-[36px] mb-[24px] text-center m-auto font-semibold text-white text-[24px]">
                    Download the file in any format, encrypt it, and share it with anyone
                </div>
            }

            <div className={` ${ hasFile && 'h-auto' }`}>

                <div className='m-auto border-[10px] border-[#9FBEF9] dark:border-[#838383]
                 bg-white rounded-[16px] p-[24px] box-border'>

                    {getCurrentView()}

                </div>
            </div>

        </div>
    )
}