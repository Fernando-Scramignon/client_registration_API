import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

import { Client } from "./client.entity";

@Entity("ClientEmail")
export class ClientEmail {
    @PrimaryColumn({ length: 256, unique: true })
    emailAddress: string;

    @Column({ nullable: false, default: false })
    isMain: boolean = false;

    @ManyToOne(() => Client, client => client.emails, { onDelete: "CASCADE" })
    client: Client;
};