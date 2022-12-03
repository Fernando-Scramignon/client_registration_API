import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, OneToMany } from "typeorm";

import { ClientPhoneNumber } from "./clientPhoneNumber.entity";
import { ClientEmail } from "./clientEmail.entity";
import { Contact } from "./contact.entity";

import { v4 as uuid } from "uuid";

@Entity("Client")
export class Client {
    @PrimaryColumn("uuid")
    readonly id: string;

    @Column({ length: 64, unique: true })
    username: string;

    @Column({ length: 256 })
    name: string;

    @Column({ length: 256 })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => ClientPhoneNumber, (PhoneNumber) => PhoneNumber.client)
    phoneNumbers: ClientPhoneNumber[];

    @OneToMany(() => ClientEmail, clientEmail => clientEmail.client)
    emails: ClientEmail[];

    @OneToMany(() => Contact, (contact) => contact.client)
    contacts: Contact[]

    // creating the id here i can controll the order of the object properties
    constructor() {
        if (!this.id) this.id = uuid()
    }
}