import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne } from "typeorm";

import { ContactPhoneNumber } from "./contactPhoneNumber.entity";
import { ContactEmail } from "./contactEmail.entity";
import { Client } from "./client.entity";

@Entity("Contact")
export class Contact {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({ length: 256, nullable: false })
    name: string;

    @OneToMany(() => ContactPhoneNumber, phoneNumber => phoneNumber.contact)
    phoneNumbers: ContactPhoneNumber[];

    @OneToMany(() => ContactEmail, email => email.contact)
    emails: ContactEmail[];

    @ManyToOne(() => Client, (client) => client.contacts, { onDelete: "CASCADE" })
    client: Client;
}