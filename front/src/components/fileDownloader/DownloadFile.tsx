import pako from 'pako';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { decrypt_async } from 'wasm-xchacha20-poly';

import loaderIco from '../../../public/loader.png';
import downLoadIcon from '../../../public/download.svg';

import { Button } from '../shared/button/Button';
import { caesar } from '../../core/helpers/caesar';
import { FileItem } from '../shared/fileItem/FIleItem';
import { saveByteArrayAsFile } from '../../core/helpers/saveFile';
import { PasswordInput } from '../shared/passwordInput/PasswordInput';
import { InternalApiDownloadResponse } from '../../models/internal-api';
import { fixPasswordLenIfNeeded } from '@/core/helpers/fixPasswordLenIfNeeded';



export interface DownloadFileProps {
    token: string;
}

export const DownloadFile = ( { token }: DownloadFileProps ): React.ReactElement => {

    const [ password, setPassword ] = useState<string>( '' );
    const [ file, setFile ] = useState<File | undefined>();
    const [ encryptedFile, setEncryptedFile ] = useState<any>();
    const [ fileName, setFileName ] = useState<string>( '' );
    const [ fileSize, setFileSize ] = useState<number>();

    useEffect( () => {

        const loadFile = async () => {

            if ( token ) {

                try {

                    const response = await fetch( 'https://api.safesender.app/api/download/' + token );

                    const apiResponse: InternalApiDownloadResponse = await response.json();

                    console.log( 'DOWLOAD_API_RESPOSE: ', apiResponse );

                    if ( !apiResponse ) {
                        throw new Error( 'DOWLOAD_API_RESPOSE IS EMPTY!' );
                    }

                    getFileFromExternalStorage( apiResponse );

                } catch ( e ) {
                    console.log( 'unknown download error!' );
                }
            }
        }

        loadFile().catch( err => {
            console.log( 'DOWNLOAD_FILE_ERROR:', err );
        } );

    }, [] );


    const getFileFromExternalStorage = async ( internalApiResponse: InternalApiDownloadResponse ) => {

        const externalResponse = await fetch( internalApiResponse.externalStorageToken );
        const downloadPage = await externalResponse.text();

        let downloadURL = getDownloadURLFromPage( downloadPage );
        downloadURL = downloadURL.substring( downloadURL.lastIndexOf( '"' ) + 1 );
        // add cors proxy
        downloadURL = 'https://corsproxy.io?' + downloadURL;

        const fileBlob = await fetch( downloadURL );

        const rawFile = await fileBlob.blob();

        const fileNameArray = internalApiResponse.fileName.split( '.' );

        const fileNamePart = internalApiResponse.fileName
            ? ( fileNameArray[ 0 ] || '' )
            : '';

        const fileExtPart = internalApiResponse.fileName
            ? ( fileNameArray?.pop() || '' )
            : '';

        // set state parts
        setFile( new File( [], `${ caesar.decipher( fileNamePart, 5 ) }.${ fileExtPart }` ) );

        setEncryptedFile( new Uint8Array( await rawFile.arrayBuffer() ) );

        setFileName( `${ caesar.decipher( fileNamePart, 5 ) }.${ fileExtPart }` );

        setFileSize( internalApiResponse.originalFileSize );
    }


    const getDownloadURLFromPage = ( page: string ): string => {

        const downloadButtonStartPosition = page.lastIndexOf( 'download-url' );

        const aTagDirectURL: string = page.substring( downloadButtonStartPosition, downloadButtonStartPosition + 300 );

        const hrefStartPosition = aTagDirectURL.indexOf( 'href="' );

        return aTagDirectURL.substring( hrefStartPosition, aTagDirectURL.indexOf( '"', hrefStartPosition + 7 ) );
    }

    const clickHandler = async (): Promise<void> => {

        const encoder = new TextEncoder();
        const correctPasswordLen: number = 32;
        const finalPassword = fixPasswordLenIfNeeded( password, correctPasswordLen );
        const encryptKey = encoder.encode( finalPassword );

        const decryptedFile = await decrypt_async( encryptedFile, encryptKey );

        saveByteArrayAsFile( pako.inflate( decryptedFile ), fileName );
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
                            fileSize={fileSize!}
                            isBlured={!!password}
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
