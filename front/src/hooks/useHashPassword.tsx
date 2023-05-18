import { createHash } from 'crypto';

export function useHashPassword( password: string ): string {
    const hash = createHash( 'sha512' );
    hash.update( password );
    return hash.digest( 'hex' );
}