import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

import { Contact } from "./contact.entity";
import { v4 as uuid } from "uuid";

@Entity("ContactEmail")
export class ContactEmail {
    @PrimaryColumn("uuid")
    readonly id: string;

    @Column({ length: 256 })
    emailAddress: string;

    @Column({ nullable: false, default: false })
    isMain: boolean = false;

    @ManyToOne(() => Contact, (contact) => contact.emails, { onDelete: "CASCADE", nullable: true })
    contact: Contact;

    constructor() {
        if (!this.id) this.id = uuid()
    }
};