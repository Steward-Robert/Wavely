/*
  Warnings:

  - You are about to drop the column `authorName` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "authorName";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "content" DROP NOT NULL;
