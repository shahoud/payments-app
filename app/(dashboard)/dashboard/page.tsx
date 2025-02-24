import AnnualPaidToIncome from "@/components/dashboard-ui/home/cards/PaidRatioDauntChart";
import AnnualTotalPaidCard from "@/components/dashboard-ui/home/cards/AnnualPaidCard";
import DailyPaidChart from "@/components/dashboard-ui/home/cards/DailyPaidLineChart";
import { getAnnualPaymentAmount } from "@/lib/db/payment-db/crud-payment";
import MonthlyPaidBarChart from "@/components/dashboard-ui/home/cards/MonthlyPaidBarChart";

export default async function Page() {
  return (
    <div className="grid grid-cols-8 gap-3 p-10">
      <div className="col-span-2 ">
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
