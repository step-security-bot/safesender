export function fixPasswordLenIfNeeded(password: string | null | undefined, desiredPasswordLen: number): string {
    if (!password) {
        throw new Error("Password cannot be null or undefined");
    }

    return password.length < desiredPasswordLen
        ? password.padEnd(desiredPasswordLen, '0')
        : password.substring(0, desiredPasswordLen);
}