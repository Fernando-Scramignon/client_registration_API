import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";

import { ClientPhoneNumber } from "./clientPhoneNumber.entity";
import { ClientEmail } from "./clientEmail.entity";
import { Contact } from "./contact.entity";

@Entity("Client")
export class Client {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({ length: 64, unique: true })
    username: string;

    @Column({ length: 32 })
    password: string;

    @Column({ length: 256 })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => ClientPhoneNumber, (PhoneNumber) => PhoneNumber.client)
    phoneNumbers: ClientPhoneNumber[];

    @OneToMany(() => ClientEmail, clientEmail => clientEmail.client)
    emails: ClientEmail[];

    @OneToMany(() => Contact, (contact) => contact.client)
    contacts: Contact[]
}