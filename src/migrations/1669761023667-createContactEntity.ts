import { MigrationInterface, QueryRunner } from "typeorm";

export class createContactEntity1669761023667 implements MigrationInterface {
    name = 'createContactEntity1669761023667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, CONSTRAINT "PK_9d0ea6f3557586cef53e954d13a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Contact"`);
    }

}
