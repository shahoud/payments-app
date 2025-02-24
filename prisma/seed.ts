import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Seed Currencies
  const currencies = [
    { code: "USD", name: "United States Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  ];

  for (const currency of currencies) {
    await prisma.currency.create({ data: currency });
  }

  // Seed Payment Categories
  const categories = [
    { name: "Groceries", code: "GROC" },
    { name: "Rent", code: "RENT" },
    { name: "Healthcare", code: "HLTH" },
    { name: "Transportation", code: "TRNS" },
    { name: "Entertainment", code: "ETRN" },
  ];

  for (const category of categories) {
    await prisma.paymentCategory.create({ data: category });
  }

  // Seed a Test User
  //   const user = await prisma.user.upsert({
  //     where: { email: "test@example.com" },
  //     update: {},
  //     create: {
  //       email: "test@example.com",
  //       name: "Test User",
  //       userSettings: {
  //         create: {},
  //       },
  //     },
  //   });

  // Seed Payments for the Test User
  //   const paymentData = [
  //     {
  //       amount: 100.0,
  //       reason: "Grocery shopping",
  //       paidAt: new Date(),
  //       userId: user.id,
  //       categoryId: (
  //         await prisma.paymentCategory.findFirst({ where: { name: "Groceries" } })
  //       )?.id,
  //       currencyId: (await prisma.currency.findFirst({ where: { code: "USD" } }))
  //         ?.id,
  //     },
  //     {
  //       amount: 1200.0,
  //       reason: "Monthly Rent",
  //       paidAt: new Date(),
  //       userId: user.id,
  //       categoryId: (
  //         await prisma.paymentCategory.findFirst({ where: { name: "Rent" } })
  //       )?.id,
  //       currencyId: (await prisma.currency.findFirst({ where: { code: "USD" } }))
  //         ?.id,
  //     },
  //   ];

  //   for (const payment of paymentData) {
  //     await prisma.payment.create({ data: payment });
  //   }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
