import {
    IsEmail,
    IsLowercase,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @MinLength(8)
    @IsLowercase()
    username: string;

    firstName?: string;

    middleName?: string;

    @IsNotEmpty()
    lastName?: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsNumber()
    phone?: string;

    avatar?: string;

    @IsNotEmpty()
    @MinLength(5)
    password: string;
}
