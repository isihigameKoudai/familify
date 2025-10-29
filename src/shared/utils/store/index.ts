/**
 * store/index.ts
 * SolidJS用状態管理ライブラリのメイン実装
 * Vuex風のstate/queries/actionsパターン
 */

import { createStore } from "solid-js/store";
import { createMemo } from "solid-js";
import type {
  State,
  Queries,
  Actions,
  StoreConfig,
  UseStoreReturn,
  QueriesReturn,
  ActionsReturn,
  ActionContext,
} from "./types";

export function defineStore<
  S extends State,
  Q extends Queries<S>,
  A extends Actions<S>
>(config: StoreConfig<S, Q, A>) {

  const useStore = (initialStateValue?: S): UseStoreReturn<S, Q, A> => {

    // 1. 初期状態を取得
    const initialState = initialStateValue ?? (typeof config.state === "function" ? config.state() : config.state);

    // 2. createStoreでオブジェクト全体をリアクティブに管理
    const [state, setState] = createStore<S>(initialState);

    // 3. dispatchの実装（型安全）
    const dispatch = <K extends keyof S>(key: K, value: S[K]): void => {
      setState(key as never, value as never);
    };

    // 4. アクションコンテキスト
    const context: ActionContext<S> = {
      state,
      dispatch,
    };

      // 5. queriesをcreateMemoで実装（キャストを避けるため型アノテーション）
    const queriesObj: QueriesReturn<S, Q> = (() => {
      if (!config.queries) {
        return {} as QueriesReturn<S, Q>;
      }

      const result = {} as Record<string, unknown>;
      for (const [key, queryFn] of Object.entries(config.queries)) {
        result[key] = createMemo(() => queryFn(state));
      }
      return result as QueriesReturn<S, Q>;
    })();

    // 6. actionsのラッパーを作成（キャストを避けるため型アノテーション）
    const actionsObj: ActionsReturn<S, A> = (() => {
      const result = {} as Record<string, (...args: never[]) => unknown>;
      for (const [key, actionFn] of Object.entries(config.actions)) {
        result[key] = (...args: never[]) => actionFn(context, ...args);
      }
      return result as ActionsReturn<S, A>;
    })();

    return {
      state,
      queries: queriesObj,
      actions: actionsObj,
    };
  };

  // 7. useStoreフックを返す
  return {
    useStore,
  };
}

export * from "./types";
