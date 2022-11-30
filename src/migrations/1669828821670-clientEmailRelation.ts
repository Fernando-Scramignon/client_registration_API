import { MigrationInterface, QueryRunner } from "typeorm";

export class clientEmailRelation1669828821670 implements MigrationInterface {
    name = 'clientEmailRelation1669828821670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ClientEmail" ADD "clientId" uuid`);
        await queryRunner.query(`ALTER TABLE "ClientEmail" ADD CONSTRAINT "FK_65d96818b44c4f5a88863476e65" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ClientEmail" DROP CONSTRAINT "FK_65d96818b44c4f5a88863476e65"`);
        await queryRunner.query(`ALTER TABLE "ClientEmail" DROP COLUMN "clientId"`);
    }

}
