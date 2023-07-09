import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableApplications1686824252172
  implements MigrationInterface
{
  name = 'CreateTableApplications1686824252172';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "applications" (
        "id" SERIAL NOT NULL,
         "name" character varying NOT NULL, 
         "version" character varying NOT NULL, 
         "description" character varying NOT NULL, 
         "device_id" integer NOT NULL, 
         "created_date" TIMESTAMP NOT NULL DEFAULT now(), 
         CONSTRAINT "UQ_b0b722505db7e1cc7a1d0daee69" 
         UNIQUE ("name", "version", "device_id"), 
         CONSTRAINT "PK_938c0a27255637bde919591888f" 
         PRIMARY KEY ("id")
         )`,
    );
    await queryRunner.query(
      `ALTER TABLE "applications" 
      ADD CONSTRAINT "FK_b940e488fe6036211f51c68beb4" 
      FOREIGN KEY ("device_id") REFERENCES "devices"("id") 
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "applications" DROP CONSTRAINT "FK_b940e488fe6036211f51c68beb4"`,
    );
    await queryRunner.query(`DROP TABLE "applications"`);
  }
}
