import Image from 'next/image';

import blackIcon from '../../../../public/blackIcoCircle.svg';
import blueIcon from '../../../../public/blueIcoCircle.svg';
import tumbUp from '../../../../public/thumb-up-line.svg';

import { useTheme } from '../../../core/context/ThemeContext';
import { Button } from '../../shared/button/Button';
import { useRouter } from 'next/router';


export function Downloaded(): React.ReactElement {

    const theme = useTheme();
    const router = useRouter();

    const clickHandler = (): void => {
        router.push({
            pathname: '/'
        });
    }

    return (
        <div className='w-[510px] sm:m-auto sm:w-[90%] sm:h-full flex flex-col gap-[24px]'>
            <div className='flex flex-col gap-[8px]'>
                <div className='flex gap-[8px] justify-center items-center text-center'>
                    <Image src={blackIcon} alt='icon' />
                    <span className='text-[32px] font-semibold leading-[48px]'>Downloaded</span>
                </div>
                <div className='text-center'>
                    <span className='text-[#A0A7BA] text-[18px] font-normal leading-[24px]'>Your file is successfully downloaded</span>
                </div>
            </div>
            <Button
                icon={tumbUp}
                labelText='Okay'
                onClickHandler={clickHandler}
            />
        </div>
    )
}