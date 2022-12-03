import { MigrationInterface, QueryRunner } from "typeorm";

export class ContactPhoneNumber1669762562264 implements MigrationInterface {
    name = 'ContactPhoneNumber1669762562264'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ContactPhoneNumber" ("phoneNumber" integer NOT NULL, "isMain" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_9e9ec37a4bff0990af15004aaa6" PRIMARY KEY ("phoneNumber"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ContactPhoneNumber"`);
    }

}
