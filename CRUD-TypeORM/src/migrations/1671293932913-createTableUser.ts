import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableUser1671293932913 implements MigrationInterface {
    name = 'createTableUser1671293932913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "deletedAt"`);
    }

}
