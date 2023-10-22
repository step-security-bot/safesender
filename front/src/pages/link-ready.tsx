import { useRouter } from 'next/router'

import { LinkReadyBox } from '../components/shared/linkReady/LinkReady';
import { useDataContext } from '../core/context/DataContext';


export default function LinkReady() {

    // const router = useRouter();

    const dataContext = useDataContext();

    return (
        <div>
            <LinkReadyBox extLink={dataContext.link}/>
        </div>
    )
}