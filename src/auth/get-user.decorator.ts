import {createParamDecorator} from '@nestjs/common'
import { User } from './user.entity'

// data - Data provided to decorator
// req - request object
export const GetUser = createParamDecorator((data, req): User => {
    console.log()
    return req.user
})