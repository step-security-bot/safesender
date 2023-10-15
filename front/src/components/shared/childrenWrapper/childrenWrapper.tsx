import { PropsWithChildren, useEffect } from 'react';

import { useDataContext } from '../../../core/context/DataContext';
import { FileReaderProvider } from '../../../core/context/FileReadContext';
import { FileLoader } from '../../fileLoader/FileLoader';
import { DownloadFile } from '../../fileDownloader/DownloadFile';
import { useRouter } from 'next/router';



export default function ChildrenWrapper({children}: PropsWithChildren): React.ReactElement {

    const dataContext = useDataContext();

    const router = useRouter();

    const { query } = router;

    useEffect( () => {
        console.log( query )
        if ( 'token' in query && query.token ) {
            console.log( 'HERE' )
            dataContext.setToken( query.token as string );
        }
    }, [ query ] );

    const getCurrentView = (): React.ReactElement => {

        if ( dataContext.link ) {
            router.push( {
                pathname: '/link-ready',
                query: { link: dataContext.link }
            } )
            return <></>;
        } else if ( !dataContext.link && !dataContext.token ) {
            return <FileReaderProvider>
                <FileLoader hasFile={dataContext.setHasFile} setLink={dataContext.setLink} />
            </FileReaderProvider>;
        } else if ( !dataContext.link && dataContext.token ) {
            return <DownloadFile token={dataContext.token} />
        }

        return <></>
    }

    return (
        <div className='w-[580px] sm:w-[90%]'>

            {
                !dataContext.token && <div className="pt-[8px] h-[72px] sm:h-[auto] leading-[36px] mb-[24px] text-center m-auto font-medium text-white text-[24px]">
                    Download the file in any format, encrypt it, and share it with anyone
                </div>
            }

            <div className={` ${ dataContext.hasFile && 'h-auto' }`}>

                <div className='sm:border-[0px] m-auto p-[10px] border-[#9FBEF9] dark:border-[#838383]
                 dark:bg-[#838383] bg-[#9FBEF9] rounded-[16px] box-border flex items-center justify-center'>
                    <div className='bg-white rounded-[16px] p-[24px] box-border'>

                        {children}

                    </div>
                </div>

            </div>

        </div>
    )
}