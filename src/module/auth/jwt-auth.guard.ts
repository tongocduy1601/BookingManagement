import {
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Roles } from './roles.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super(reflector);
    }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    getRequest(context: ExecutionContext) {
        return context.switchToHttp().getRequest();
    }
    handleRequest<TUser = any>(
        err: any,
        user: any,
        info: any,
        context: any,
    ): TUser {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        const roles = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );
        if (!roles) {
            return user;
        }

        if (!roles.some((item) => item === user.role)) {
            throw err || new ForbiddenException();
        }

        return user;
    }
}
