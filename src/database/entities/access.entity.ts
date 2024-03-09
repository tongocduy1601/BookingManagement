import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('userAccess')
export class AccessEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, (user) => user.access)
    user: UserEntity;

    @Column({ nullable: true })
    token: string;

    @Column()
    deviceId: string;
}
