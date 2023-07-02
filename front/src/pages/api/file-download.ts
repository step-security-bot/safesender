
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {
    url: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {

        console.log();

        const u = req.query.url as string;

        const apiResponse = await fetch( u );

        console.log( 'apiResponse: ', apiResponse);

        const test = await apiResponse.blob();

        return res.status( 200 ).send( test.arrayBuffer.toString() );
    } catch ( err ) {
        console.log( err );
    }

    // res.status( 200 ).json( { file: [ 32, 435, 123, 23 ], filename: 'test.txt',
    //  passwordHash: '11111111111111111111111111111122' } )
}