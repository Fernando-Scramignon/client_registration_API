import { MigrationInterface, QueryRunner } from "typeorm";

export class phoneNumbersToString1669999854919 implements MigrationInterface {
    name = 'phoneNumbersToString1669999854919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" DROP CONSTRAINT "PK_6e1c19b5443405237dc30f353f1"`);
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" ADD "phoneNumber" character varying(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" ADD CONSTRAINT "PK_6e1c19b5443405237dc30f353f1" PRIMARY KEY ("phoneNumber")`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" DROP CONSTRAINT "PK_9e9ec37a4bff0990af15004aaa6"`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" ADD "phoneNumber" character varying(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" ADD CONSTRAINT "PK_9e9ec37a4bff0990af15004aaa6" PRIMARY KEY ("phoneNumber")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" DROP CONSTRAINT "PK_9e9ec37a4bff0990af15004aaa6"`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" ADD "phoneNumber" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" ADD CONSTRAINT "PK_9e9ec37a4bff0990af15004aaa6" PRIMARY KEY ("phoneNumber")`);
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" DROP CONSTRAINT "PK_6e1c19b5443405237dc30f353f1"`);
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" ADD "phoneNumber" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ClientPhoneNumber" ADD CONSTRAINT "PK_6e1c19b5443405237dc30f353f1" PRIMARY KEY ("phoneNumber")`);
    }

}
