import Image from 'next/image';
import i from '../../../public/vercel.svg';


export const Header = () => {

    return (
        <header className='bg-black'>
            <div className='flex align-middle justify-center'>
                <div>
                    <Image src={i} alt="logo" width="18" height="21" />
                </div>
                <h2 className='font-bold'><span className='text-blue'>Safe</span>Sender</h2>
            </div>
        </header>
    )
}