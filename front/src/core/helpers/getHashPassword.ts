import { createHash } from 'crypto';


export function getHashPassword( password: string ): string {
    const hash = createHash( 'sha512' );
    hash.update( password );
    return hash.digest( 'hex' );
}