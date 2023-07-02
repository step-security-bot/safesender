import pako from 'pako';
import React, { useCallback, useState } from 'react';

import { decrypt_async, encrypt_async } from 'wasm-xchacha20-poly';

import { Button } from '../shared/button/Button';
import { caesar } from '../../core/helpers/caesar';
import { FileSelector } from '../shared/fileSelector/FileSelector';
import { getHashPassword } from '../../core/helpers/getHashPassword';
import { PasswordInput } from '../shared/passwordInput/PasswordInput';

import shareIco from '../../../public/shareIco.svg';
import loaderIco from '../../../public/loader.png';
import { saveByteArrayAsFile } from '../../core/helpers/saveFile';
import Image from 'next/image';
import { Loader } from '../shared/loader/Loader';
import { useLoader } from '../../core/context/LoaderContext';
import { FileReaderProvider, useFileReader } from '../../core/context/FileReadContext';




export interface FileLoaderProps {
    hasFile: ( state: boolean ) => void;
    setLink: ( link: string ) => void;
}

export const FileLoader = ( { hasFile, setLink }: FileLoaderProps ): React.ReactElement => {

    const [ files, setFiles ] = useState<File[] | null>();
    const [ password, setPassword ] = useState<string | undefined>( undefined );
    const [ isFileReading, setIsFileReading ] = useState<boolean>( false );

    const loader = useLoader();

    const fileReader = useFileReader();

    const onDrop = useCallback( ( acceptedFiles: File[] ) => {
        setFiles( acceptedFiles );
        hasFile( true );
    }, [] );

    const deleteFileClicked = ( e: Event ): void => {
        e.preventDefault();
        e.stopPropagation();
        setFiles( null );
        hasFile( false );
    }

    const sendFileToInternalApi = async ( encryptedFile: any ) => {

        const nameParts = files![ 0 ].name.split( '.' );
        const fileExt = nameParts.pop();
        const ciphered = caesar.cipher( 5, nameParts.join( '.' ) );

        const fileName: string = `${ ciphered }.${ fileExt }`;

        console.log( 'START_GET_VALUES' );

        const vls = Object.values( encryptedFile );

        console.log( 'FISH_GET_VALUES' );

        console.log( 'CREATE_BODY' );

        const body = JSON.stringify( {
            FileBytes: btoa( JSON.stringify( vls ) ),
            PasswordHash: getHashPassword( password! ),
            FileName: fileName
        } );

        console.log( body );

        console.log( 'SEnD_REQUEST' );


        const res = await fetch( 'https://api.safesender.app/api/upload', {
            body,
            headers: { 'content-type': 'application/json' },
            method: 'POST',
        } );

        const apiResponse = await res.json();

        if ( !apiResponse ) {
            throw new Error( 'EMPTY API RESPONSE!' );
        }

        if ( 'token' in apiResponse && apiResponse.token ) {
            // https://safesender.app
            // http://localhost:300/

            setLink( `https://safesender.app?token=${ apiResponse.token }` );
        }
    }

    const sendFileToExternalApi = async ( encryptedFile: Uint8Array ) => {

        const formData = new FormData();

        const vls = Object.values( encryptedFile );

        formData.append( 'file', new Blob( [ encryptedFile ] ) );

        const response = await fetch( 'https://api.anonfiles.com/upload', {
            method: 'POST',
            body: formData
        } );

        const result = await response.json();

        console.log( '[RESULT]:', result );

        if ( result && result.data.file.url.full ) {


            sendFileInfo( result.data.file.url.full );

            // const r = await fetch( result.data.file.url.full, {
            //     method: 'GET'
            // } );

            // const t = await r.json();

            // console.log(t)
        }

    }


    const getInternalMetadata = () => {

        const nameParts = files![ 0 ].name.split( '.' );
        const fileExt = nameParts.pop();
        const ciphered = caesar.cipher( 5, nameParts.join( '.' ) );

        const fileName: string = `${ ciphered }.${ fileExt }`;

        getHashPassword( password! );

        return {
            PasswordHash: getHashPassword( password! ),
            FileName: fileName,
        }
    }

    const sendFileInfo = async ( downloadURL: string ) => {

        const response = await fetch( 'https://api.safesender.app/api/upload', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify( {
                ...getInternalMetadata(),
                ExternalStorageToken: downloadURL
            } )
        } );

        const internalApiResult = await response.json();

        console.log('[Internal API Result]: ', internalApiResult);

        if ( !internalApiResult ) {
            throw new Error( 'EMPTY API RESPONSE!' );
        }

        if ( 'token' in internalApiResult && internalApiResult.token ) {
            // https://safesender.app
            // http://localhost:300/

            setLink( `http://localhost:300/?token=${ internalApiResult.token }` );
        }
    }

    const shareClickHandler = async (): Promise<void> => {

        const reader = new FileReader();

        reader.onloadend = ( e: any ) => {

            setTimeout( async () => {

                console.log( 'START' );

                setIsFileReading( false );

                loader.setIsLoading( false );

                fileReader.setIsReadingFinished( true );

                const encoder = new TextEncoder();
                const encryptKey = encoder.encode( password );

                // console.log('INIIAL: ', e.target.result);

                const zipped = pako.deflate( e.target.result );

                // console.log('DEFLATED: ', zipped);

                console.log( 'START_Encrypt' );

                const encryptedFile = await encrypt_async( zipped, encryptKey );

                // const decryptedFile = await decrypt_async( encryptedFile, encryptKey );

                // const unzipped = pako.inflate( decryptedFile );

                // console.log('INFLATED: ',  unzipped );

                // saveByteArrayAsFile( unzipped, files![ 0 ].name );

                console.log( 'FInISH_Encrypt' );

                try {

                    // sendFileToInternalApi( encryptedFile );

                    // send file to anonfiles directly
                    sendFileToExternalApi( encryptedFile );

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
                console.log( progress, '%' )
                fileReader.setProgress( progress );
                console.log( progress );
            }
        }

        reader.readAsArrayBuffer( files![ 0 ] );
    }

    return (
        <>
            <div className='flex flex-col items-center'>

                {/* {true && <Loader />} */}

                <div className='flex flex-col items-center pb-[24px] box-border'>
                    <span className='text-[32px] font-bold'>Upload Your File</span>
                    <span className='text-[18px] text-gray'>to encrypt the data </span>
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