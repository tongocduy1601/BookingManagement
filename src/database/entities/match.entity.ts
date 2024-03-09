import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TeamEntity } from './team.entity';

@Entity('match')
export class MatchEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    poster: string;

    @Column()
    startTime: Date;

    @Column()
    address: string;

    @ManyToOne(() => TeamEntity)
    @JoinColumn({
        name: 'homeTeamId',
    })
    homeTeam: TeamEntity;

    @ManyToOne(() => TeamEntity)
    @JoinColumn({
        name: 'awayTeamId',
    })
    awayTeam: TeamEntity;
}
