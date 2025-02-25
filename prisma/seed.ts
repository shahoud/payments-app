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
    { name: "Personal Care", code: "PCAR" },
    { name: "Bills & Utilities", code: "BILL" },
    { name: "Health & Fitness", code: "HFIT" },
    { name: "Restaurants & Dining", code: "REST" },
    { name: "Auto & Transport", code: "AUTO" },
    { name: "Education", code: "EDUC" },
    { name: "Shopping", code: "SHOP" },
    { name: "Travel", code: "TRVL" },
    { name: "Entertainment", code: "ENTR" },
    { name: "Electronics", code: "ELEC" },
    { name: "Transportation", code: "TRNS" },
    { name: "Utilities", code: "UTIL" },
  ];

  for (const category of categories) {
    await prisma.paymentCategory.create({ data: category });
  }

  // Get a Test User
  const user = await prisma.user.findFirst({
    where: { email: "eng.shahoud@gmail.com" },
  });

  // Seed Payments for the Test User
  const paymentData = [
    {
      amount: 1200.0,
      reason: "Flight ticket",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Travel" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 75.0,
      reason: "Haircut",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Personal Care" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 200.0,
      reason: "Electricity bill",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Bills & Utilities" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 500.0,
      reason: "Gym equipment",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Health & Fitness" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 55.0,
      reason: "Fast food meal",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Restaurants & Dining" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 140.0,
      reason: "Gas bill",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Bills & Utilities" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 250.0,
      reason: "Concert ticket",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Entertainment" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 95.0,
      reason: "Laundry service",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Personal Care" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 600.0,
      reason: "Mobile phone repair",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Electronics" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 80.0,
      reason: "Taxi fare",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Transportation" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 120.5,
      reason: "Grocery shopping",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Groceries" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 950.0,
      reason: "Monthly Rent",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Rent" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 40.0,
      reason: "Gas refill",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Utilities" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 200.0,
      reason: "Gym membership",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Health & Fitness" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 80.0,
      reason: "Internet bill",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Bills & Utilities" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 150.0,
      reason: "Dinner with family",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Restaurants & Dining" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 30.0,
      reason: "Coffee & snacks",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Restaurants & Dining" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 500.0,
      reason: "Car maintenance",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Auto & Transport" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 25.0,
      reason: "Book purchase",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Education" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 300.0,
      reason: "Clothing shopping",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Shopping" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 120.5,
      reason: "Grocery shopping",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Groceries" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 950.0,
      reason: "Monthly Rent",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Rent" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 40.0,
      reason: "Gas refill",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Utilities" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 200.0,
      reason: "Gym membership",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Health & Fitness" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 80.0,
      reason: "Internet bill",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Bills & Utilities" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 150.0,
      reason: "Dinner with family",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Restaurants & Dining" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 30.0,
      reason: "Coffee & snacks",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Restaurants & Dining" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 500.0,
      reason: "Car maintenance",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Auto & Transport" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 25.0,
      reason: "Book purchase",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Education" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
    {
      amount: 300.0,
      reason: "Clothing shopping",
      paidAt: new Date(),
      userId: "cm7kx21220000eycwvwlpf2bb",
      categoryId: await prisma.paymentCategory
        .findFirst({ where: { name: "Shopping" } })
        .then((c) => c?.id),
      currencyId: await prisma.currency
        .findFirst({ where: { code: "USD" } })
        .then((c) => c?.id),
    },
  ];

  for (const payment of paymentData) {
    await prisma.payment.create({ data: payment });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
