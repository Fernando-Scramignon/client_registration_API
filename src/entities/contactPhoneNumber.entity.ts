import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

import { Contact } from "./contact.entity";

@Entity("ContactPhoneNumber")
export class ContactPhoneNumber {
    @PrimaryColumn({ unique: true })
    phoneNumber: number;

    @Column({ default: false, nullable: false })
    isMain: boolean = false;

    @ManyToOne(() => Contact, contact => contact.phoneNumbers, { onDelete: "CASCADE" })
    contact: Contact
};