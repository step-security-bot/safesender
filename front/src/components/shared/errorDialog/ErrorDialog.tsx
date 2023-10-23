import Image from 'next/image';
import { useRouter } from 'next/router';

import closeLineIco from '../../../../public/close-line.svg';
import refreshLineIco from '../../../../public/refresh-line.svg';

import { Button } from '../button/Button';
import { useErrorContext } from '../../../core/context/ErrorContext';


export interface ErrorDialogProps {
    readonly text?: string;
    readonly show: boolean;
}

export default function ErrorDialog(): React.ReactElement {

    const router = useRouter();
    const error = useErrorContext();

    const refreshClicked = (): void => {
        router.reload();
    }

    return (
        <div style={error.showErrorDialog ? { display: 'flex' } : { display: 'none' }} className='w-full h-full bg-[rgba(7,7,7,.7)] absolute z-[9999] flex justify-start items-center'>
            <div className='absolute m-auto left-0 right-0 top-[50%] translate-y-[-50%] sm:w-full z-[99999] w-[580px] border-[10px] rounded-[16px] flex bg-[#F9AF9F] border-[#F9AF9F]'>
                <div className='m-auto w-full flex flex-col gap-[24px] h-full bg-white p-[24px] box-border rounded-[10px] '>
                    <div className='flex flex-col gap-[8px]'>
                        <div className="relative flex justify-center">
                            <span className='font-semibold justify-self-center text-[32px]'>Error</span>
                            <div className='absolute top-0 right-0 cursor-pointer w-[24px] h-[24px]'>
                                <Image
                                    src={closeLineIco}
                                    alt='close button'
                                />
                            </div>
                        </div>
                        <div className='text-center'>
                            <span className='leading-[24px] text-[18px] text-[#A0A7BA]'>Oops, something went wrong. Please try again later. <br />
                                You can also email us <span className='text-[#3F7CF3] underline'>support@safesender.app</span></span>
                        </div>
                    </div>
                    <div>
                        <Button
                            icon={refreshLineIco}
                            color='#FF614B'
                            labelText='Try again'
                            onClickHandler={refreshClicked}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}