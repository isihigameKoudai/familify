import { getPaymentsAdapter } from "../adapter/payment";
import { getPayments, GetPaymentsParams } from "../api/payments";

export const PaymentService = () => {
  const fetchPayments = async (params: GetPaymentsParams) => {
    try {
      const payments = await getPayments(params);
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
