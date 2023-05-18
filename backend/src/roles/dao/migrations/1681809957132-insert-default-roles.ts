import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDefaultRoles1681809957132 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "roles" ("created_date", "name") VALUES (DEFAULT, 'User')`,
    );

    await queryRunner.query(
      `INSERT INTO "roles" ("created_date", "name") VALUES (DEFAULT, 'Admin')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM roles`);
  }
}
