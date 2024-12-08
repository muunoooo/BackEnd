-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('Pending', 'Canceled', 'Paid');

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "stasus" "StatusOrder" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
