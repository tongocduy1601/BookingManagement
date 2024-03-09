import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserConstant } from 'src/common/constant/user.constant';
import { AccessEntity } from 'src/database/entities/access.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'src/common/interface/jwt-payload';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,

        @InjectRepository(AccessEntity)
        private readonly accessRepositoty: Repository<AccessEntity>,
    ) {}
    saltOrRounds = 10;

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new BadRequestException(UserConstant.NotFound);
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new UnauthorizedException(UserConstant.InvalidPassword);
        }
        const payload: JwtPayload = {
            userId: user.id,
            role: user.role,
        };

        return {
            ...user,
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async logUserAcess(
        userId: number,
        deviceId: string,
        access_token: string,
    ): Promise<AccessEntity> {
        const access =
            (await this.accessRepositoty
                .createQueryBuilder('ac')
                .innerJoin('ac.user', 'user', 'user.id= :id', {
                    id: userId,
                })
                .getOne()) || new AccessEntity();
        access.deviceId = deviceId;
        access.token = access_token;
        return await this.accessRepositoty.save(access);
    }
}
