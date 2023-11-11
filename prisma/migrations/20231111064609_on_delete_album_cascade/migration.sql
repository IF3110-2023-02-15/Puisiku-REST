-- DropForeignKey
ALTER TABLE "Poem" DROP CONSTRAINT "Poem_albumId_fkey";

-- AddForeignKey
ALTER TABLE "Poem" ADD CONSTRAINT "Poem_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;
