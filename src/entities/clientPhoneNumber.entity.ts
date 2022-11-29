import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("ClientPhoneNumber")
export class ClientPhoneNumber {
    @PrimaryColumn({ unique: true })
    phoneNumber: number;

    @Column({ nullable: false, default: false })
    isMain: boolean = false;
};
