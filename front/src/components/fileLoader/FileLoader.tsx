import React, { useCallback, useState } from 'react';
import { createHash } from 'crypto';

import { decrypt_async, encrypt_async } from 'wasm-xchacha20-poly';

import { Button } from '../shared/button/Button';
import { FileSelector } from '../shared/fileSelector/FileSelector';
import { PasswordInput } from '../shared/passwordInput/PasswordInput';

import shareIco from '../../../public/shareIco.svg';


export interface FileLoaderProps {
    hasFile: ( state: boolean ) => void;
    setLink: ( link: string ) => void;
}



export function getHashPassword( password: string ): string {
    const hash = createHash( 'sha512' );
    hash.update( password );
    return hash.digest( 'hex' );
}

function caesarCipher( shift: number, str: string ): string {
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
            let newCharCode = charCode + shift;
            // если новый код символа находится за пределами диапазона кодов букв английского алфавита
            if ( newCharCode > 90 && newCharCode < 97 || newCharCode > 122 ) {
                // корректируем новый код символа на соответствующий код символа алфавита
                newCharCode = newCharCode - 26;
            } else if ( newCharCode < 65 ) {
                newCharCode = newCharCode + 26;
            }
            // преобразуем новый код символа в символ и добавляем его к результату
            result += String.fromCharCode( newCharCode );
        } else {
            // если символ не является буквой английского алфавита, просто добавляем его к результату
            result += chars[ i ];
        }
    }
    // возвращаем зашифрованный текст
    return result;
}

export const FileLoader = ( { hasFile, setLink }: FileLoaderProps ): React.ReactElement => {

    const [ files, setFiles ] = useState<File[] | null>();
    const [ password, setPassword ] = useState<string | undefined>( undefined );

    const onDrop = useCallback( ( acceptedFiles: File[] ) => {
        console.log( acceptedFiles );
        console.log( password );
        setFiles( acceptedFiles );
        hasFile( true );
    }, [] );

    const deleteFileClicked = ( e: Event ): void => {
        e.preventDefault();
        e.stopPropagation();
        setFiles( null );
        hasFile( false );
    }

    const shareClickHandler = async (): Promise<void> => {

        const reader = new FileReader();

        reader.onloadend = async () => {

            const encoder = new TextEncoder();
            const decoder = new TextDecoder();
            const encryptKey = encoder.encode( password );

            const file = encoder.encode( reader.result?.toString() );

            const t = decoder.decode( file );

            const encryptedFile = await encrypt_async( file, encryptKey );

            // const decryptedFile = await decrypt_async( encryptedFile, encryptKey );

            // const a =  decoder.decode( decryptedFile );

            // console.log(a);

            // const url = window.URL.createObjectURL( new Blob( [ decryptedFile ], {
            // type: files![0].type
            // } ) );

            // window.open(url);

            // const link = document.createElement( 'a' );
            // // link.href = `data:image/png;base64,${ btoa( String.fromCharCode.apply( null, decryptedFile ) ) }`;
            // // link.href = `data:${files![0].type};base64,${ btoa( decryptedFile ) }`;
            // link.href = a;
            // link.setAttribute( 'download', files![ 0 ].name );
            // document.body.appendChild( link );
            // link.click();
            // link.remove();
            // URL.revokeObjectURL( url );

            const nameParts = files![ 0 ].name.split( '.' );
            const fileExt = nameParts.pop();
            const ciphered = caesarCipher( 5, nameParts.join( '.' ) );


            const fileName: string = `${ ciphered }.${ fileExt }`;

            const res = await fetch( 'https://safesender.app/api/upload', {
                body: JSON.stringify( {
                    FileBytes: btoa( JSON.stringify( Object.values( encryptedFile ) ) ),
                    PasswordHash: getHashPassword( password! ),
                    FileName: fileName
                } ),
                headers: { 'content-type': 'application/json' },
                method: 'POST',
            } );

            const apiResponse = await res.json();

            if ( 'token' in apiResponse && apiResponse.token ) {
                setLink( `http://localhost:3000?token=${ apiResponse.token }` );
            }
        }

        reader.readAsDataURL( files![ 0 ] );
    }

    return (
        <>
            <div className='flex flex-col items-center'>

                {/* <Image className='animate-spin' src={loaderIco} alt='loader'/> */}

                <div className='flex flex-col items-center pb-[24px] box-border'>
                    <span className='text-[32px] font-bold'>Upload Your File</span>
                    <span className='text-[18px] text-gray'>to encrypt the data </span>
                </div>

                <FileSelector file={files ? files[ 0 ] : undefined} onDrop={onDrop} deleteFile={deleteFileClicked} />

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