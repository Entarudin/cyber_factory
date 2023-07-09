import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSystemServices1686578839201
  implements MigrationInterface
{
  name = 'CreateTableSystemServices1686578839201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "system_services" (
        "id" SERIAL NOT NULL, 
        "name" character varying NOT NULL, 
        "status" character varying NOT NULL, 
        "device_id" integer NOT NULL, 
        "created_date" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "UQ_8059238a614e79661a8cf8d270e" 
        UNIQUE ("name", "status", "device_id"), 
        CONSTRAINT "PK_89fed40438c515eedf7ff8f3b2b" 
        PRIMARY KEY ("id")
        )`,
    );
    await queryRunner.query(
      `ALTER TABLE "system_services" 
      ADD CONSTRAINT "FK_552d87a3cb5b636a9f42e1ee7b9" 
      FOREIGN KEY ("device_id") REFERENCES "devices"("id") 
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "system_services" DROP CONSTRAINT "FK_552d87a3cb5b636a9f42e1ee7b9"`,
    );
    await queryRunner.query(`DROP TABLE "system_services"`);
  }
}
