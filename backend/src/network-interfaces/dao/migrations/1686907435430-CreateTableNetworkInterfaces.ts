import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableNetworkInterfaces1686907435430
  implements MigrationInterface
{
  name = 'CreateTableNetworkInterfaces1686907435430';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "network_interfaces" (
        "id" SERIAL NOT NULL, 
        "name" character varying NOT NULL, 
        "ip_address" character varying NOT NULL, 
        "device_id" integer NOT NULL, 
        "created_date" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "UQ_884c451715628cc292355314acb" 
        UNIQUE ("name", "ip_address", "device_id"), 
        CONSTRAINT "PK_6fe8238659b6714aaf0e01ec7de" 
        PRIMARY KEY ("id")
        )`,
    );
    await queryRunner.query(
      `ALTER TABLE "network_interfaces" 
      ADD CONSTRAINT "FK_21c7cd3a26e61718ff3a8ac8232" 
      FOREIGN KEY ("device_id") 
      REFERENCES "devices"("id") 
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "network_interfaces" 
      DROP CONSTRAINT "FK_21c7cd3a26e61718ff3a8ac8232"`,
    );
    await queryRunner.query(`DROP TABLE "network_interfaces"`);
  }
}
