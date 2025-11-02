import { createMemo, Show } from "solid-js";
import { Select } from "./Select";
import { useNavigate } from "@tanstack/solid-router";
import type { DateModel } from "../../domain/models/date";
import * as styles from "../styles/select.css";

interface Props {
  year?: number;
  month?: number;
  availableDate?: DateModel;
}

export function DateSelect({ year, month, availableDate }: Props) {
  const navigate = useNavigate();

  const yearOptions = createMemo(() => availableDate?.years.map(y => ({ value: y.toString(), label: y.toString() })) || []);
  const monthOptions = createMemo(() => {
    if (!availableDate) {
      return [];
    }
    return Array.from({ length: 12 }, (_, i) => i + 1).map(monthValue => {
      const isDisabled = year === undefined
        ? false
        : availableDate.isOutsideRange(year, monthValue);

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
    <div class={styles.dateSelectWrapper}>
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
