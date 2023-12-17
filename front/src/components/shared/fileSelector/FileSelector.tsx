import Image from 'next/image';
import React from 'react';
import { useDropzone } from 'react-dropzone';

import { useTheme } from '../../../core/context/ThemeContext';

import loadIcoBlack from './../../../../public/loadIcoBlack.svg';
import loadIcoBlue from './../../../../public/loadIcoBlue.svg';

import { FileItem } from '../fileItem/FIleItem';


export interface FileSelectorProps {
    onDrop: any;
    file: File | undefined;
    deleteFile: any;
}


export const FileSelector = ( { onDrop, file, deleteFile }: FileSelectorProps ): React.ReactElement => {

    const theme = useTheme();

    const { getRootProps, getInputProps } = useDropzone( { onDrop } );

    return (
        <form {...getRootProps( { className: "dropzone" } )}
            className={`b bigDesktop:w-[100%] bigDesktop:h-[551px] sm:w-[100%] w-[508px] ${ file ? 'h-[112px]' : 'h-[320px]' } ${ !file ? 'pt-[33px]' : 'justify-center' } flex flex-col items-center box-border `}>

            {!file
                ? <>
                    <div className='img-wrapper bigDesktop:h-[126px] bigDesktop:w-[126px]'>
                        {
                            theme.darkMode
                                ? <Image className='w-full' src={loadIcoBlack} alt='load ico' />
                                : <Image className='w-full' src={loadIcoBlue} alt='load ico' />
                        }
                    </div>

                    <div className='font-bold pt-[16px] box-border text-[20px] bigDesktop:text-[32px] dark:text-black text-blueAcc'>Drag & drop your files here</div>

                    <div className="w-[202px] bidDesktop:w-[358px] h-[24px] bidDesktop:h-[42px] box-border pt-[24px] pb-[24px] flex items-center justify-evenly">
                        <div className="line w-[80px] border-t-[1px] border-gray"></div>
                        <span className='text-gray font-bold text-[18px] bigDesktop:text-[32px]'>OR</span>
                        <div className="line w-[80px] border-t-[1px] border-gray"></div>
                    </div>

                    <div className='dark:border-black border-blueAcc border-[3px] 
                            rounded-[8px] w-[198px] bigDesktop:w-[351px] bigDesktop:h-[107px] h-[64px] flex items-center justify-center cursor-pointer text-[18px] font-bold dark:text-black text-blueAcc'>
                        Choose a file
                        <input type="file" {...getInputProps()} className='hidden' />
                    </div>

                    <div className='h-[24px] text-[14px] text-gray pt-[16px] box-border'>
                        50 MB max file size
                    </div>
                </>
                : <FileItem fileSize={file?.size} file={file!} isBlured={false} isDeletable={true} deleteFile={deleteFile}/>
            }

        </form>
    )
}