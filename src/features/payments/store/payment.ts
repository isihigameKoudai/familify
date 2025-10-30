import { Actions, defineStore, Queries } from "../../../shared/utils/store";
import { PaymentModel } from "../domain/models/payment";
import { GetPaymentsParams } from "../api/payments";
import { PaymentService } from "../service/payment";
import { PaymentListModel } from "../domain/models/payment-list";

interface PaymentState {
  summary: PaymentListModel | null;
}

export const paymentStore = defineStore<PaymentState, Queries<PaymentState>, Actions<PaymentState>>({
  state: {
    summary: null,
  },
  queries: {
    paymentList: (state) => state.summary?.payments || [],
  },
  actions: {
    fetchPayments: async({ dispatch }, params: GetPaymentsParams) => {
      const summary = await PaymentService().fetchPayments(params);
      dispatch("summary", summary);
    },
  },
});
