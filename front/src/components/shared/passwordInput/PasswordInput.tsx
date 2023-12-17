import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import eyeClose from '../../../../public/eye-close.svg';
import eyeOpen from '../../../../public/eye-open.svg';
import copyIco from '../../../../public/copy.svg';
import okIco from '../../../../public/ok-gr.svg';


import { SimpleToggle } from '../simpleToggle/SimpleToggle';

import { passwordRegex } from '../../../core/configs/regexp';
import { SmallInfoPanel } from '../smallInfoPanel/SmallInfoPanel';


function getRandomPassword( length: number ): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@$!%*?&';

    let password = '';

    const generatePassword = () => {
        password = '';

        for ( let i = 0; i < length; i++ ) {
            const randomIndex = Math.floor( Math.random() * chars.length );
            password += chars[ randomIndex ];
        }
    }

    do {
        generatePassword();
        console.log( 'generatePassword' );
    } while ( !passwordRegex.test( password ) );

    return password;
}

export interface PasswordInputProps {
    hasGenerateToggle: boolean;
    password: string;
    setPassword: ( password: string ) => void;
}

export const PasswordInput = ( { hasGenerateToggle, setPassword }: PasswordInputProps ): React.ReactElement => {

    const [ isGeneratePassActive, setIsGeneratePassActive ] = useState<boolean>( false );
    const [ isHidePass, setIsHidePass ] = useState<boolean>( true );
    const [ passwordError, setPasswordError ] = useState<boolean>( false );
    const [ inpValue, setInpValue ] = useState<string>( '' );
    const [ copied, setCopied ] = useState<boolean | undefined>( undefined );

    const inpRef = useRef<any>();

    useEffect( () => {

        if ( copied ) {
            setTimeout( () => {
                setCopied( false );
            }, 3000 );

        }

        if ( !copied ) {
            setCopied( undefined )
        }

    }, [ copied ] );

    const generatePassToggleClicked = ( isActive: boolean ): void => {
        setIsGeneratePassActive( isActive );

        if ( isActive ) {
            const generatedPassword = getRandomPassword( 32 );
            setInpValue( generatedPassword );
            setPassword( generatedPassword );
        }
    };

    const eyeClicked = (): void => {

        !isHidePass
            ? inpRef.current.type = 'password'
            : inpRef.current.type = 'text'

        setIsHidePass( !isHidePass );
    };

    const copyClicked = (): void => {
        if ( navigator && navigator.clipboard ) {
            navigator.clipboard.writeText( inpRef.current.value );
            setCopied( true );
        } else {
            console.error( 'DISABLED CLIPBOARD API!' );
        }
    }

    const inputChangesHandler = ( { target }: any ): void => {

        setInpValue( target.value );

        if ( inpRef.current.value && !passwordRegex.test( inpRef.current.value ) ) {
            setPasswordError( true );
            setPassword( '' );
        } else {
            setPasswordError( false );
            setPassword( inpRef.current.value );
        }
    }


    return (
        <div>

            {
                hasGenerateToggle && <div className="relative left-[-6px] w-[225px] 
                    flex items-center justify-between toggle-box pt-[10px] pb-[8px] box-border">

                    <label className='flex items-center w-full gap-2'>
                        <SimpleToggle state={isGeneratePassActive} clickHandler={generatePassToggleClicked} />
                        <div className='text-gray text-[18px]'>Generate a password</div>
                    </label>

                </div>
            }

            <div>

                <label className='text-[16px] font-bold flex flex-col relative'>
                    <span className={`pb-[5px] ${ passwordError && 'text-error' }`}>Password</span>

                    <div className='relative w-full flex'>

                        {/* {copied !== undefined && <SmallInfoPanel
                            state={copied ? '1' : '0'}
                        />} */}

                        <div className='absolute left-[20px] top-[50%] translate-y-[-50%]  cursor-pointer'
                            style={{ opacity: `${ !!copied ? '1' : '.5' }  ` }}

                        >
                            <Image
                                src={!!copied ? okIco : copyIco}
                                onClick={copyClicked}
                                alt='copy password button' />

                        </div>

                        <input
                            ref={inpRef}
                            value={inpValue}
                            type="password"
                            placeholder='Enter password'
                            onChange={inputChangesHandler}
                            className={`border-[1px] 
                                    text-[18px]
                                    w-full
                                    font-normal
                                    rounded-[8px]
                                    border-gray 
                                    p-[20px] 
                                    pl-[55px]
                                    pr-[55px]
                                    box-border1
                                    active:outline-[#6599FF]
                                    focus:outline-[#6599FF]
                                    active:outline
                                    focus:outline
                                    dark:focus:outline-[black]
                                    dark:active:outline-[black]
                                    ${ passwordError && 'border-error focus:outline-error' }`}
                            style={{
                                outlineColor: `${ passwordError ? '#FF614B' : 'initial' } `,
                                borderColor: `${ passwordError ? 'transparent' : 'initial' }`
                            }}
                        />

                        <div className='absolute right-[20px] top-[50%] translate-y-[-50%] opacity-50 cursor-pointer'>
                            <Image

                                src={isHidePass ? eyeClose : eyeOpen}
                                onClick={eyeClicked}
                                alt='eye' />
                        </div>
                    </div>

                </label>

                <div className={`
                pt-[4px] pb-[15px] pl-[2px] text-[14px] font-normal text-gray ${ passwordError && ' text-error' }`}>
                    Enter a password that includes at least one uppercase letter, one number, and one symbol (such as !@#$%^&*)
                </div>

            </div>
        </div>
    )
}