import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    const base64 = Buffer.from(hash).toString('base64');
    return base64
}

export async function verifyPassword(password: string, base64Hash: string) {
    const hash = Buffer.from(base64Hash, 'base64').toString('utf-8');
    const isValid = await bcrypt.compare(password, hash);
    return isValid
}

// (async () => {
//    const isPasswordValid = await verifyPassword('123456','JDJiJDEwJGFScTRENTdtL2oyb04xQ0hGeFkxNU9wRjY3dGlQVVR0RkVXcEpEYUlsMnpVWDhKRFN1dUg2')
//    console.log(isPasswordValid);
// })();