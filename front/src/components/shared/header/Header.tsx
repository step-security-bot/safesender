import Image from 'next/image';
import { useEffect } from 'react';

import logo from '../../../../public/logo2.svg';
import { ThemeToggle } from '../themeToggle/ThemeToggle';
import { useTheme } from '../../../core/context/ThemeContext';
import Link from 'next/link';


export const Header = () => {

    useEffect( () => {
        themeContext.setDarkMode( true );
    }, [] );

    const themeContext = useTheme();

    const switchThemeHandler = () => {
        themeContext.setDarkMode( !themeContext.darkMode );
    }

    return (
        <header className={`h-[62px] justify-between flex items-center bg-blue dark:bg-black`}>

            <div>
                <Link href='/' className='ml-[67px] flex items-center justify-center'>
                    <div>
                        <Image src={logo} alt="logo" width="18" height="21" />
                    </div>
                    <h2 className='font-bold text-white text-[20px] pl-[7px] pt-[3px] box-border'>
                        <span>Safe</span>Sender
                    </h2>
                </Link>
            </div>

            <div className='mr-[64px]'>
                <ThemeToggle darkMode={themeContext.darkMode} clickHandler={switchThemeHandler} />
            </div>

        </header>
    )
}