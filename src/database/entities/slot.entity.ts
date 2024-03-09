import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { MatchEntity } from './match.entity';
import { StandEntity } from './stands.entity';
import { ppid } from 'process';

@Entity('slot')
export class SlotEntity extends BaseEntity {
    @Column()
    name: string;

    @Column({
        default: true,
    })
    available: boolean;

    @ManyToOne(() => UserEntity, (user) => user.bookingSlot)
    onwer: UserEntity;

    @ManyToOne(() => MatchEntity, {
        onDelete: 'CASCADE',
        cascade: ['soft-remove'],
    })
    @JoinColumn({
        name: 'matchId',
    })
    match: MatchEntity;

    @OneToOne(() => StandEntity, {
        nullable: true,
    })
    @JoinColumn({
        name: 'standId',
    })
    stand: StandEntity;
}
