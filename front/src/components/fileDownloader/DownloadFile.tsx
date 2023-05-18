import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { decrypt_async } from 'wasm-xchacha20-poly';

import downLoadIcon from '../../../public/download.svg';
import loaderIco from  '../../../public/loader3.png';

import { Button } from '../shared/button/Button';
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

    function caesarDecipher( str: string, shift: number ) {
        // если сдвиг больше 26, то он становится эквивалентным сдвигу на меньшее количество символов
        shift = shift % 26;
        // преобразуем входную строку в массив символов
        let chars = str.split( "" );
        // создаем пустую строку для результата
        let result = "";
        // проходим по каждому символу в массиве
        for ( let i = 0; i < chars.length; i++ ) {
            // получаем ASCII-код символа
            let charCode = chars[ i ].charCodeAt( 0 );
            // если символ является буквой английского алфавита (от A до Z или от a до z)
            if ( charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122 ) {
                // определяем новый код символа с учетом сдвига
                let newCharCode = charCode - shift;
                // если новый код символа находится за пределами диапазона кодов букв английского алфавита
                if ( newCharCode > 90 && newCharCode < 97 || newCharCode < 65 ) {
                    // корректируем новый код символа на соответствующий код символа алфавита
                    newCharCode = newCharCode + 26;
                } else if ( newCharCode < 97 && newCharCode > 90 ) {
                    newCharCode = newCharCode + 26;
                }
                // преобразуем новый код символа в символ и добавляем его к результату
                result += String.fromCharCode( newCharCode );
            } else {
                // если символ не является буквой английского алфавита, просто добавляем его к результату
                result += chars[ i ];
            }
        }
        // возвращаем дешифрованный текст
        return result;
    }


    useEffect( () => {

        console.log( 'here' );

        const loadFile = async () => {

            if ( token ) {

                console.log( token );

                const response = await fetch( 'https://safesender.app/api/download/' + token, {
                    method: 'GET',
                } );

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

                setFile( new File( [], `${ caesarDecipher( fileNamePart, 5 ) }.${ fileExtPart }` ) );
                setEncryptedFile( atob( apiResponse.fileBytes ) );
                setFileName( `${ caesarDecipher( fileNamePart, 5 ) }.${ fileExtPart }` );
            }
        }

        loadFile().catch( err => {
            console.log( 'DOWNLOAD_FILE_ERROR:', err );
        } );

    }, [] );


    const clickHandler = async () => {

        console.log( 'clickHandler' );

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        const encryptKey = encoder.encode( password );

        console.log( encryptedFile );

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
                    file ? <FileItem
                        file={file!}
                        isBlured={false}
                        isDeletable={false}
                        deleteFile={false} />
                        : <Image className='animate-spin m-auto' src={loaderIco} alt='loader'/>
                 }
            </div>

            <div className='pt-[24px] w-full box-border'>
                <Button
                    disabled={!password}
                    labelText='Download'
                    onClickHandler={clickHandler}
                    icon={downLoadIcon}
                ></Button>
            </div>

        </div>
    )
}
