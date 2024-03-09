import { Role } from 'src/constant/user.constant';

export interface JwtPayload {
    userId: number;
    role: Role;
}
