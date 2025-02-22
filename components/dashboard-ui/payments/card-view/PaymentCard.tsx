"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Payment, User } from "@prisma/client";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import EditPaymentButton from "../buttons/EditPaymentButton";
import DeletePaymentButton from "../buttons/DeletePaymentButton";

const PaymentCard = ({
  paymentData,
}: {
  paymentData: Payment & { user: User };
}) => {
  const { id, amount, reason, paidAt, createdAt, user } = paymentData;
  const userImage = user.image || "";

  return (
    <Card className="payment-card_container ">
      <CardHeader>
        <CardTitle>
          <section className="flex justify-between items-center">
            <p>{amount} $</p>
            <Avatar>
              <AvatarImage src={userImage} className="rounded-full size-7" />
            </Avatar>
          </section>
        </CardTitle>
        <CardDescription>
          <p>{paidAt.toDateString()}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <section className="flex gap-3 items-center">
          <p className="break-all line-clamp-2">{reason}</p>
        </section>
      </CardContent>
      <CardFooter className="bg-teal-100 rounded-md ">
        <section className="flex flex-1 gap-4 pl-2">
          <EditPaymentButton id={id} />
          <DeletePaymentButton id={id} />
        </section>
        <p className="text-sm">{createdAt.toLocaleDateString()}</p>
      </CardFooter>
    </Card>
  );
};

export default PaymentCard;
