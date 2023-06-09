import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetUniqueFieldMacAddressInDevicesTable1686215465600
  implements MigrationInterface
{
  name = 'SetUniqueFieldMacAddressInDevicesTable1686215465600';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "devices" ADD CONSTRAINT "UQ_c524778ebd110a3f7d3c34f3b93" UNIQUE ("mac_address")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "devices" DROP CONSTRAINT "UQ_c524778ebd110a3f7d3c34f3b93"`,
    );
  }
}
