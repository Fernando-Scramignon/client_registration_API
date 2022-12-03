import { MigrationInterface, QueryRunner } from "typeorm";

export class clientEmail1669760634031 implements MigrationInterface {
    name = 'clientEmail1669760634031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ClientPhoneNumber" ("phoneNumber" integer NOT NULL, "isMain" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_6e1c19b5443405237dc30f353f1" PRIMARY KEY ("phoneNumber"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ClientPhoneNumber"`);
    }

}
