import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("ContactEmail")
export class ContactEmail {
    @PrimaryColumn({ length: 256, unique: true })
    emailAddress: string;

    @Column({ nullable: false, default: false })
    isMain: boolean = false;
};