import React, { useCallback, useState } from 'react';

import { encrypt_async } from 'wasm-xchacha20-poly';

import { encode } from "@msgpack/msgpack";

import { Button } from '../shared/button/Button';
import { caesar } from '../../core/helpers/caesar';
import { FileSelector } from '../shared/fileSelector/FileSelector';
import { getHashPassword } from '../../core/helpers/getHashPassword';
import { PasswordInput } from '../shared/passwordInput/PasswordInput';

import shareIco from '../../../public/shareIco.svg';
import { useLoader } from '../../core/context/LoaderContext';
import { useDataContext } from '../../core/context/DataContext';
import { useFileReader } from '../../core/context/FileReadContext';
import { fixPasswordLenIfNeeded } from '@/core/helpers/fixPasswordLenIfNeeded';
import { InternalApiUploadRequest } from '../../models/internal-api';
import { useErrorContext } from '../../core/context/ErrorContext';
import { CORRECT_PASSWORD_LENGTH } from '../../core/configs/password-length';


export interface FileLoaderProps {
    hasFile: ( state: boolean ) => void;
    setLink: ( link: string ) => void;
}

export const FileLoader = ( { hasFile, setLink }: FileLoaderProps ): React.ReactElement => {

    const [ files, setFiles ] = useState<File[] | null>();
    const [ password, setPassword ] = useState<string | undefined>( undefined );
    const [ isFileReading, setIsFileReading ] = useState<boolean>( false );

    const dataContext = useDataContext();
    const loader = useLoader();
    const errorContext = useErrorContext();

    const fileReader = useFileReader();

    const onDrop = useCallback( ( acceptedFiles: File[] ) => {

        if ( acceptedFiles[ 0 ].size > ( 50 * 1048576 ) ) {
            alert( 'YOUR FILE IS SO HUGE! Try another one!' );
        } else {
            setFiles( acceptedFiles );
            dataContext.setHasFile( true );
        }

    }, [] );

    const deleteFileClicked = ( e: Event ): void => {
        e.preventDefault();
        e.stopPropagation();
        setFiles( null );
        hasFile( false );
    }

    const sendFileToInternalApi = async ( encryptedFile: any ) => {

        // Create request body
        const body = encode( {
            FileData: encryptedFile,
            ...getInternalMetadata(),
        } );

        // Send request to API
        const res = await fetch( `${process.env.NEXT_PUBLIC_INTERNAL_API}upload`, {
            body,
            headers: { 'content-type': 'application/json' },
            method: 'POST',
        } );

        // Get response
        try {
            const apiResponse = await res.json();

            if ( !apiResponse ) {
                errorContext.setShowDialog( true );
                throw new Error( 'EMPTY API RESPONSE!' );
            }

            if ( 'token' in apiResponse && apiResponse.token ) {
                // Set download file link in DataContext for move on another page
                setLink( getUserDownloadURL( apiResponse.token ) );
            }
        } catch(ex) {
            errorContext.setShowDialog( true );
        }
    }

    const getInternalMetadata = (): Pick<InternalApiUploadRequest, 'PasswordHash' | 'FileName' | 'OriginalFileSize'> | undefined => {

        if ( !files || !files[ 0 ] ) {
            throw new Error( 'There were not any files for getting metadata!' );
        }

        const file: File = files![ 0 ];

        const nameParts: string[] = file.name?.split( '.' );
        const fileExt: string | undefined = nameParts?.pop();
        const ciphered: string = caesar.cipher( caesar.STEP, nameParts.join( '.' ) );

        const fileName: `${ string }.${ string }` = `${ ciphered }.${ fileExt || '' }`;

        return {
            PasswordHash: getHashPassword( password! ),
            FileName: fileName,
            OriginalFileSize: file.size,
        }
    }

    const shareClickHandler = async (): Promise<void> => {

        const reader = new FileReader();

        reader.onloadend = ( e: any ) => {

            setTimeout( async () => {

                setIsFileReading( false );

                loader.setIsLoading( false );

                fileReader.setIsReadingFinished( true );

                const textEncoder = new TextEncoder();

                const finalPassword = fixPasswordLenIfNeeded( password, CORRECT_PASSWORD_LENGTH );
                const encryptKey = textEncoder.encode( finalPassword );
                
                const encryptedFile = await encrypt_async( new Uint8Array( e.target.result ), encryptKey );

                try {
                    sendFileToInternalApi( encryptedFile );
                } catch ( err ) {
                    console.error( 'UPLOAD_REQUEST_ERROR: ', err );
                }

            }, 100 );

        }

        reader.onloadstart = () => {
            setIsFileReading( true );
            loader.setIsLoading( true );
        }

        reader.onprogress = ( data: any ) => {
            if ( data.lengthComputable ) {
                const progress = +( ( data.loaded / data.total ) * 100 ).toFixed( 2 );
                fileReader.setProgress( progress );
            }
        }

        reader.readAsArrayBuffer( files![ 0 ] );
    }

    const getUserDownloadURL = ( token: string ): string => {
        return process.env[ 'NODE_ENV' ] === 'development'
            ? `http://localhost:3000/download?token=${ token }`
            : `https://safesender.app/download?token=${ token }`;
    }

    return (
        <>
            <div className='flex flex-col items-center'>

                <div className='flex flex-col items-center pb-[24px] box-border'>
                    <span className='text-[32px] bigDesktop:leading-[84px] bigDesktop:text-[56px] font-bold'>Upload Your File</span>
                    <span className='text-[18px] bigDesktop:leading-[42px] bigDesktop:text-[32px] text-gray'>to encrypt the data </span>
                </div>

                <FileSelector
                    file={files ? files[ 0 ] : undefined}
                    onDrop={onDrop}
                    deleteFile={deleteFileClicked} />

            </div>

            <div className='relative'>

                <PasswordInput
                    password={password!}
                    setPassword={setPassword}
                    hasGenerateToggle={true} />

                <Button
                    disabled={( !( !!files ) || !password )}
                    icon={shareIco}
                    labelText='Share'
                    onClickHandler={shareClickHandler} />

            </div>
        </>
    )
}