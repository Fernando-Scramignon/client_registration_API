import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Client } from "./client.entity";

@Entity("ClientPhoneNumber")
export class ClientPhoneNumber {
    @PrimaryColumn({ unique: true, length: 15 })
    phoneNumber: string;

    @Column({ nullable: false, default: false })
    isMain: boolean = false;

    @ManyToOne(() => Client, (Client) => Client.phoneNumbers, { onDelete: "CASCADE" })
    client: Client;

};
