import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAnnualPaymentAmount } from "@/lib/db/payment-db/crud-payment";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default async function AnnualTotalPaidCard() {
  const totalPaidAmountIn2025 = await getAnnualPaymentAmount(2025);
  const formatedTotal = formatCurrency(
    totalPaidAmountIn2025,
    "en-US",
    "SYP",
    0
  );
  return (
    <Card className="h-[300px] w-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>Annual Total Paid</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col items-center justify-center">
        <div className="text-4xl font-bold">{formatedTotal.number}</div>
        <div className="text-4xl font-bold mt-5 text-green-400">
          {formatedTotal.currency}
        </div>
      </CardContent>
      <CardFooter className="mt-auto justify-end pr-5">
        <Link href="/payments" className="text-blue-500 hover:underline">
          View all
        </Link>
      </CardFooter>
    </Card>
  );
}
