import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ nullable: true })
    deletedAt: Date;
}
