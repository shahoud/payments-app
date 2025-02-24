import PaymentFormSh from "@/components/dashboard-ui/payments/PaymentForm";
import {
  getAllCategoryNameAndIDs,
  getAllCurrencyNameAndIDs,
} from "@/lib/db/payment-db/crud-payment";

export default async function Page() {
  const categories = await getAllCategoryNameAndIDs();
  const currencies = await getAllCurrencyNameAndIDs();
  return (
    <section className="w-full">
      <PaymentFormSh categories={categories} currencies={currencies} />
    </section>
  );
}
