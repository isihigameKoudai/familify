# defineStore - SolidJS用状態管理ライブラリ

シンプルなSolidJS用状態管理ライブラリ。コンポーネント間で状態を共有するためのフックベースのソリューションを提供します。
Vuexのstate/getters/actionsパターンからインスピレーションを得ています。

## 特徴

- 軽量でシンプルな実装
- SolidJSのリアクティビティシステムを活用
- TypeScriptによる完全な型安全性
- Vuex風のstate/queries(getters)/actionsパターン
- queriesによる派生状態の自動計算
- actionsによる型安全な状態更新
- グローバルストア（シングルトン）

## 基本的な使い方

### ストアの作成

```typescript
import { defineStore } from '@/shared/utils/store';

interface CounterState {
  count: number;
  label: string;
}

// Vuex風の構造
const counterStore = defineStore({
  // state - 状態
  state: {
    count: 0,
    label: "Counter"
  },
  
  // queries (≒ Vuexのgetters) - 派生状態
  queries: {
    doubleCount: (state) => state.count * 2,
    isPositive: (state) => state.count > 0,
    displayText: (state) => `${state.label}: ${state.count}`,
  },
  
  // actions - 状態更新
  actions: {
    increment: ({ state, dispatch }) => {
      dispatch('count', state.count + 1);
    },
    decrement: ({ state, dispatch }) => {
      dispatch('count', state.count - 1);
    },
    setCount: ({ dispatch }, value: number) => {
      dispatch('count', value);
    },
    setLabel: ({ dispatch }, label: string) => {
      dispatch('label', label);
    },
  }
});
```

### コンポーネントでの使用

```typescript
const Counter = () => {
  const { state, queries, actions } = counterStore.useStore();

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Double Count: {queries.doubleCount}</p>
      <p>Display: {queries.displayText}</p>
      <p>Is Positive: {queries.isPositive ? "Yes" : "No"}</p>
      <button onClick={actions.increment}>+</button>
      <button onClick={actions.decrement}>-</button>
      <button onClick={() => actions.setCount(10)}>Set to 10</button>
    </div>
  );
};
```

## API

### defineStore

```typescript
function defineStore<S extends State, Q extends Queries<S>, A extends Actions<S>>(
  config: StoreConfig<S, Q, A>
): { useStore: () => UseStoreReturn<S, Q, A> }
```

#### パラメータ

- `state`: 初期状態またはそれを返す関数
- `queries`: 状態から派生した値を計算する関数のオブジェクト（オプショナル）
- `actions`: 状態を更新するアクション関数のオブジェクト

#### 戻り値

- `useStore`: フックを返す関数。以下のオブジェクトを返します：
  - `state`: 現在の状態（読み取り専用）
  - `queries`: 計算された派生状態（リアクティブ）
  - `actions`: 実行可能なアクション

## 実装の特徴

### グローバルストア（シングルトン）

`defineStore`は呼び出し時に1回だけ状態を初期化します。その後、`useStore`を呼び出すすべてのコンポーネントで同じ状態が共有されます。

```typescript
// store.ts
export const myStore = defineStore({ ... });

// ComponentA.tsx
const { state } = myStore.useStore();
// state.count = 1

// ComponentB.tsx
const { state } = myStore.useStore();
// state.count = 1 (同じ状態を参照)
```

### リアクティビティ

- **state**: `createStore`でリアクティブに管理
- **queries**: `createMemo`で自動的に再計算
- 状態が変更されると、依存するコンポーネントとqueriesが自動的に更新されます

### 型安全性

TypeScriptによる完全な型推論を提供します：

- stateのキーと値の型が保証される
- queriesの戻り値の型が正確に推論される
- actionsの引数の型が検証される

```typescript
// 型エラーの例
actions.setCount("invalid"); // ❌ 型エラー：numberが期待される
dispatch('invalid_key', 123); // ❌ 型エラー：存在しないキー
```

### イミュータブル

stateは読み取り専用として扱われます。直接変更することはできません：

```typescript
const { state } = myStore.useStore();
state.count = 10; // ❌ 動作しない（TypeScriptではエラー）
```

状態を更新するには、必ず`dispatch`を通じて行います：

```typescript
dispatch('count', 10); // ✅ 正しい方法
```

## 注意点

- アクションを通じてのみ状態を更新できます
- queriesは状態が変更されるたびに自動的に再計算されます
- すべての状態更新は`dispatch`関数を通じて行う必要があります
- ストアはグローバル（シングルトン）なので、複数インスタンスが必要な場合は複数のストアを作成してください

## 使用例

完全な使用例は`example.ts`を参照してください。

## 技術仕様

- SolidJSの`createStore`で状態管理
- SolidJSの`createMemo`で派生状態を計算
- TypeScriptによる厳密な型定義（`any`不使用）
- イミュータブルな状態管理

## ライセンス

このライブラリはFamilifyプロジェクトの一部です。

