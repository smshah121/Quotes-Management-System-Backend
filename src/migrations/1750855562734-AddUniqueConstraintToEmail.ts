import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraintToEmail1750855562734 implements MigrationInterface {
    name = 'AddUniqueConstraintToEmail1750855562734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "quote" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_c8921e59393636e1dcfb537e052" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_c8921e59393636e1dcfb537e052"`);
        await queryRunner.query(`ALTER TABLE "quote" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_quote_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
