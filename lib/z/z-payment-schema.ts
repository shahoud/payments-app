import { z } from "zod";

export const paymentZodSchema = z.object({
  amount: z.coerce
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be positive")
    .max(10_000_000_000, "Amount cannot exceed 10,000,000,000"),

  reason: z
    .string()
    .min(3, "Reason must have at least 3 characters")
    .max(120, "Reason must have at least 120 characters"),

  paidAt: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z
      .date({ required_error: "Date of payment is required" })
      .refine(
        (date) => date <= new Date(),
        "Payment date cannot be in the future"
      )
  ),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  categoryId: z.string(),
  currencyId: z.string(),
});

// .min(-90, "Latitude must be between -90 and 90")
// .max(90, "Latitude must be between -90 and 90")

// .min(-180, "Longitude must be between -180 and 180")
//     .max(180, "Longitude must be between -180 and 180")
