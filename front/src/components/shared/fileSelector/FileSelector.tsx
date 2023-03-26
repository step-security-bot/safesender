import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

import { useTheme } from '../../../core/context/ThemeContext';

import loadIcoBlue from './../../../../public/loadIcoBlue.svg';
import loadIcoBlack from './../../../../public/loadIcoBlack.svg';


export const FileSelector = (): React.ReactElement => {

    const theme = useTheme();

    const onDrop = useCallback( ( acceptedFiles: any ) => {
        console.log( acceptedFiles );
    }, [] );

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone( { onDrop } );

    return (
            <form {...getRootProps( { className: "dropzone" } )} className="b w-[508px] h-[320px] flex flex-col items-center box-border pt-[33px]">

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

                <div className='dark:border-black border-blueAcc border-[3px] 
                            rounded-[8px] w-[198px] h-[64px] flex items-center justify-center cursor-pointer text-[18px] font-bold dark:text-black text-blueAcc'>
                    Choose a file
                    <input type="file" {...getInputProps()} className='hidden' />
                </div>

                <div className='h-[24px] text-[14px] text-gray pt-[16px] box-border'>
                    50 MB max file size
                </div>

            </form>
    )
}