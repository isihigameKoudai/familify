/**
 * store/types.ts
 * SolidJS用状態管理ライブラリの型定義
 * anyを使わず、型安全性を保証
 */

// Stateは任意のオブジェクト型
export type State = Record<string, unknown>;

// Queriesは状態から派生した値を計算する関数のマップ
export type Queries<S extends State> = Record<
  string,
  (state: Readonly<S>) => unknown
>;

// dispatchは状態のキーと値を型安全に更新
export type Dispatch<S extends State> = <K extends keyof S>(
  key: K,
  value: S[K]
) => void;

// アクションのコンテキスト（読み取り専用の状態とdispatch）
export type ActionContext<S extends State> = {
  readonly state: Readonly<S>;
  readonly dispatch: Dispatch<S>;
};

// Actionsは状態を更新する関数のマップ（可変長引数対応）
export type Actions<S extends State> = Record<
  string,
  (context: ActionContext<S>, ...args: never[]) => void | Promise<void>
>;

// ストアの設定オブジェクト
export type StoreConfig<
  S extends State,
  Q extends Queries<S>,
  A extends Actions<S>
> = {
  state: S | (() => S);
  queries?: Q;
  actions: A;
};

// クエリの戻り値を型安全に取得
export type QueriesReturn<S extends State, Q extends Queries<S>> = {
  readonly [K in keyof Q]: ReturnType<Q[K]>;
};

// アクションを引数を受け取る関数に変換
export type ActionsReturn<S extends State, A extends Actions<S>> = {
  readonly [K in keyof A]: A[K] extends (
    context: ActionContext<S>,
    ...args: infer P
  ) => infer R
    ? (...args: P) => R
    : never;
};

// useStoreの戻り値の型
export type UseStoreReturn<
  S extends State,
  Q extends Queries<S>,
  A extends Actions<S>
> = {
  readonly state: Readonly<S>;
  readonly queries: QueriesReturn<S, Q>;
  readonly actions: ActionsReturn<S, A>;
};

