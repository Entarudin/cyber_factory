import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCountPackets1689237403725
  implements MigrationInterface
{
  name = 'CreateTableCountPackets1689237403725';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "count_packets" (
        "id" SERIAL NOT NULL, 
        "timing" integer NOT NULL, 
        "all_proto_count" integer NOT NULL, 
        "tcp_count" integer NOT NULL, 
        "udp_count" integer NOT NULL, 
        "http_request_count" integer NOT NULL, 
        "http_response_count" integer NOT NULL, 
        "arp_count" integer NOT NULL, 
        "icmp_count" integer NOT NULL, 
        "modbus01_request_count" integer NOT NULL, 
        "modbus02_request_count" integer NOT NULL, 
        "modbus03_request_count" integer NOT NULL, 
        "modbus04_request_count" integer NOT NULL, 
        "modbus05_request_count" integer NOT NULL, 
        "modbus06_request_count" integer NOT NULL, 
        "modbus15_request_count" integer NOT NULL, 
        "modbus16_request_count" integer NOT NULL, 
        "modbus01_response_count" integer NOT NULL, 
        "modbus02_response_count" integer NOT NULL, 
        "modbus03_response_count" integer NOT NULL, 
        "modbus04_response_count" integer NOT NULL, 
        "modbus05_response_count" integer NOT NULL, 
        "modbus06_response_count" integer NOT NULL, 
        "modbus15_response_count" integer NOT NULL, 
        "modbus16_response_count" integer NOT NULL, 
        "device_id" integer NOT NULL, 
        "created_date" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_e01d1f3e7d9213ff4c96b91212a"
         PRIMARY KEY ("id")
         )`,
    );
    await queryRunner.query(
      `ALTER TABLE "count_packets" ADD CONSTRAINT "FK_e0d413be7e0cff5f8ef3531b3a8" 
      FOREIGN KEY ("device_id") REFERENCES "devices"("id")
       ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "count_packets" DROP CONSTRAINT "FK_e0d413be7e0cff5f8ef3531b3a8"`,
    );
    await queryRunner.query(`DROP TABLE "count_packets"`);
  }
}
