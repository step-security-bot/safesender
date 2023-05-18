import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    success: boolean, 
    data?: any,
    message?: string,
}

type RequestData = {
    file: File,
    hash: string,
    fileExt: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const data = req.body;

    try {

        // console.log('DATA: ', data);

        const externalResponse = await fetch('http://37.27.18.167:5006/api/upload', {
            method: 'POST',
            body: JSON.stringify( data ),
            redirect: 'follow',
            headers: { 'content-type': 'application/json' }
        })

        console.log( 'externalResponse', externalResponse );


        if (!externalResponse.ok) {
                throw new Error('Network response was not ok');
            }
        
            const externalResponseData = await externalResponse.json();
            res.status( 200 ).json( { success: true, data: externalResponseData });
    
    } catch (error) {
            console.log(error);
            res.status( 500 ).json( error );
    }

    // setTimeout(() => {
    //     res.setHeader('Location', 'testToken').status( 200 ).json( { success: true, message: 'OK', data: 'https://blindsend.io#DKXNDf8_qygBp2lNfRFnww;vMIADjM3SEuSnDWkzS2Cxg==' } );
    // }, 3000)
}