import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateFieldsInTableMonitorResources1689162761902
  implements MigrationInterface
{
  name = 'UpdateFieldsInTableMonitorResources1689162761902';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" DROP COLUMN "ram_load"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" DROP COLUMN "count_transmitted_udp_packets"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" DROP COLUMN "count_transmitted_tcp_packets"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" DROP COLUMN "count_transmitted_arp_packets"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" DROP COLUMN "disk_load"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" ADD "cpu_usage" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" ADD "cpu_avg_load" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" ADD "ram_usage" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" ADD "swap_usage" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" ADD "disk_usage" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" ADD "uptime" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" DROP COLUMN "cpu_load"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" ADD "cpu_load" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" DROP COLUMN "cpu_temperature"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" ADD "cpu_temperature" numeric NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" DROP COLUMN "cpu_temperature"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" ADD "cpu_temperature" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" DROP COLUMN "cpu_load"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" ADD "cpu_load" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" DROP COLUMN "uptime"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" DROP COLUMN "disk_usage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" DROP COLUMN "swap_usage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" DROP COLUMN "ram_usage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" DROP COLUMN "cpu_avg_load"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" DROP COLUMN "cpu_usage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" ADD "disk_load" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" ADD "count_transmitted_arp_packets" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" ADD "count_transmitted_tcp_packets" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" ADD "count_transmitted_udp_packets" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitor_resources" ADD "ram_load" integer NOT NULL`,
    );
  }
}
