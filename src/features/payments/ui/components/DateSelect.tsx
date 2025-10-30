import { createMemo, createResource, For, Show } from "solid-js";
import { PaymentService } from "../../service/payment";
import { Select } from "./Select";

interface Props {
  year?: number;
  month?: number;
}

export function DateSelect({ year, month }: Props) {
  const { fetchAvailableDate } = PaymentService();
  const [availableDate] = createResource(async () => await fetchAvailableDate());

  const yearOptions = createMemo(() => availableDate()?.years.map(y => ({ value: y.toString(), label: y.toString() })) || []);
  const monthOptions = createMemo(() => Array.from({ length: 12 }, (_, i) => i + 1).map(m => ({ value: m.toString(), label: m.toString() })) || []);
  
  return (
    <div>
      <Show when={yearOptions().length > 0 && year}>
        {(year) => <Select
          options={yearOptions()}
          value={year().toString()}
        />}
      </Show>
      <Show when={month}>
        {(month) => <Select options={monthOptions()} value={month().toString()} />}
      </Show>
    </div>
  );
}
