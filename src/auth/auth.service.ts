import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
                private jwtService: JwtService) {}

    async signup(authCredentialsDTO: AuthCredentialsDTO) {
        return this.userRepository.signup(authCredentialsDTO)
    }

    async signin(authCredentialsDTO: AuthCredentialsDTO): Promise<{accessToken: string}> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDTO)

        if (!username) {
            throw new UnauthorizedException('Invalid Credentials')
        }

        const payload = {username }
        const accessToken = await this.jwtService.sign(payload)
        return {accessToken}
    }
}
