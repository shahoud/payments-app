import { deletePayment } from "@/lib/db/payment-db/crud-payment";
import { TrashIcon } from "lucide-react";

const DeletePaymentButton = ({ id }: { id: string }) => {
  const deletePaymentWithId = deletePayment.bind(null, { id: id });

  return (
    <form action={deletePaymentWithId}>
      <button type="submit">
        <TrashIcon className="w-5" color="red" />
      </button>
    </form>
  );
};

export default DeletePaymentButton;
