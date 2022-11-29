import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("ContactPhoneNumber")
export class ContactPhoneNumber {
    @PrimaryColumn({ unique: true })
    phoneNumber: number;

    @Column({ default: false, nullable: false })
    isMain: boolean = false;
};