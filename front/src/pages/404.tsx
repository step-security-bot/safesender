import { useRouter } from 'next/router';

import ret from '../../public/ret.svg';
import { Button } from '../components/shared/button/Button';


export default function Custom404(): React.ReactElement {

    const router = useRouter();

    const clickHandler = () => {
        router.push( {
            pathname: '/'
        } );
    }

    return (
        <div className='w-[510px] sm:m-auto sm:w-[90%] sm:h-full flex flex-col gap-[24px] items-center'>
            <div className='text-[110px] font-semibold leading-[124px]'>404</div>
            <div className='text-[32px] font-semibold leading-[48px]'>Page not found</div>

            <Button
                icon={ret}
                labelText='Back to home'
                onClickHandler={clickHandler}
            />
        </div>
    )
}