import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    private async hashPassword(password: string, salt:string) {
        return bcrypt.hash(password, salt)
    }

    async signup(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        const {username, password} = authCredentialsDTO
        const user = new User()
        user.salt = await bcrypt.genSalt()
        /**
         * if (user.exists(User.findOne({username}))) { throw new Error("Username exists")}
         */
        user.username = username
        user.password = await this.hashPassword(password, user.salt)
        try {
            await user.save()
        } catch (error) {
            if (error.code === '23505') { // Implementation specific error code for unique constraint violation
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async validateUserPassword(authCredentialsDTO: AuthCredentialsDTO): Promise<string> {
        const {username, password} = authCredentialsDTO
        // First check if user exists
        const user = await this.findOne({where: {username}})
        // If user exists then check if password is correct
        if (user && await user.validatePassword(password)) {
            return user.username
        }
        return null
    }
}