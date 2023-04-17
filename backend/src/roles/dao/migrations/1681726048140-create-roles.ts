import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRoles1681726048140 implements MigrationInterface {
  name = 'CreateRoles1681726048140';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."roles_name_enum" AS ENUM('User', 'Admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" (
        "id" SERIAL NOT NULL,
        "name" "public"."roles_name_enum" NOT NULL DEFAULT 'User',
        "created_date" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
        )`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_roles_roles" (
        "users_id" integer NOT NULL, 
        "roles_id" integer NOT NULL, 
        CONSTRAINT "PK_27d0ca9155872fb087086b6a9f5" 
        PRIMARY KEY ("users_id", "roles_id")
        )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_178c6a2b971c18df6467eaf687" 
      ON "users_roles_roles" ("users_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_291889ab59fe7785020c96066e" 
      ON "users_roles_roles" ("roles_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_roles" 
      ADD CONSTRAINT "FK_178c6a2b971c18df6467eaf687a" 
      FOREIGN KEY ("users_id") REFERENCES "users"("id") 
      ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_roles" 
      ADD CONSTRAINT "FK_291889ab59fe7785020c96066e9" 
      FOREIGN KEY ("roles_id") REFERENCES "roles"("id") 
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_291889ab59fe7785020c96066e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_178c6a2b971c18df6467eaf687a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_291889ab59fe7785020c96066e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_178c6a2b971c18df6467eaf687"`,
    );
    await queryRunner.query(`DROP TABLE "users_roles_roles"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TYPE "public"."roles_name_enum"`);
  }
}
