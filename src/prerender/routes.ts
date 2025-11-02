/**
 * src/prerender/routes.ts
 * ビルド時にプリレンダー対象のルートを生成するユーティリティ
 */

const DATE_API_URL = "https://script.google.com/macros/s/AKfycbziskVGlEy8o4Fg1BlYNIbj8WHV9xhAc59I0ZbMUYL1zhZIR-S2sGxGWYohQ2A9o4nAhQ/exec";

interface DateResponse {
  years: number[];
  latest: {
    year: number;
    month: number;
  };
  earliest: {
    year: number;
    month: number;
  };
}

/**
 * Google Apps Script から利用可能な期間を取得
 */
async function fetchAvailableDate(): Promise<DateResponse> {
  try {
    const response = await fetch(DATE_API_URL, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch available date: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("[prerender] Failed to fetch available date:", error);
    // エラーを再スローしてビルドを中止する
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to fetch available date: ${String(error)}`);
  }
}

/**
 * 指定された期間内のすべての年月の組み合わせを生成
 */
function generateYearMonthRoutes(date: DateResponse): string[] {
  const routes: string[] = [];
  const { earliest, latest } = date;

  // 開始年から終了年までループ
  for (let year = earliest.year; year <= latest.year; year++) {
    // 開始月を決定（最初の年の場合は earliest.month、それ以外は 1）
    const startMonth = year === earliest.year ? earliest.month : 1;
    // 終了月を決定（最後の年の場合は latest.month、それ以外は 12）
    const endMonth = year === latest.year ? latest.month : 12;

    // 各月のルートを生成
    for (let month = startMonth; month <= endMonth; month++) {
      routes.push(`/payments/${year}/${month}`);
    }
  }

  return routes;
}

/**
 * プリレンダー対象のルート一覧を取得
 */
export async function getPrerenderRoutes(): Promise<string[]> {
  const date = await fetchAvailableDate();
  const routes = generateYearMonthRoutes(date);
  
  // トップページと決済一覧ページも追加
  return [
    "/",
    "/payments",
    ...routes
  ];
}

