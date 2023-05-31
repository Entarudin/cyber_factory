import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteFieldUserIdOnCamelCaseInTokensPairsTable1685547390550
  implements MigrationInterface
{
  name = 'DeleteFieldUserIdOnCamelCaseInTokensPairsTable1685547390550';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens_pairs" 
      DROP CONSTRAINT "FK_8ea65c7234e84e712f6e24d5dc0"`,
    );
    await queryRunner.query(`ALTER TABLE "tokens_pairs" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "tokens_pairs" 
      ADD CONSTRAINT "FK_2561dca0fc1e44808f05f45bc77" 
      FOREIGN KEY ("user_id") REFERENCES 
      "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens_pairs" DROP CONSTRAINT "FK_2561dca0fc1e44808f05f45bc77"`,
    );
    await queryRunner.query(`
    ALTER TABLE "tokens_pairs" 
    ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "tokens_pairs" 
      ADD CONSTRAINT "FK_8ea65c7234e84e712f6e24d5dc0" 
      FOREIGN KEY ("userId") REFERENCES "users"("id") 
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
