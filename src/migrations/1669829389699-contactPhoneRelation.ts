import { MigrationInterface, QueryRunner } from "typeorm";

export class contactPhoneRelation1669829389699 implements MigrationInterface {
    name = 'contactPhoneRelation1669829389699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" ADD "contactId" uuid`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" ADD CONSTRAINT "FK_43317552c6e00af786656ee9259" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" DROP CONSTRAINT "FK_43317552c6e00af786656ee9259"`);
        await queryRunner.query(`ALTER TABLE "ContactPhoneNumber" DROP COLUMN "contactId"`);
    }

}
