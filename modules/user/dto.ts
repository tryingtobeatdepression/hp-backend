/******
 * 
 * 
*/
export interface CreateUserDto {
    username: string
    name: string
    email: string
    password: string
    role?: number // visitor
}
