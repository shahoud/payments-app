import PaymentForm from "@/components/dashboard-ui/payments/PaymentForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPaymentById } from "@/lib/db/payment-db/crud-payment";
import { PaymentFormDataType } from "@/types/paymentForm.types";
import { Slash } from "lucide-react";
import Link from "next/link";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  // Fetch payment data and pass it to the PaymentForm component for editing.
  // Example:
  const { data } = await getPaymentById({ id });
  if (!data) {
    return <div>No data found for this payment</div>;
  }
  const paymentData: PaymentFormDataType = {
    reason: data.reason,
    amount: data.amount,
    paidAt: data.paidAt,
    latitude: data.latitude,
    longitude: data.longitude,
  };
  return (
    <main className="w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/payments">Payments</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/payments/${id}/edit`} className="text-blue-600">
                Edit
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="w-full">
        <PaymentForm id={id} payment={paymentData} />
      </section>
    </main>
  );
}
