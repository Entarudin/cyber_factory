import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableStructuralFunctionalCharacteristics1686246420963
  implements MigrationInterface
{
  name = 'CreateTableStructuralFunctionalCharacteristics1686246420963';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "structural_functional_characteristics" (
        "id" SERIAL NOT NULL, 
        "name" character varying NOT NULL, 
        "version" character varying NOT NULL, 
        "device_id" integer NOT NULL, 
        "created_date" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "UQ_b33626354d587d9bf20902b145c" UNIQUE ("name", "version"), 
        CONSTRAINT "PK_4804baad4ce57194f4b264ef2ac" PRIMARY KEY ("id")
        )`,
    );
    await queryRunner.query(
      `ALTER TABLE "structural_functional_characteristics" 
      ADD CONSTRAINT "FK_918cafea278aa2f32bbfc74fd1f" 
      FOREIGN KEY ("device_id") REFERENCES "devices"("id") 
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "structural_functional_characteristics" 
      DROP CONSTRAINT "FK_918cafea278aa2f32bbfc74fd1f"`,
    );
    await queryRunner.query(
      `DROP TABLE "structural_functional_characteristics"`,
    );
  }
}
