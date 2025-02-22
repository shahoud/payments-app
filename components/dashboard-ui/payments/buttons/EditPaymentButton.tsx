import { Edit } from "lucide-react";
import Link from "next/link";

const EditPaymentButton = ({ id }: { id: string }) => {
  return (
    <Link href={`payments/${id}/edit`}>
      <Edit className="w-5" />
    </Link>
  );
};

export default EditPaymentButton;
