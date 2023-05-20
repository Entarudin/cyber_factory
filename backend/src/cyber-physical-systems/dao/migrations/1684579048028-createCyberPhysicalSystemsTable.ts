import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCyberPhysicalSystemsTable1684579048028
  implements MigrationInterface
{
  name = 'CreateCyberPhysicalSystemsTable1684579048028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cyber_physical_systems" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3d7b2cb52139af7292e4bf09511" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_cyber_physical_systems_cyber_physical_systems" ("users_id" integer NOT NULL, "cyber_physical_systems_id" integer NOT NULL, CONSTRAINT "PK_6e11b43f4af72392f4fb7ded1dd" PRIMARY KEY ("users_id", "cyber_physical_systems_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c187d1b656f3040c1afb0b2039" ON "users_cyber_physical_systems_cyber_physical_systems" ("users_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3fc4e85ab3326d4e6aeb317cc1" ON "users_cyber_physical_systems_cyber_physical_systems" ("cyber_physical_systems_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_cyber_physical_systems_cyber_physical_systems" ADD CONSTRAINT "FK_c187d1b656f3040c1afb0b20392" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_cyber_physical_systems_cyber_physical_systems" ADD CONSTRAINT "FK_3fc4e85ab3326d4e6aeb317cc14" FOREIGN KEY ("cyber_physical_systems_id") REFERENCES "cyber_physical_systems"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_cyber_physical_systems_cyber_physical_systems" DROP CONSTRAINT "FK_3fc4e85ab3326d4e6aeb317cc14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_cyber_physical_systems_cyber_physical_systems" DROP CONSTRAINT "FK_c187d1b656f3040c1afb0b20392"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3fc4e85ab3326d4e6aeb317cc1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c187d1b656f3040c1afb0b2039"`,
    );
    await queryRunner.query(
      `DROP TABLE "users_cyber_physical_systems_cyber_physical_systems"`,
    );
    await queryRunner.query(`DROP TABLE "cyber_physical_systems"`);
  }
}
