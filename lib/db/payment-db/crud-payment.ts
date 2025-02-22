"use server";
import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import prisma from "@/prisma/client";
import { PaymentFormDataType } from "@/types/paymentForm.types";
import { Payment } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { contains } from "validator";

type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: Record<string, string[]>;
};

export const createPayment = async (state: any, formData: FormData) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not Signed in",
      status: "ERROR",
    });

  const userId = session?.user?.id;

  if (!userId) {
    return parseServerActionResponse({
      error: "User ID is missing",
      status: "ERROR",
    });
  }

  const { amount, reason, paidAt, latitude, longitude } =
    Object.fromEntries(formData);

  const parsedAmount = parseFloat(amount as string);
  const parsedPaidAt = new Date(paidAt as string);
  const parsedLatitude = latitude ? parseFloat(latitude as string) : null;
  const parsedLongitude = longitude ? parseFloat(longitude as string) : null;

  try {
    const payment = {
      userId,
      amount: parsedAmount,
      reason: reason as string,
      paidAt: parsedPaidAt,
      latitude: parsedLatitude,
      longitude: parsedLongitude,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createdPayment = await prisma.payment.create({ data: payment });

    return parseServerActionResponse({
      data: createdPayment,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: "Error creating payment",
      status: "ERROR",
    });
  }
};

//Get all payments of a user
export const getPaymentsByUserId = async (id: string, query: string) => {
  const payments = await prisma.payment.findMany({
    where: {
      userId: id,
      reason: {
        contains: query,
      },
    },
    select: {
      id: true,
      userId: true,
      amount: true,
      reason: true,
      paidAt: true,
      latitude: true, // Include latitude
      longitude: true, // Include longitude
      createdAt: true,
      updatedAt: true,
      user: true,
    },
  });
  return payments;
};

//Get filtered results for payments
export const getFilteredSortedPaymentsByUserId = async (
  userId: string,
  query: string = "",
  page: number = 1,
  pageSize: number = 10
) => {
  //Determine number of payments to skip
  const skip = (page - 1) * pageSize;

  //get the filtered result
  const payments = await prisma.payment.findMany({
    where: {
      userId,
      OR: [
        { reason: { contains: query, mode: "insensitive" } },
        { amount: {} },
      ],
    },
    skip,
    take: pageSize,
    orderBy: { paidAt: "desc" },
    include: {
      user: true,
    },
  });

  //get the total number of pages
  const paymentsCount = await prisma.payment.count({
    where: {
      userId,
      OR: [
        { reason: { contains: query, mode: "insensitive" } },
        { amount: {} },
      ],
    },
  });

  //return : payments and totalPages
  return { payments, paymentsCount };
};

//Get a specified payment by its id.
export const getPaymentById = async ({ id }: { id: string }) => {
  try {
    const payment = await prisma.payment.findUnique({ where: { id: id } });
    return parseServerActionResponse({
      data: payment,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({
      error: "Unable to retrieve payment data.",
      status: "ERROR",
    });
  }
};

//
export const createPayment1 = async (formData: PaymentFormDataType) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not Signed in",
      status: "ERROR",
    });

  const userId = session?.user?.id;

  if (!userId) {
    return parseServerActionResponse({
      error: "User ID is missing",
      status: "ERROR",
    });
  }

  const { amount, reason, paidAt, latitude, longitude } = formData;

  try {
    const payment = {
      userId,
      amount,
      reason,
      paidAt,
      latitude,
      longitude,
    };

    const createdPayment = await prisma.payment.create({ data: payment });

    return parseServerActionResponse({
      data: createdPayment,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log("Error creating payment: " + error);
    return parseServerActionResponse({
      error: "Error creating payment",
      status: "ERROR",
    });
  }
};

//delete payment
export const deletePayment = async ({ id }: { id: string }) => {
  try {
    await prisma.payment.delete({ where: { id } });
    revalidatePath("/payments");
  } catch (error) {
    console.log("Error deleting payment: " + error);
    throw new Error("Error deleting payment");
  }
};

//Update payment
export const updatePayment = async ({
  id,
  formData,
}: {
  id: string;
  formData: PaymentFormDataType;
}) => {
  //Check session
  const session = await auth();
  if (!session)
    return parseServerActionResponse({
      error: "Not Signed in",
      status: "ERROR",
    });

  //Check User in session
  const userId = session?.user?.id;
  if (!userId) {
    return parseServerActionResponse({
      error: "User ID is missing",
      status: "ERROR",
    });
  }

  //Get the desired payment (that needs to be updated)
  const paymentToUpdate = await prisma.payment.findUnique({
    where: { id: id },
  });

  if (!paymentToUpdate) {
    return parseServerActionResponse({
      error: "Faild retriving payment",
      status: "ERROR",
    });
  }

  if (paymentToUpdate.userId !== userId) {
    return parseServerActionResponse({
      error: "Not Authorized",
      status: "ERROR",
    });
  }

  const { amount, reason, paidAt, latitude, longitude } = formData;
  const payment = {
    userId,
    amount,
    reason,
    paidAt,
    latitude,
    longitude,
    updatedAt: new Date(),
  };

  try {
    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: payment,
    });
  } catch (error) {
    console.log("Error updating payment: " + error);
    return parseServerActionResponse({
      error: "Error updateing payment",
      status: "ERROR",
    });
  }

  revalidatePath("/payments");
  redirect("/payments");
};

//Get - annual paid money for a specified year
export const getAnnualPaymentAmount = async (year: number) => {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year + 1, 0, 1);

  const totalAmountInYear = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      paidAt: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  return totalAmountInYear._sum.amount || 0;
};
