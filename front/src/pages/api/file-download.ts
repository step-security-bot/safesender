
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {
    file: number[];
    passwordHash: string;
    filename: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        const apiResponse = await fetch( `https://api.safesender.app/api/download/${ JSON.parse( req.body ).token}`);

        // console.log( 'apiResponse: ', );

        const test = await apiResponse.json();

        console.log(test);
        
        return res.status(200).json(test);
    } catch(err) {
        console.log( err );
    }

    // res.status( 200 ).json( { file: [ 32, 435, 123, 23 ], filename: 'test.txt',
    //  passwordHash: '11111111111111111111111111111122' } )
}