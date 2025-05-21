import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuoteTable1746537992066 implements MigrationInterface {
    name = 'CreateQuoteTable1746537992066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quote" ("id" SERIAL NOT NULL, "author" character varying NOT NULL, "quote" character varying NOT NULL, CONSTRAINT "PK_b772d4cb09e587c8c72a78d2439" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "quote"`);
    }

}
