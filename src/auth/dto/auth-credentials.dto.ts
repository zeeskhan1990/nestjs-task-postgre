import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator"

export class AuthCredentialsDTO {
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    username: string

    @IsString()
    @MinLength(4)
    @MaxLength(30)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'password too weak'},
        )
    password: string
}