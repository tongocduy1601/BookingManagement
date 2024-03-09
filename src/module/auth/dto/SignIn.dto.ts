import { IsNotEmpty, MinLength } from 'class-validator';

export class SignInDto {
    @MinLength(8)
    username: string;

    @IsNotEmpty()
    password: string;
}
