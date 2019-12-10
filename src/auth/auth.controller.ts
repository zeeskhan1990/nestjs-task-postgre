import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signup(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return this.authService.signup(authCredentialsDTO)
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO): Promise<{accessToken: string}> {
        return this.authService.signin(authCredentialsDTO)
    }

    // Putting a guard over a particular route, can be done at the root too
    /* @Post('/test')
    @UseGuards(AuthGuard())
    test( @Req() req  @GetUser() user: User) {
        console.log(user)
    } */
}
