/*
  Warnings:

  - You are about to drop the column `stasus` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "stasus",
ADD COLUMN     "status" "StatusOrder" NOT NULL DEFAULT 'Pending';
