import { Actions, defineStore, Queries } from "../../../shared/utils/store";
import { PaymentModel } from "../domain/models/payment";
import { GetPaymentsParams } from "../api/payments";
import { PaymentService } from "../service/payment";

interface PaymentState {
  payments: PaymentModel[];
}

export const paymentStore = defineStore<PaymentState, Queries<PaymentState>, Actions<PaymentState>>({
  state: {
    payments: [],
  },
  queries: {
    payments: (state) => state.payments,
  },
  actions: {
    fetchPayments: async({ dispatch }, params: GetPaymentsParams) => {
      const payments = await PaymentService().fetchPayments(params);
      dispatch("payments", payments);
    },
  },
});
