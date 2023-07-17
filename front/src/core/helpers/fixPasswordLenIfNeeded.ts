export function fixPasswordLenIfNeeded(password: string | null | undefined, minPasswordLen: number): string {
    if (password == null) {
        throw new Error("Password cannot be null or undefined");
    }

    return password.length < minPasswordLen ? password.padEnd(minPasswordLen, '0') : password;
}
