import { hash, genSalt, compare } from 'bcryptjs'

/**
 * 
 * ADAPTER PATTERN
 */

export async function hashToken(token: string): Promise<string> {
    return await hash(token, await genSalt(10))
}

export async function compareToken(token: string, hashedToken: string) {
    return await compare(token, hashedToken)
}