import { MigrationInterface, QueryRunner } from "typeorm";

export class fixEmailColumnName1669762248031 implements MigrationInterface {
    name = 'fixEmailColumnName1669762248031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ClientEmail" RENAME COLUMN "email" TO "emailAddress"`);
        await queryRunner.query(`ALTER TABLE "ClientEmail" RENAME CONSTRAINT "PK_38ca2cdef1eb8a203309b20f39b" TO "PK_26539c3f8fbdd9f3d328bbd0d92"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ClientEmail" RENAME CONSTRAINT "PK_26539c3f8fbdd9f3d328bbd0d92" TO "PK_38ca2cdef1eb8a203309b20f39b"`);
        await queryRunner.query(`ALTER TABLE "ClientEmail" RENAME COLUMN "emailAddress" TO "email"`);
    }

}
