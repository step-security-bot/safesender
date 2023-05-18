import React, { useState } from 'react';

import { Button } from '../button/Button';

import copyIco from './../../../../public/copyIco.svg';


export const LinkReady = ( { extLink }: { extLink: string }): React.ReactElement => {

    const [ link, setLink ] = useState<string | undefined>( extLink );

    const clickHandler = (): void => {
        navigator.clipboard.writeText(link!);
    };

    return (
        <div className='flex flex-col items-center'>

            <div className='flex flex-col items-center pb-[24px] box-border'>
                <span className='text-[32px] font-bold'>Exchange Link</span>
                <span className='text-[18px] text-gray'>Copy the link to share</span>
            </div>

            <div className='border w-full
            h-auto break-words text-center border-gray rounded-[8px] p-[25px] box-border text-gray'>
                {link}
            </div>

            <div className='pt-[24px] w-full box-border'>
                <Button
                    disabled={false}
                    labelText='Copy to clipboard'
                    onClickHandler={clickHandler}
                    icon={copyIco}
                ></Button>
            </div>

        </div>
    )
}