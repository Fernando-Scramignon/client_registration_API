import { MigrationInterface, QueryRunner } from "typeorm";

export class contactEmailRemovesUnique1670088438202 implements MigrationInterface {
    name = 'contactEmailRemovesUnique1670088438202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ContactEmail" DROP CONSTRAINT "PK_93342bbb4be95340cd452922b3c"`);
        await queryRunner.query(`ALTER TABLE "ContactEmail" ADD CONSTRAINT "PK_871cdfe2a28149817a78dbf2ab1" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ContactEmail" DROP CONSTRAINT "PK_871cdfe2a28149817a78dbf2ab1"`);
        await queryRunner.query(`ALTER TABLE "ContactEmail" ADD CONSTRAINT "PK_93342bbb4be95340cd452922b3c" PRIMARY KEY ("emailAddress", "id")`);
    }

}
