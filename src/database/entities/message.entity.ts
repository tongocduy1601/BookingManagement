import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { ConversationEntity } from './conversation.entity';

@Entity('message')
export class MessageEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, (user) => user.message, {
        onDelete: 'CASCADE',
        cascade: ['soft-remove'],
    })
    user: UserEntity;

    @ManyToOne(
        () => ConversationEntity,
        (conversation) => conversation.message,
        {
            onDelete: 'CASCADE',
            cascade: ['soft-remove'],
        },
    )
    conversation: ConversationEntity;

    @Column()
    content: string;
}
