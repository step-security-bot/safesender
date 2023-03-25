import Image from 'next/image';
import loadIcoBlack from '../../public/loadIcoBlack.svg';
import loadIcoBlue from '../../public/loadIcoBlue.svg';
import eyeOpen from '../../public/eye-open.svg';
import eyeClose from '../../public/eye-close.svg';
import shareIco from '../../public/shareIco.svg';
import { useTheme } from '../core/context/ThemeContext';
import { SimpleToggle } from '../components/shared/simpleToggle/SimpleToggle';
import { LegacyRef, MutableRefObject, useRef, useState } from 'react';



export const MainBox = () => {

    const [ isGeneratePassActive, setIsGeneratePassActive ] = useState<boolean>( false );
    const [ isHidePass, setIsHidePass ] = useState<boolean>( true );

    const inpRef = useRef<any>();

    const theme = useTheme();

    const generatePassToggleClicked = ( isActive: boolean ): void => {
        setIsGeneratePassActive( isActive );
    };

    const eyeClicked = (): void => {

        if (!isHidePass) {
            inpRef.current.type = 'password';
        } else {
            inpRef.current.type = 'text';
        }
        setIsHidePass( !isHidePass );

    };

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

                        {/* <div className='w-[515px] h-[320px] rounded-[8px] border-[1px] border-dashed border-gray'></div> */}

                        <div className="b w-[508px] h-[320px] flex flex-col items-center box-border pt-[33px]">

                            <div className='img-wrapper'>
                                {
                                    theme.darkMode
                                        ? <Image src={loadIcoBlack} alt='load ico' />
                                        : <Image src={loadIcoBlue} alt='load ico' />
                                }
                            </div>

                            <div className='font-bold pt-[16px] box-border text-[20px] dark:text-black text-blueAcc'>Drag & drop your files here</div>

                            <div className="w-[202px] h-[24px] box-border pt-[24px] pb-[24px] flex items-center justify-evenly">
                                <div className="line w-[80px] border-t-[1px] border-gray"></div>
                                <span className='text-gray font-bold text-[18px]'>OR</span>
                                <div className="line w-[80px] border-t-[1px] border-gray"></div>
                            </div>

                            <label className='dark:border-black border-blueAcc border-[3px] rounded-[8px] w-[198px] h-[64px] flex items-center justify-center cursor-pointer text-[18px] font-bold dark:text-black text-blueAcc'>
                                Choose a file

                                <input type="file" className='hidden' />
                            </label>

                            <div className='h-[24px] text-[14px] text-gray pt-[16px] box-border'>50 MB max file size</div>

                        </div>
                    </div>

                    <div className='relative'>

                        <div className="relative left-[-10px] w-[225px] flex items-center justify-between toggle-box pt-[10px] pb-[8px] box-border">
                            <SimpleToggle state={isGeneratePassActive} clickHandler={generatePassToggleClicked} />
                            <div className='text-gray text-[18px]'>Generate a password</div>
                        </div>

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
                                    className='absolute right-[6%] top-[55%] opacity-50'
                                    src={isHidePass ? eyeClose : eyeOpen}
                                    onClick={eyeClicked}
                                    alt='eye' />

                            </label>

                            <div className='pt-[4px] pb-[15px] pl-[2px] text-[14px] font-normal text-gray'>
                                Enter a password that includes at least one uppercase letter, one number, and one symbol (such as !@#$%^&*)
                            </div>

                            <label className='dark:bg-black bg-blue text-white border-[3px] rounded-[8px] h-[64px] flex items-center justify-center cursor-pointer text-[18px] font-bold dark:text-white'>
                                <div className='flex items-center '><Image className='mr-[8.5px]' src={shareIco} alt='share' /> Share</div>
                                <input type="file" className='hidden' />
                            </label>

                        </div>


                    </div>

                </div>
            </div>

        </div>
    )
}