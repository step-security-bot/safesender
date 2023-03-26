import Image from 'next/image';
import { useRef, useState } from 'react';

import eyeClose from '../../public/eye-close.svg';
import eyeOpen from '../../public/eye-open.svg';
import shareIco from '../../public/shareIco.svg';

import { SimpleToggle } from '../components/shared/simpleToggle/SimpleToggle';
import { useTheme } from '../core/context/ThemeContext';
import { FileSelector } from '../components/shared/fileSelector/FileSelector';
import { PasswordInput } from '../components/shared/passwordInput/PasswordInput';


export const MainBox = (): React.ReactElement => {

    
    return (
        <div className='w-[563px]'>

            <div className="pt-[8px] h-[72px] leading-[36px] mb-[24px] text-center m-auto font-semibold text-white text-[24px]">
                Download the file in any format, encrypt it, and share it with anyone
            </div>

            <div className='dark:bg-[#838383] flex h-[768px] bg-[#9FBEF9] rounded-[16px] mb-[30px]'>
                
                <div className='m-auto bg-white h-[97%] w-[97%] rounded-[16px] pl-[24px] pr-[24px] box-border'>

                    <div className='flex flex-col items-center'>

                        <div className='flex flex-col items-center pt-[24px] pb-[24px] box-border'>
                            <span className='text-[32px] font-bold'>Upload Your File</span>
                            <span className='text-[18px] text-gray'>to encrypt the data </span>
                        </div>

                        <FileSelector />

                    </div>

                    <div className='relative'>

                       <PasswordInput hasGenerateToggle={true}/>

                        <label className='dark:bg-black bg-blue text-white border-[3px] rounded-[8px] h-[64px] flex items-center justify-center cursor-pointer text-[18px] font-bold dark:text-white'>
                            <div className='flex items-center '><Image className='mr-[8.5px]' src={shareIco} alt='share' /> Share</div>
                            <input type="file" className='hidden' />
                        </label>


                    </div>

                </div>
            </div>

        </div>
    )
}