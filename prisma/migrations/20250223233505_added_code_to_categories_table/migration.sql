/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `PaymentCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `PaymentCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentCategory" ADD COLUMN     "code" VARCHAR(4) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PaymentCategory_code_key" ON "PaymentCategory"("code");
