import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({ length: 256 })
    name: string

    @CreateDateColumn()
    createdAt: Date
}