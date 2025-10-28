import { Payment, createPayment } from "../domain/models/payment";

export const getPaymentsAdapter = (payments: Payment[]) => {
  return payments.map(payment => createPayment(payment));
}
