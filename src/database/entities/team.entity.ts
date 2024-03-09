import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('team')
export class TeamEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    logo: string;
}
