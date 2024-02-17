import React from 'react';
import Image from 'next/image';

import logo from '../../../public/logo-blue.svg';
import close from '../../../public/close-line2.svg';

export interface AboutUsProps {
    isOpen: boolean;
    closeClick: () => void;
}

export const AboutUs = ( { isOpen, closeClick }: AboutUsProps ): React.ReactElement => {

    return (
        <div className={
            `${ isOpen ? 'flex' : 'hidden' } absolute top-0 right-0 left-0 bottom-0 bg-[#070707B2] h-[100vh] w-[100vw`}>
            <div className={`sm:bottom-0 sm:left-0 sm:right-0 sm:w-full bottom-10 flex-col w-[563px] left-[100px] p-[24px] rounded-[16px] gap-[16px] absolute bg-white`}>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-[4px] h-[30px]'>
                        <div className="logo">
                            <Image src={logo} alt='logo' />
                        </div>
                        <div className='font-semibold text-[20px] leading-[60px]'>
                            <span className='text-[#3F7CF3]'>Safe</span>
                            <span className='text-[#070707]'>Sender</span>
                        </div>
                    </div>
                    <div onClick={closeClick} className='cursor-pointer'>
                        <Image src={close} alt='close ico' />
                    </div>
                </div>
                <p className='font-[32px] leading-[24px] text-[#070707]'>
                    SafeSender is a user-friendly and secure open-source file-sharing platform. Its main goal is to ensure the safe and reliable exchange of files between users, while also providing robust security features to protect sensitive information.
                    With SafeSender, users can easily upload and share files with anyone, anywhere in the world. All data is encrypted, so users can rest assured that their files are protected from unauthorized access.
                    One of the key features of SafeSender is its ease of use. The platform has a clean, intuitive interface that makes it easy for users to navigate and quickly find what they need. In addition, the platform is highly customizable, allowing users to tailor it to their specific needs and preferences.

                    SafeSender is also highly secure. It uses advanced encryption technologies to protect all data, and also provides users with features such as two-factor authentication and user-based access controls. This means that users can control who has access to their files and ensure that sensitive information is only shared with authorized individuals.
                    Overall, SafeSender is a powerful and user-friendly file-sharing platform that prioritizes security and ease of use. Whether you need to share files with colleagues, clients, or friends, SafeSender has you covered.
                </p>
            </div>
        </div>
    )
}