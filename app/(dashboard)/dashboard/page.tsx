import AnnualPaidToIncome from "@/components/dashboard-ui/home/cards/PaidRatioDauntChart";
import AnnualTotalPaidCard from "@/components/dashboard-ui/home/cards/AnnualPaidCard";
import DailyPaidChart from "@/components/dashboard-ui/home/cards/DailyPaidLineChart";
import { getAnnualPaymentAmount } from "@/lib/db/payment-db/crud-payment";
import { formatCurrency } from "@/lib/utils";
import MonthlyPaidBarChart from "@/components/dashboard-ui/home/cards/MonthlyPaidBarChart";

export default async function Page() {
  const totalPaidAmountIn2025 = await getAnnualPaymentAmount(2025);
  // const formatedTotal = formatCurrency(
  //   totalPaidAmountIn2025,
  //   "en-US",
  //   "SYP",
  //   0
  // );

  return (
    <div className="grid grid-cols-8 gap-3 p-10">
      <div className="col-span-2 ">
        {/* <AnnualPaidToIncome
          totalIncome={20000000}
          totalPaid={2500000}
          currency={formatedTotal.currency}
        /> */}
        <AnnualPaidToIncome />
      </div>

      <div className="col-span-2 ">
        <MonthlyPaidBarChart />
      </div>
      <div className="col-span-2 ">
        <AnnualTotalPaidCard />
      </div>
      <div className="col-span-2 ">
        <AnnualTotalPaidCard />
      </div>

      <div className="col-span-8 ">
        <DailyPaidChart />
      </div>
    </div>
  );
}
