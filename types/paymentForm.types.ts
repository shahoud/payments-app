export type PaymentFormDataType = {
  amount: number;
  reason: string;
  paidAt: Date;
  latitude?: number | 0;
  longitude?: number | 0;
};
