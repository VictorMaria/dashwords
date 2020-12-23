import crypto from 'crypto'

export const getRandomString = () => {
    const randomString = crypto
    .randomBytes(9)
    .toString('base64')
    .replace('+', '-')
    .replace('/', '_')
    .replace(/=+$/, '');
    return randomString;
};