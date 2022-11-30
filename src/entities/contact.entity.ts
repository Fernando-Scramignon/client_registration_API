import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";

import { ContactPhoneNumber } from "./contactPhoneNumber.entity";

@Entity("Contact")
export class Contact {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({ length: 256, nullable: false })
    name: string

    @OneToMany(() => ContactPhoneNumber, phoneNumber => phoneNumber.contact)
    phoneNumbers: ContactPhoneNumber[]
}