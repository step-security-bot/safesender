import { PropsWithChildren } from 'react';

import { useDataContext } from '../../../core/context/DataContext';


export default function ChildrenWrapper( { children }: PropsWithChildren ): React.ReactElement {

    const dataContext = useDataContext();

    return (
        <div className='w-[580px] sm:w-[90%]'>

            {
                !dataContext.token && <div className="pt-[8px] h-[72px] sm:h-[auto] leading-[36px] mb-[24px] text-center m-auto font-medium text-white text-[24px]">
                    Upload the file in any format, encrypt it, and share it with anyone
                </div>
            }

            <div className={` ${ dataContext.hasFile && 'h-auto' }`}>

                <div className='sm:border-[0px] m-auto p-[10px] border-[#9FBEF9] dark:border-[#838383]
                 dark:bg-[#838383] bg-[#9FBEF9] rounded-[16px] box-border flex items-center justify-center'>
                    <div className='bg-white rounded-[16px] p-[24px] box-border'>

                        {children}

                    </div>
                </div>

            </div>

        </div>
    )
}