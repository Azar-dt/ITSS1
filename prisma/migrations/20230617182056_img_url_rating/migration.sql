/*
  Warnings:

  - Added the required column `imgUrl` to the `Bike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Bike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Store_name_key";

-- AlterTable
ALTER TABLE "Bike" ADD COLUMN     "imgUrl" TEXT NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "imgUrl" TEXT NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;
