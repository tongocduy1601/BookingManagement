import { Column, Entity, OneToMany } from 'typeorm';
import { AccessEntity } from './access.entity';
import { BaseEntity } from './base.entity';
import { ConversationEntity } from './conversation.entity';
import { MessageEntity } from './message.entity';
import { Role } from '../../constant/user.constant';
import { SlotEntity } from './slot.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
    @Column({
        nullable: false,
    })
    username: string;
    @Column({
        nullable: true,
    })
    firstName: string;

    @Column({
        nullable: true,
    })
    middleName: string;

    @Column({
        nullable: true,
    })
    lastName: string;

    @Column()
    email: string;

    @Column({
        nullable: true,
    })
    phone: string;

    @Column({
        nullable: true,
    })
    avatar: string;

    @Column({
        default: false,
    })
    isActive: boolean;

    @Column({
        type: 'enum',
        enum: Role,
    })
    role: Role;

    @Column()
    password: string;

    @OneToMany(() => AccessEntity, (access) => access.user)
    access: AccessEntity;

    @OneToMany(() => ConversationEntity, (conversation) => conversation.user)
    conversations: ConversationEntity[];

    @OneToMany(() => MessageEntity, (message) => message.user)
    message: MessageEntity;

    @OneToMany(() => SlotEntity, (slot) => slot.onwer)
    bookingSlot: SlotEntity[];
}
