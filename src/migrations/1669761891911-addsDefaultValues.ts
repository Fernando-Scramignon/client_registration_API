import { MigrationInterface, QueryRunner } from "typeorm";

export class addsDefaultValues1669761891911 implements MigrationInterface {
    name = 'addsDefaultValues1669761891911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ClientEmail" ALTER COLUMN "isMain" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "ContactEmail" ALTER COLUMN "isMain" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ContactEmail" ALTER COLUMN "isMain" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ClientEmail" ALTER COLUMN "isMain" DROP DEFAULT`);
    }

}
