/*
  Warnings:

  - You are about to drop the column `likes` on the `songs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "songs" DROP COLUMN "likes";

-- CreateTable
CREATE TABLE "user_songs" (
    "id" SERIAL NOT NULL,
    "songId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "user_songs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_songs" ADD CONSTRAINT "user_songs_songId_fkey" FOREIGN KEY ("songId") REFERENCES "songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_songs" ADD CONSTRAINT "user_songs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
