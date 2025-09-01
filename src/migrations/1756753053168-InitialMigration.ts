import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756753053168 implements MigrationInterface {
    name = 'InitialMigration1756753053168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quote" ("id" SERIAL NOT NULL, "author" character varying NOT NULL, "quote" character varying NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_b772d4cb09e587c8c72a78d2439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_c8921e59393636e1dcfb537e052" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_c8921e59393636e1dcfb537e052"`);
        await queryRunner.query(`DROP TABLE "quote"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
