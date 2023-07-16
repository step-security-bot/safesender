import Image from 'next/image';

import infoIcon from '../../../../public/info.svg';
import ukrIcon from '../../../../public/ukr.svg';


export const Footer = () => {
    return (

        <footer
            className='pl-[64px] sm:pt-[15px] sm:pb-[15px] pr-[64px] h-[40px] sm:h-[auto] sm:flex sm:flex-wrap sm:justify-center gap-5 bg-blue dark:bg-black
             text-white flex items-center justify-between'>

            <div className="about flex items-center justify-between w-[160px]">
                About SafeSender <Image src={infoIcon} alt='info' />
            </div>

            <div className="team sm:order-2">
                Created by <span className='underline'>HoverlaDev</span>
            </div>

            <div className="w-[150px] ">
                <a
                    className='w-full flex items-center justify-between'
                    href="https://prytulafoundation.org/"
                    target='_blanc'>
                    <Image src={ukrIcon} alt='ukraine' />Support Ukraine
                </a>
            </div>

        </footer>
    )
}