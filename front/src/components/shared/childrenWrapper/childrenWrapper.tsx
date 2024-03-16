import { PropsWithChildren } from 'react';
import { useDataContext } from '../../../core/context/DataContext';
import { useRouter } from 'next/router';

export default function ChildrenWrapper( { children }: PropsWithChildren ): React.ReactElement {

    const dataContext = useDataContext();

    const router = useRouter();

    console.log(router)

    return (
        <div className='w-[580px] bigDesktop:w-[100%] sm:w-[90%]'>

            {
                (dataContext.token || router.route === '/404') ? '' : <div className="pt-[8px] h-[72px] bigDesktop:h-[144px] sm:h-[auto] bigDesktop:text-[56px] leading-[36px] bigDesktop:leading-[72px] mb-[24px] text-center m-auto font-medium text-white text-[24px]">
                    Upload the file in any format, encrypt it, and share it with anyone
                </div>
            }

            <div className={` ${ dataContext.hasFile && 'h-auto' }`}>

                <div className='sm:border-[0px] bigDesktop:h-[1333px] m-auto p-[10px] border-[#9FBEF9] dark:border-[#838383]
                 dark:bg-[#838383] bg-[#9FBEF9] rounded-[16px] box-border flex items-center justify-center'>
                    <div className='bg-white bigDesktop:h-[100%] bigDesktop:w-full rounded-[16px] p-[24px] box-border'>

                        {children}

                    </div>
                </div>

            </div>

        </div>
    )
}