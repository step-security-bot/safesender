import Image from 'next/image';
import logo from '../../../../public/logo2.svg';
import { useEffect, useState } from 'react';
import { Toggle } from '../toggle/Toggle';
import { AppTheme } from '../../../models/themes';
import { useTheme } from '../../../core/context/ThemeContext';


export const Header = () => {

    useEffect(() => {
        themeContext.setDarkMode( true );
    }, []);

    const themeContext = useTheme();

    const switchThemeHandler = () => {
        themeContext.setDarkMode( !themeContext.darkMode );
    }

    return (
        <header className={`h-[56px] justify-between flex items-center bg-blue dark:bg-black`}>
            
            <div className='ml-[67px] flex items-center justify-center'>
                <div>
                    <Image src={logo} alt="logo" width="18" height="21" />
                </div>
                <h2 className='font-bold text-white text-[20px] pl-[7px] pt-[3px] box-border'>
                    <span>Safe</span>Sender
                </h2>
            </div>

            <div className='mr-[64px]'>
                <Toggle darkMode={themeContext.darkMode} clickHandler={switchThemeHandler} />
            </div>

        </header>
    )
}