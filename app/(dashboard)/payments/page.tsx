import PaymentCard from "@/components/dashboard-ui/payments/card-view/PaymentCard";
import { getFilteredSortedPaymentsByUserId } from "@/lib/db/payment-db/crud-payment";
import { auth } from "@/auth";
import { Payment, User } from "@prisma/client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { columns } from "@/components/dashboard-ui/payments/table-view/columns";
import SearchPayments from "@/components/dashboard-ui/payments/SearchPayments";
import DataTableSh from "@/components/dashboard-ui/payments/table-view/data-table";
import Pagination from "@/components/dashboard-ui/payments/pagination";
import AddNewLink from "@/components/dashboard-ui/payments/links/AddNewLink";

const Page = async (props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) => {
  const session = await auth();
  const userId = session?.user?.id;
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const pageSize = 10;

  const { payments, paymentsCount } = await getFilteredSortedPaymentsByUserId(
    userId as string,
    query,
    page,
    pageSize
  );
  const totalPages = Math.ceil(paymentsCount / pageSize);
  return (
    <section className="flex flex-col w-full h-screen p-10">
      {/* Header & Search */}
      <div className="mb-10 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <AddNewLink />
        <SearchPayments
          placeholder="Search Invoices..."
          className="w-full md:w-1/3"
        />
      </div>

      {/* Tabs & Data */}
      <Tabs
        defaultValue="table-view"
        className="flex flex-col flex-grow w-full"
      >
        <TabsList className="justify-start">
          <TabsTrigger value="table-view">Table View</TabsTrigger>
          <TabsTrigger value="cards-view">Cards View</TabsTrigger>
        </TabsList>

        {/* Table View */}
        <TabsContent value="table-view" className="p-5 flex flex-col flex-grow">
          {payments.length > 0 ? (
            <>
              <DataTableSh data={payments} columns={columns} />
              {totalPages > 1 && (
                <div className="mt-auto flex justify-center p-5">
                  <Pagination totalPages={totalPages} />
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500">No payments found.</p>
          )}
        </TabsContent>

        {/* Cards View */}
        <TabsContent value="cards-view" className="p-5 flex flex-col flex-grow">
          {payments.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-6">
                {payments.map((payment: Payment & { user: User }) => (
                  <PaymentCard key={payment.id} paymentData={payment} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="mt-auto flex justify-center p-5">
                  <Pagination totalPages={totalPages} />
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500">No payments found.</p>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Page;
