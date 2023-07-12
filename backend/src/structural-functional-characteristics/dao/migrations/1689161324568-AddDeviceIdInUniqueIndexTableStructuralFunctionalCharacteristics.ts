import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeviceIdInUniqueIndexTableStructuralFunctionalCharacteristics1689161324568
  implements MigrationInterface
{
  name =
    'AddDeviceIdInUniqueIndexTableStructuralFunctionalCharacteristics1689161324568';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "structural_functional_characteristics" 
      DROP CONSTRAINT "UQ_b33626354d587d9bf20902b145c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "structural_functional_characteristics"
       ADD CONSTRAINT "UQ_e49e86bbfb5bc6a58e8dd6c474c" 
       UNIQUE ("name", "version", "device_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "structural_functional_characteristics" 
      DROP CONSTRAINT "UQ_e49e86bbfb5bc6a58e8dd6c474c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "structural_functional_characteristics" 
      ADD CONSTRAINT "UQ_b33626354d587d9bf20902b145c"
       UNIQUE ("name", "version")`,
    );
  }
}
