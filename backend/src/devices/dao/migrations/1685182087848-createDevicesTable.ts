import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDevicesTable1685182087848 implements MigrationInterface {
  name = 'CreateDevicesTable1685182087848';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "devices" (
        "id" SERIAL NOT NULL, 
        "name" character varying NOT NULL,
        "ip_address" character varying NOT NULL,
        "mac_address" character varying NOT NULL, 
        "network_interface" character varying NOT NULL, 
        "cyber_physical_system_id" integer NOT NULL,
        "created_date" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id")
        )`,
    );
    await queryRunner.query(
      `ALTER TABLE "devices" 
        ADD CONSTRAINT "FK_5c5d96b61fca711f2d6a914eeb4" 
        FOREIGN KEY ("cyber_physical_system_id") 
        REFERENCES "cyber_physical_systems"("id") 
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "devices" DROP CONSTRAINT "FK_5c5d96b61fca711f2d6a914eeb4"`,
    );
    await queryRunner.query(`DROP TABLE "devices"`);
  }
}
