import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableHosts1689268450002 implements MigrationInterface {
  name = 'CreateTableHosts1689268450002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hosts" (
        "id" SERIAL NOT NULL, 
        "ip_address" character varying NOT NULL, 
        "mac_address" character varying NOT NULL, 
        "device_id" integer NOT NULL, 
        "created_date" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "UQ_405513c14f4f0503e2f27a5231c" 
        UNIQUE ("ip_address", "mac_address", "device_id"), 
        CONSTRAINT "PK_c4bcf0826e0e2847faee4da1746" 
        PRIMARY KEY ("id")
        )`,
    );
    await queryRunner.query(
      `ALTER TABLE "hosts" ADD CONSTRAINT "FK_8aa7e36f0fc0945eb7b370f8e55" 
      FOREIGN KEY ("device_id") REFERENCES "devices"("id") 
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hosts" DROP CONSTRAINT "FK_8aa7e36f0fc0945eb7b370f8e55"`,
    );
    await queryRunner.query(`DROP TABLE "hosts"`);
  }
}
