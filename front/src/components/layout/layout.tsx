import { PropsWithChildren } from 'react';
import Image from 'next/image';

import waves from '../../../public/waves.svg';
import { Footer } from '../shared/footer/Footer';
import { Header } from '../shared/header/Header';
import { ThemeProvider } from '../../core/context/ThemeContext';
import { LoaderProvider } from '../../core/context/LoaderContext';
import ChildrenWrapper from '../shared/childrenWrapper/childrenWrapper';
import { DataProvider } from '../../core/context/DataContext';


export default function Layout( { children }: PropsWithChildren ) {
    return (
        <div>
            <ThemeProvider>
                <LoaderProvider>
                    <DataProvider>
                        <Header />

                        <main className=' bg-blue relative dark:bg-black overflow-hidden'>

                            <Image
                                className='sm:hidden w-full absolute top-[-65px] left-0 right-0 bottom-0'
                                src={waves}
                                priority={true}
                                alt='bg' />

                            <div className='h-[922px] flex items-center justify-center relative'>
                                
                                {/* <div className='w-[580px] sm:w-[90%]'>

                                </div> */}

                                <ChildrenWrapper>{children}</ChildrenWrapper>

                            </div>


                        </main>

                        <Footer />
                    </DataProvider>
                </LoaderProvider>
            </ThemeProvider>
        </div>
    )
}