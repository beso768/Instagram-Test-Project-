const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class initialSchema1667459987233 {
  name = 'initialSchema1667459987233';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY  AUTOINCREMENT  NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "username" varchar NOT NULL, "profile_pic_url" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" integer PRIMARY KEY  AUTOINCREMENT  NOT NULL, "name" varchar NOT NULL, "media_count" integer NOT NULL DEFAULT (0), "userId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_tag" ("id" integer PRIMARY KEY  AUTOINCREMENT  NOT NULL, "name" varchar NOT NULL, "media_count" integer NOT NULL DEFAULT (0), "userId" integer, CONSTRAINT "FK_d0dc39ff83e384b4a097f47d3f5" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_tag"("id", "name", "media_count", "userId") SELECT "id", "name", "media_count", "userId" FROM "tag"`,
    );
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`ALTER TABLE "temporary_tag" RENAME TO "tag"`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "tag" RENAME TO "temporary_tag"`);
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" integer PRIMARY KEY  AUTOINCREMENT  NOT NULL, "name" varchar NOT NULL, "media_count" integer NOT NULL DEFAULT (0), "userId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "tag"("id", "name", "media_count", "userId") SELECT "id", "name", "media_count", "userId" FROM "temporary_tag"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_tag"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "report"`);
  }
};
