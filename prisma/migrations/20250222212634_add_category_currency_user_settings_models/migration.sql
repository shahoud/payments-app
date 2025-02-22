/*
  Warnings:

  - Added the required column `categoryId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currencyId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "currencyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PaymentCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CurrencyToUserSettings" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CurrencyToUserSettings_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PaymentCategoryToUserSettings" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PaymentCategoryToUserSettings_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentCategory_name_key" ON "PaymentCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- CreateIndex
CREATE INDEX "_CurrencyToUserSettings_B_index" ON "_CurrencyToUserSettings"("B");

-- CreateIndex
CREATE INDEX "_PaymentCategoryToUserSettings_B_index" ON "_PaymentCategoryToUserSettings"("B");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "PaymentCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrencyToUserSettings" ADD CONSTRAINT "_CurrencyToUserSettings_A_fkey" FOREIGN KEY ("A") REFERENCES "Currency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CurrencyToUserSettings" ADD CONSTRAINT "_CurrencyToUserSettings_B_fkey" FOREIGN KEY ("B") REFERENCES "UserSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentCategoryToUserSettings" ADD CONSTRAINT "_PaymentCategoryToUserSettings_A_fkey" FOREIGN KEY ("A") REFERENCES "PaymentCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentCategoryToUserSettings" ADD CONSTRAINT "_PaymentCategoryToUserSettings_B_fkey" FOREIGN KEY ("B") REFERENCES "UserSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
