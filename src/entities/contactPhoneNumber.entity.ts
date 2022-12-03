import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

import { Contact } from "./contact.entity";
import { v4 as uuid } from "uuid";

@Entity("ContactPhoneNumber")
export class ContactPhoneNumber {
    @PrimaryColumn("uuid")
    readonly id: string;

    @Column({ length: 15 })
    phoneNumber: string;

    @Column({ default: false, nullable: false })
    isMain: boolean = false;

    @ManyToOne(() => Contact, contact => contact.phoneNumbers, { onDelete: "CASCADE" })
    contact: Contact

    constructor() {
        if (!this.id) this.id = uuid()
    }
};