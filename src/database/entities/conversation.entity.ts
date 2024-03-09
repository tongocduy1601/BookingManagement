import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { MessageEntity } from './message.entity';

@Entity('conversation')
export class ConversationEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, (user) => user.conversations)
    @JoinColumn()
    user: UserEntity;

    @Column()
    title: string;

    @OneToMany(() => MessageEntity, (message) => message.conversation, {
        onDelete: 'CASCADE',
        cascade: ['soft-remove'],
    })
    message: MessageEntity[];

    @OneToOne(() => UserEntity)
    @JoinColumn({
        name: 'creatorId',
    })
    creator: UserEntity;
}
