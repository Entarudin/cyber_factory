import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableMonitorResources1687262109347
  implements MigrationInterface
{
  name = 'CreateTableMonitorResources1687262109347';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "monitor_resources" (
        "id" SERIAL NOT NULL, 
        "cpu_load" integer NOT NULL, 
        "ram_load" integer NOT NULL, 
        "cpu_temperature" integer NOT NULL, 
        "count_transmitted_udp_packets" integer NOT NULL, 
        "count_transmitted_tcp_packets" integer NOT NULL, 
        "count_transmitted_arp_packets" integer NOT NULL, 
        "disk_load" integer NOT NULL, 
        "device_id" integer NOT NULL, 
        "created_date" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_024b6c6b2e4b4e4f6d9554590cf" 
        PRIMARY KEY ("id")
        )`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" 
      ADD CONSTRAINT "FK_130e66c5b4b52af6b53a782bb2e" 
      FOREIGN KEY ("device_id") REFERENCES "devices"("id") 
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" 
      DROP CONSTRAINT "FK_130e66c5b4b52af6b53a782bb2e"`,
    );
    await queryRunner.query(`DROP TABLE "monitor_resources"`);
  }
}
