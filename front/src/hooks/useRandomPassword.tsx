import { passwordRegex } from '../core/configs/regexp';


export function useRandomPassword( length: number ): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@$!%*?&';

    let password = '';

    const generatePassword = () => {
        password = '';

        for ( let i = 0; i < length; i++ ) {
            const randomIndex = Math.floor( Math.random() * chars.length );
            password += chars[ randomIndex ];
        }
    }

    do {
        generatePassword();
        console.log( 'generatePassword' );
    } while ( !passwordRegex.test( password ) );

    return password;
}