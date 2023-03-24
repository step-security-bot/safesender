import Image from 'next/image';
import infoIcon from '../../../../public/info.svg';
import ukrIcon from '../../../../public/ukr.svg';


export const Footer = () => {
    return (
        <footer className='pl-[64px] pr-[64px] h-[40px] bg-blue dark:bg-black text-white flex items-center justify-between'>

            <div className="about flex items-center justify-between w-[160px]">
                About SafeSender <Image src={infoIcon} alt='info'/>
            </div>

            <div className="team">
                Created by <span className='underline'>HoverlaDev</span>
            </div>

            <div className="support w-[150px] flex items-center justify-between">
                <Image src={ukrIcon} alt='ukraine' />Support Ukraine
            </div>

        </footer>
    )
}