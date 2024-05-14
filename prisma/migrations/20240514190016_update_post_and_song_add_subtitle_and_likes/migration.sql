/*
  Warnings:

  - Added the required column `likes` to the `songs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "subtitle" TEXT;

-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "likes" INTEGER NOT NULL;
