import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { decrypt_async } from 'wasm-xchacha20-poly';

import loaderIco from '../../../public/loader.png';
import downLoadIcon from '../../../public/download.svg';

import { Button } from '../shared/button/Button';
import { caesar } from '../../core/helpers/caesar';
import { FileItem } from '../shared/fileItem/FIleItem';
import { PasswordInput } from '../shared/passwordInput/PasswordInput';


export interface DownloadFileProps {
    token: string;
}

export const DownloadFile = ( { token }: DownloadFileProps ): React.ReactElement => {

    const [ password, setPassword ] = useState<string>( '' );
    const [ file, setFile ] = useState<File | undefined>();
    const [ encryptedFile, setEncryptedFile ] = useState<any>();
    const [ fileName, setFileName ] = useState<string>( '' );

    useEffect( () => {

        const loadFile = async () => {

            if ( token ) {

                const response = await fetch( 'https://api.safesender.app/api/download/' + token);

                const apiResponse = await response.json();

                console.log( 'DOWLOAD_API_RESPOSE: ', apiResponse );

                if ( !apiResponse ) {
                    throw new Error( 'DOWLOAD_API_RESPOSE IS EMPTY!' );
                }

                const fileNamePart = apiResponse.fileName
                    ? ( apiResponse.fileName.split( '.' )[ 0 ] || '' )
                    : '';

                const fileExtPart = apiResponse.fileName
                    ? ( apiResponse.fileName.split( '.' )?.pop() || '' )
                    : '';

                setFile( new File( [], `${ caesar.decipher( fileNamePart, 5 ) }.${ fileExtPart }` ) );
                setEncryptedFile( atob( apiResponse.fileBytes ) );
                setFileName( `${ caesar.decipher( fileNamePart, 5 ) }.${ fileExtPart }` );
            }
        }

        loadFile().catch( err => {
            console.log( 'DOWNLOAD_FILE_ERROR:', err );
        } );

    }, [] );


    const clickHandler = async () => {

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        const encryptKey = encoder.encode( password );

        const decryptedFile = await decrypt_async( JSON.parse( encryptedFile ), encryptKey );

        const uri = decoder.decode( decryptedFile );

        const link = document.createElement( 'a' );
        link.href = uri;
        link.setAttribute( 'download', fileName );
        document.body.appendChild( link );
        link.click();
        link.remove();
        URL.revokeObjectURL( uri );
    }

    return (
        <div className='flex flex-col items-center'>

            <div className='flex flex-col items-center pb-[24px] box-border'>
                <span className='text-[32px] font-bold'>Download</span>
                <span className='text-[18px] text-gray'>Enter password to download files</span>
            </div>

            <div className=''>
                <PasswordInput
                    hasGenerateToggle={false}
                    password={password}
                    setPassword={setPassword} />
            </div>

            <div className='w-full'>
                {
                    file
                        ? <FileItem
                            file={file!}
                            isBlured={false}
                            isDeletable={false}
                            deleteFile={false} />
                        : <Image
                            className='animate-spin m-auto'
                            src={loaderIco}
                            alt='loader' />
                }
            </div>

            <div className='pt-[24px] w-full box-border'>

                <Button
                    disabled={!password}
                    labelText='Download'
                    onClickHandler={clickHandler}
                    icon={downLoadIcon} />

            </div>

        </div>
    )
}
