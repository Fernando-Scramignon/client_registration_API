import { MigrationInterface, QueryRunner } from "typeorm";

export class alterPasswordMaxLength1669899457382 implements MigrationInterface {
    name = 'alterPasswordMaxLength1669899457382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ClientEmail" DROP CONSTRAINT "FK_65d96818b44c4f5a88863476e65"`);
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" DROP CONSTRAINT "FK_990f30fae177a749d7044d5f4ec"`);
        await queryRunner.query(`ALTER TABLE "Contact" DROP CONSTRAINT "FK_5fd03e19b188ee73637086b3657"`);
        await queryRunner.query(`ALTER TABLE "Client" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "password" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" ADD CONSTRAINT "FK_990f30fae177a749d7044d5f4ec" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ClientEmail" ADD CONSTRAINT "FK_65d96818b44c4f5a88863476e65" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Contact" ADD CONSTRAINT "FK_5fd03e19b188ee73637086b3657" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Contact" DROP CONSTRAINT "FK_5fd03e19b188ee73637086b3657"`);
        await queryRunner.query(`ALTER TABLE "ClientEmail" DROP CONSTRAINT "FK_65d96818b44c4f5a88863476e65"`);
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" DROP CONSTRAINT "FK_990f30fae177a749d7044d5f4ec"`);
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "password" character varying(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Client" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Contact" ADD CONSTRAINT "FK_5fd03e19b188ee73637086b3657" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" ADD CONSTRAINT "FK_990f30fae177a749d7044d5f4ec" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ClientEmail" ADD CONSTRAINT "FK_65d96818b44c4f5a88863476e65" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
