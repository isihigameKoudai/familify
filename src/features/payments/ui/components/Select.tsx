import { For, createMemo } from "solid-js";
import { selectControl, selectWrapper } from "../styles/select.css";

interface SelectProps {
  options: { value: string; label: string; disabled?: boolean }[];
  value?: string;
  onChange?: (value: string) => void;
}

export function Select(props: SelectProps) {
  const normalizedValue = createMemo(() => props.value ?? "");

  return (
    <div class={selectWrapper}>
      <select
        class={selectControl}
        value={normalizedValue()}
        onChange={e => props.onChange?.(e.currentTarget.value)}
      >
        <For each={props.options}>
          {option => (
            <option value={option.value} disabled={option.disabled} selected={option.value === normalizedValue()}>
              {option.label}
            </option>
          )}
        </For>
      </select>
    </div>
  );
}
