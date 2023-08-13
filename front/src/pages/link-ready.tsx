import { useRouter } from 'next/router'

import { LinkReadyBox } from '../components/shared/linkReady/LinkReady';


export default function LinkReady() {

    const router = useRouter();

    return (
        <div>
            <LinkReadyBox extLink={router.query[ 'link' ] as string}/>
            <h1>{router.query['link']}</h1>
        </div>
    )
}