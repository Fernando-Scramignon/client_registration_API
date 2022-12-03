import { MigrationInterface, QueryRunner } from "typeorm";

export class clientPyhonRelation1669828269675 implements MigrationInterface {
    name = 'clientPyhonRelation1669828269675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" ADD "clientId" uuid`);
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" ADD CONSTRAINT "FK_990f30fae177a749d7044d5f4ec" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" DROP CONSTRAINT "FK_990f30fae177a749d7044d5f4ec"`);
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" DROP COLUMN "clientId"`);
    }

}
