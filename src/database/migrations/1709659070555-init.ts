import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1709659070555 implements MigrationInterface {
    name = 'Init1709659070555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime NULL, \`content\` varchar(255) NOT NULL, \`userId\` int NULL, \`conversationId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`conversation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime NULL, \`title\` varchar(255) NOT NULL, \`userId\` int NULL, \`creatorId\` int NULL, UNIQUE INDEX \`REL_e574e8ccf4f31b92ad2d982604\` (\`creatorId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`team\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime NULL, \`name\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`match\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime NULL, \`name\` varchar(255) NOT NULL, \`poster\` varchar(255) NOT NULL, \`startTime\` datetime NOT NULL, \`address\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`stand\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`maxSlot\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`slot\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime NULL, \`name\` varchar(255) NOT NULL, \`available\` tinyint NOT NULL, \`onwerId\` int NULL, \`standId\` int NULL, UNIQUE INDEX \`REL_86ed7be201f213c83a635d8f6c\` (\`standId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime NULL, \`username\` varchar(255) NOT NULL, \`firstName\` varchar(255) NULL, \`middleName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`avatar\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 0, \`role\` enum ('user', 'admin') NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`userAccess\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime NULL, \`token\` varchar(255) NULL, \`deviceId\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime NULL, \`itemId\` int NOT NULL, \`price\` decimal(10,2) NOT NULL, \`discount\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_446251f8ceb2132af01b68eb593\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_7cf4a4df1f2627f72bf6231635f\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversation\` ADD CONSTRAINT \`FK_c308b1cd542522bb66430fa860a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversation\` ADD CONSTRAINT \`FK_e574e8ccf4f31b92ad2d9826045\` FOREIGN KEY (\`creatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`slot\` ADD CONSTRAINT \`FK_e11a3e367a9047429d20c7b94ce\` FOREIGN KEY (\`onwerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`slot\` ADD CONSTRAINT \`FK_86ed7be201f213c83a635d8f6cb\` FOREIGN KEY (\`standId\`) REFERENCES \`stand\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`userAccess\` ADD CONSTRAINT \`FK_87625cac32559175aaa5a0e3f00\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`userAccess\` DROP FOREIGN KEY \`FK_87625cac32559175aaa5a0e3f00\``);
        await queryRunner.query(`ALTER TABLE \`slot\` DROP FOREIGN KEY \`FK_86ed7be201f213c83a635d8f6cb\``);
        await queryRunner.query(`ALTER TABLE \`slot\` DROP FOREIGN KEY \`FK_e11a3e367a9047429d20c7b94ce\``);
        await queryRunner.query(`ALTER TABLE \`conversation\` DROP FOREIGN KEY \`FK_e574e8ccf4f31b92ad2d9826045\``);
        await queryRunner.query(`ALTER TABLE \`conversation\` DROP FOREIGN KEY \`FK_c308b1cd542522bb66430fa860a\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_7cf4a4df1f2627f72bf6231635f\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_446251f8ceb2132af01b68eb593\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`userAccess\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_86ed7be201f213c83a635d8f6c\` ON \`slot\``);
        await queryRunner.query(`DROP TABLE \`slot\``);
        await queryRunner.query(`DROP TABLE \`stand\``);
        await queryRunner.query(`DROP TABLE \`match\``);
        await queryRunner.query(`DROP TABLE \`team\``);
        await queryRunner.query(`DROP INDEX \`REL_e574e8ccf4f31b92ad2d982604\` ON \`conversation\``);
        await queryRunner.query(`DROP TABLE \`conversation\``);
        await queryRunner.query(`DROP TABLE \`message\``);
    }

}
