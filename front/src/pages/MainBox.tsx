import Image from 'next/image';
import loadIcoBlack from '../../public/loadIcoBlack.svg';
import loadIcoBlue from '../../public/loadIcoBlue.svg';
import { useTheme } from '../core/context/ThemeContext';
import { SimpleToggle } from '../components/shared/simpleToggle/SimpleToggle';


export const MainBox = () => {

    const theme = useTheme();

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

                        <div className="relative left-[-10px] w-[225px] flex items-center justify-between toggle-box pt-[24px] pb-[24px] box-border">
                            <SimpleToggle clickHandler={() => console.log( 'toggleClicked!' )} />
                            <div className='text-gray text-[18px]'>Generate a password</div>
                        </div>


                    </div>

                </div>
            </div>

        </div>
    )
}