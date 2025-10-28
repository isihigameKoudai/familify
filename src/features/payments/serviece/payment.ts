import { getPaymentsAdapter } from "../adapter/payment";
import { getPayments } from "../api/payments";

export const PaymentService = () => {
  const fetchPayments = async () => {
    try {
      const payments = await getPayments();
      return getPaymentsAdapter(payments);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return {
    fetchPayments
  }
}
