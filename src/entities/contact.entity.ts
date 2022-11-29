import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity("Contact")
export class Contact {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({ length: 256, nullable: false })
    name: string
}