import { MigrationInterface, QueryRunner } from "typeorm";

export class addsUsernamePassword1669835414204 implements MigrationInterface {
    name = 'addsUsernamePassword1669835414204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Client" ADD "username" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Client" ADD CONSTRAINT "UQ_ab69b18a378cb26418f492b7ee0" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "password" character varying(32) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "Client" DROP CONSTRAINT "UQ_ab69b18a378cb26418f492b7ee0"`);
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "username"`);
    }

}
