import React, { useRef, useState } from 'react';


import eyeClose from '../../../../public/eye-close.svg';
import eyeOpen from '../../../../public/eye-open.svg';

import Image from 'next/image';
import { SimpleToggle } from '../simpleToggle/SimpleToggle';



export interface PasswordInputProps {
    hasGenerateToggle: boolean;
}

export const PasswordInput = ({ hasGenerateToggle }: PasswordInputProps): React.ReactElement => {

    const [ isGeneratePassActive, setIsGeneratePassActive ] = useState<boolean>( false );
    const [ isHidePass, setIsHidePass ] = useState<boolean>( true );

    const inpRef = useRef<any>();

    const generatePassToggleClicked = ( isActive: boolean ): void => {
        setIsGeneratePassActive( isActive );
    };

    const eyeClicked = (): void => {

        !isHidePass
            ? inpRef.current.type = 'password'
            : inpRef.current.type = 'text'

        setIsHidePass( !isHidePass );
    };


    return (
        <div>
            
            {
                hasGenerateToggle && <div className="relative left-[-10px] w-[225px] flex items-center justify-between toggle-box pt-[10px] pb-[8px] box-border">
                    <SimpleToggle state={isGeneratePassActive} clickHandler={generatePassToggleClicked} />
                    <div className='text-gray text-[18px]'>Generate a password</div>
                </div>
            }

            <div>

                <label className='text-[16px] font-bold flex flex-col relative'>
                    <span className='pb-[5px]'>Password</span>

                    <input
                        ref={inpRef}
                        type="password"
                        placeholder='Enter password'
                        className='border-[1px] text-[18px] font-normal
                                    rounded-[8px] 
                                    border-gray p-[20px] box-border' />

                    <Image
                        className='absolute right-[6%] top-[55%] opacity-50 cursor-pointer'
                        src={isHidePass ? eyeClose : eyeOpen}
                        onClick={eyeClicked}
                        alt='eye' />

                </label>

                <div className='pt-[4px] pb-[15px] pl-[2px] text-[14px] font-normal text-gray'>
                    Enter a password that includes at least one uppercase letter, one number, and one symbol (such as !@#$%^&*)
                </div>

            </div>
        </div>
    )
}