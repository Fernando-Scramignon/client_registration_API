import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";

import { ClientPhoneNumber } from "./clientPhoneNumber.entity";

@Entity("Client")
export class Client {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({ length: 256 })
    name: string

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => ClientPhoneNumber, (PhoneNumber) => PhoneNumber.client)
    phoneNumbers: ClientPhoneNumber[]
}