import { MigrationInterface, QueryRunner } from "typeorm";

export class ContactEmailEntity1669761422565 implements MigrationInterface {
    name = 'ContactEmailEntity1669761422565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ContactEmail" ("emailAddress" character varying(256) NOT NULL, "isMain" boolean NOT NULL, CONSTRAINT "PK_2d40d0734be220d83ca02b92c88" PRIMARY KEY ("emailAddress"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ContactEmail"`);
    }

}
