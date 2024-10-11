export default function isExpoTokenValid(token: any): boolean {
    return (typeof token === 'string' &&
        (((token.startsWith('ExponentPushToken[') || token.startsWith('ExpoPushToken[')) &&
            token.endsWith(']')) ||
            /^[a-z\d]{8}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{4}-[a-z\d]{12}$/i.test(token)));
}