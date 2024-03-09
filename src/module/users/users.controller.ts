import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Query,
    Param,
} from '@nestjs/common';
import { User, UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from 'src/constant/user.constant';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserPaging } from './paging-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    async findAll(@Query() query: UserPaging): Promise<UserEntity[]> {
        console.log(query);
        return this.usersService.findALl(query);
    }

    @Post('register')
    async register(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.usersService.create(createUser);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async profile(@Param('id') userId: number): Promise<User> {
        return this.usersService.profile(userId);
    }
}
