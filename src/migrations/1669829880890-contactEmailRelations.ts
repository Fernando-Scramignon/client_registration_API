import { MigrationInterface, QueryRunner } from "typeorm";

export class contactEmailRelations1669829880890 implements MigrationInterface {
    name = 'contactEmailRelations1669829880890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ContactEmail" ADD "contactId" uuid`);
        await queryRunner.query(`ALTER TABLE "ContactEmail" ADD CONSTRAINT "FK_25c3a9443b2ccd5c5080ee73847" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ContactEmail" DROP CONSTRAINT "FK_25c3a9443b2ccd5c5080ee73847"`);
        await queryRunner.query(`ALTER TABLE "ContactEmail" DROP COLUMN "contactId"`);
    }

}
