"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { paymentZodSchema } from "@/lib/z/z-payment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createPayment, updatePayment } from "@/lib/db/payment-db/crud-payment";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { PaymentFormDataType } from "@/types/paymentForm.types";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import SelectFormField from "@/components/reusable/SelectFormField";

interface PaymentFormProps {
  id?: string;
  payment?: PaymentFormDataType;
}

const PaymentForm = ({ id, payment }: PaymentFormProps) => {
  const searchParams = useSearchParams();
  const redirectUrlParam = searchParams?.get("redirect") || "payments";
  const redirectUrl = redirectUrlParam
    ? decodeURIComponent(redirectUrlParam)
    : "/payments";

  // Dynamically import the PaymentLocationPicker component with ssr: false
  const PaymentLocationPicker = useMemo(
    () =>
      dynamic(
        () =>
          import("@/components/dashboard-ui/payments/PaymentLocationPicker"),
        { ssr: false }
      ),
    []
  );
  const isEditMode = !!payment;
  const router = useRouter();
  const { toast } = useToast();
  const categories = [
    { id: "1", name: "Groceries" },
    { id: "2", name: "Rent" },
    { id: "3", name: "Vegitables" },
    { id: "4", name: "Fruits" },
  ];

  const currencies = [
    { id: "1", name: "USD" },
    { id: "2", name: "DER" },
    { id: "3", name: "SYP" },
    { id: "4", name: "EUR" },
  ];
  // Default values for the form
  const defaultValues: z.infer<typeof paymentZodSchema> = {
    amount: payment?.amount || 0,
    reason: payment?.reason || "",
    paidAt: payment?.paidAt ? new Date(payment.paidAt) : new Date(),
    latitude: payment?.latitude ?? 0,
    longitude: payment?.longitude ?? 0,
    categoryId: payment?.categoryId || "cm7hm5itt0004ey54twvm8adi",
    currencyId: payment?.currencyId || "cm7hm5iti0000ey5444qlqqye",
  };

  // Initialize the form
  const form = useForm<z.infer<typeof paymentZodSchema>>({
    resolver: zodResolver(paymentZodSchema),
    defaultValues,
  });

  // Handle form submission
  const onSubmit = async (
    submittedValues: z.infer<typeof paymentZodSchema>
  ) => {
    let serverResult = {
      date: null,
      status: "ERROR",
      message: "Some error occurred",
    };

    if (isEditMode) {
      serverResult = await updatePayment({
        id: id!,
        formData: submittedValues,
      });
    } else {
      console.log("Invoking createPayment ");
      serverResult = await createPayment(submittedValues);
    }

    if (serverResult.status === "SUCCESS") {
      router.push(redirectUrl);
      toast({
        title: "Payment Successful",
        description: "Your payment has been successfully submitted.",
      });
    }
  };

  return (
    <div className="m-5 space-y-8">
      <h3 className="text-lg font-medium">
        {isEditMode ? "Update" : "Create"} Payment
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-slate-100 p-6 rounded-md shadow-md space-y-6"
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-6 sm:grid sm:grid-cols-1 sm:gap-6">
            {/* Left Section */}
            <section className="space-y-6">
              {/* Amount Field */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="How much did you pay?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Reason Field */}
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Why did you pay?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Paid At Field */}
              <FormField
                control={form.control}
                name="paidAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Payment</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="ghost"
                            className={cn(
                              "pl-3 text-left border font-normal w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 z-[100]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Field */}
              <SelectFormField
                control={form.control}
                name="categoryId"
                label="Category"
                options={categories}
              />

              {/* Currency Field */}
              <SelectFormField
                control={form.control}
                name="currencyId"
                label="Currency"
                options={currencies}
              />
            </section>

            {/* Right Section - Location Picker */}
            <section>
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Select Payment Location</FormLabel>
                <FormControl>
                  <PaymentLocationPicker
                    setValue={form.setValue}
                    lat={form.getValues("latitude")}
                    lng={form.getValues("longitude")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </section>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4">
            <Button type="submit" variant="default">
              {isEditMode ? "Update" : "Submit"} Payment
            </Button>
            <Button
              type="reset"
              variant="outline"
              onClick={() => {
                // form.reset();
                console.log("hi");
                router.push(redirectUrl);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PaymentForm;
