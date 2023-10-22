import Image from 'next/image';

import checkboxCircleLine from '../../../../public/checkbox-circle-line.svg';

export interface SmallInfoPanelProps {
    readonly text?: string;
    readonly icon?: string;
    readonly state: string;
}

export function SmallInfoPanel( { state, text, icon }: SmallInfoPanelProps ): React.ReactElement {
    return (
        <div className={`transition-opacity opacity-0 left-0 right-0 top-[-40px] absolute m-auto w-[178px] pl-[40px] pr-[40px] pt-[20px] pb-[20px] border-[6px] border-[rgba(47,212,20,1)] rounded-[8px] bg-white flex justify-center`}
        style={{ opacity: state }}>
            <div className='flex items-center gap-[8px]'>
                <Image src={icon || checkboxCircleLine} alt='copied icon' />
                <span className='font-semibold text-[rgba(47,212,20,1)] text-[18px] leading-[24px]'>{text || 'Copied'}</span>
            </div>
        </div>
    )
}