import { createResource, For } from "solid-js";

interface SelectProps {
  options: { value: string; label: string; disabled?: boolean }[];
  value?: string;
  onChange?: (value: string) => void;
}

export function Select(props: SelectProps) {
  return <select value={props.value} onChange={e => props.onChange?.(e.target.value)}>
    <For each={props.options}>
      {(option) => <option value={option.value} disabled={option.disabled}>{option.label}</option>}
    </For>
  </select>;
}
