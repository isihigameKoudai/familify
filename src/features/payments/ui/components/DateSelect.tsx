import { createMemo, createResource, Show } from "solid-js";
import { PaymentService } from "../../service/payment";
import { Select } from "./Select";
import { useNavigate } from "@tanstack/solid-router";

interface Props {
  year?: number;
  month?: number;
}

export function DateSelect({ year, month }: Props) {
  const { fetchAvailableDate } = PaymentService();
  const [availableDate] = createResource(async () => await fetchAvailableDate());
  const navigate = useNavigate();

  const yearOptions = createMemo(() => availableDate()?.years.map(y => ({ value: y.toString(), label: y.toString() })) || []);
  const monthOptions = createMemo(() => {
    const date = availableDate();
    if (!date) {
      return [];
    }
    return Array.from({ length: 12 }, (_, i) => i + 1).map(monthValue => {
      const isDisabled = year === undefined
        ? false
        : date.isOutsideRange(year, monthValue);

      return {
        value: monthValue.toString(),
        label: monthValue.toString(),
        disabled: isDisabled,
      };
    });
  });

  const handleChangeYear = (value: string) => {
    const nextPath = month ? `/payments/${value}/${month}` : `/payments/${value}`;
    navigate({ to: nextPath });
  };

  const handleChangeMonth = (value: string) => {
    if (year === undefined) {
      return;
    }
    const nextPath = `/payments/${year}/${value}`;
    navigate({ to: nextPath });
  };

  return (
    <div>
      <Show when={yearOptions().length > 0 && year}>
        {(year) => <Select
          options={yearOptions()}
          value={year().toString()}
          onChange={handleChangeYear}
        />}
      </Show>
      <Show when={monthOptions().length > 0 && month}>
        {(month) => <Select options={monthOptions()} value={month().toString()} onChange={handleChangeMonth} />}
      </Show>
    </div>
  );
}
