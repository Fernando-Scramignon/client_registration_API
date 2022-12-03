import { MigrationInterface, QueryRunner } from "typeorm";

export class fixContactInfoIds1670037792434 implements MigrationInterface {
    name = 'fixContactInfoIds1670037792434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" DROP CONSTRAINT "PK_9e9ec37a4bff0990af15004aaa6"`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" ADD CONSTRAINT "PK_20a36d0f8bf0150efac7a47d705" PRIMARY KEY ("phoneNumber", "id")`);
        await queryRunner.query(`ALTER TABLE "ContactEmail" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ContactEmail" DROP CONSTRAINT "PK_2d40d0734be220d83ca02b92c88"`);
        await queryRunner.query(`ALTER TABLE "ContactEmail" ADD CONSTRAINT "PK_93342bbb4be95340cd452922b3c" PRIMARY KEY ("emailAddress", "id")`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" DROP CONSTRAINT "PK_20a36d0f8bf0150efac7a47d705"`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" ADD CONSTRAINT "PK_c71b7b7eb4c9cb050de5f742102" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" DROP CONSTRAINT "PK_c71b7b7eb4c9cb050de5f742102"`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" ADD CONSTRAINT "PK_20a36d0f8bf0150efac7a47d705" PRIMARY KEY ("phoneNumber", "id")`);
        await queryRunner.query(`ALTER TABLE "ContactEmail" DROP CONSTRAINT "PK_93342bbb4be95340cd452922b3c"`);
        await queryRunner.query(`ALTER TABLE "ContactEmail" ADD CONSTRAINT "PK_2d40d0734be220d83ca02b92c88" PRIMARY KEY ("emailAddress")`);
        await queryRunner.query(`ALTER TABLE "ContactEmail" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" DROP CONSTRAINT "PK_20a36d0f8bf0150efac7a47d705"`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" ADD CONSTRAINT "PK_9e9ec37a4bff0990af15004aaa6" PRIMARY KEY ("phoneNumber")`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" DROP COLUMN "id"`);
    }

}
