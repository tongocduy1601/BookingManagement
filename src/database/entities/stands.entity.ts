import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { SlotEntity } from './slot.entity';

@Entity('stand')
export class StandEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price: number;

    @OneToMany(() => SlotEntity, (slot) => slot.stand)
    slot: SlotEntity[];

    @Column({
        type: 'int',
    })
    maxSlot: number;
}
