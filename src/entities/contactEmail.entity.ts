import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

import { Contact } from "./contact.entity";

@Entity("ContactEmail")
export class ContactEmail {
    @PrimaryColumn({ length: 256, unique: true })
    emailAddress: string;

    @Column({ nullable: false, default: false })
    isMain: boolean = false;

    @ManyToOne(() => Contact, (contact) => contact.emails, { onDelete: "CASCADE" })
    contact: Contact;
};