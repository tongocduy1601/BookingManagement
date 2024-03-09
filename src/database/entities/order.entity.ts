import { Column, Entity, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('order')
export class OrderEntity extends BaseEntity {
    @OneToMany(() => UserEntity, (user) => user)
    user: UserEntity;

    @Column({
        type: 'int',
    })
    itemId: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price: number;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    discount: number;
}
