import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("ClientEmail")
export class ClientEmail {
    @PrimaryColumn({ length: 256, unique: true })
    emailAddress: string;

    @Column({ nullable: false, default: false })
    isMain: boolean = false;

};