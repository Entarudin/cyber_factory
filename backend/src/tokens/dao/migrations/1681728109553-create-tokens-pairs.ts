import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTokensPairs1681728109553 implements MigrationInterface {
  name = 'CreateTokensPairs1681728109553';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tokens_pairs" (
        "id" SERIAL NOT NULL, 
        "access_token" character varying NOT NULL, 
        "refresh_token" character varying NOT NULL, 
        "user_id" integer NOT NULL, 
        "created_date" TIMESTAMP NOT NULL DEFAULT now(), 
        "userId" integer, 
        CONSTRAINT "PK_d027d53b0242a47adaa5a5a0c48" PRIMARY KEY ("id")
        )`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens_pairs" 
      ADD CONSTRAINT "FK_8ea65c7234e84e712f6e24d5dc0" 
      FOREIGN KEY ("userId") REFERENCES "users"("id") 
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens_pairs" DROP CONSTRAINT "FK_8ea65c7234e84e712f6e24d5dc0"`,
    );
    await queryRunner.query(`DROP TABLE "tokens_pairs"`);
  }
}
