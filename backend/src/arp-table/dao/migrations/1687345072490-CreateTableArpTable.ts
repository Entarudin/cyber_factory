import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableArpTable1687345072490 implements MigrationInterface {
  name = 'CreateTableArpTable1687345072490';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arp_table" (
        "id" SERIAL NOT NULL, 
        "ip_address" character varying NOT NULL, 
        "mac_address" character varying NOT NULL, 
        "device_id" integer NOT NULL, 
        "created_date" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "UQ_909be8808eccbdca58debf5069b" 
        UNIQUE ("ip_address", "mac_address", "device_id"), 
        CONSTRAINT "PK_b68d012729ec046f50ea3a7121c" 
        PRIMARY KEY ("id")
        )`,
    );
    await queryRunner.query(
      `ALTER TABLE "arp_table" 
      ADD CONSTRAINT "FK_4aec63f24af895d43366d60880e" 
      FOREIGN KEY ("device_id") REFERENCES "devices"("id") 
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arp_table" 
      DROP CONSTRAINT "FK_4aec63f24af895d43366d60880e"`,
    );
    await queryRunner.query(`DROP TABLE "arp_table"`);
  }
}
