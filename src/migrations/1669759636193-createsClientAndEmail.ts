import { MigrationInterface, QueryRunner } from "typeorm";

export class createsClientAndEmail1669759636193 implements MigrationInterface {
    name = 'createsClientAndEmail1669759636193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b79874c8d411b839b9ccc301972" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ClientEmail" ("email" character varying(256) NOT NULL, "isMain" boolean NOT NULL, CONSTRAINT "PK_38ca2cdef1eb8a203309b20f39b" PRIMARY KEY ("email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ClientEmail"`);
        await queryRunner.query(`DROP TABLE "Client"`);
    }

}
