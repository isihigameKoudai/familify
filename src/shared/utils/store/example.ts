/**
 * store/example.ts
 * defineStoreの使用例（カウンターストア）
 */

import { defineStore } from "./index";

interface CounterState {
  count: number;
  label: string;
}

// カウンターストアの定義
export const counterStore = defineStore({
  // 初期状態
  state: {
    count: 0,
    label: "Counter",
  },

  // 派生状態（queries）
  queries: {
    doubleCount: (state) => state.count * 2,
    isPositive: (state) => state.count > 0,
    displayText: (state) => `${state.label}: ${state.count}`,
  },

  // アクション
  actions: {
    increment: ({ state, dispatch }) => {
      dispatch("count", state.count + 1);
    },
    decrement: ({ state, dispatch }) => {
      dispatch("count", state.count - 1);
    },
    setCount: ({ dispatch }, value: number) => {
      dispatch("count", value);
    },
    setLabel: ({ dispatch }, label: string) => {
      dispatch("label", label);
    },
    reset: ({ dispatch }) => {
      dispatch("count", 0);
      dispatch("label", "Counter");
    },
  },
});

/*
使用例:

import { counterStore } from "@/shared/utils/store/example";

const Counter = () => {
  const { state, queries, actions } = counterStore.useStore();

  return (
    <div>
      <h2>{queries.displayText}</h2>
      <p>Count: {state.count}</p>
      <p>Double: {queries.doubleCount}</p>
      <p>Is Positive: {queries.isPositive ? "Yes" : "No"}</p>
      <button onClick={actions.increment}>+</button>
      <button onClick={actions.decrement}>-</button>
      <button onClick={() => actions.setCount(10)}>Set to 10</button>
      <button onClick={actions.reset}>Reset</button>
    </div>
  );
};
*/

