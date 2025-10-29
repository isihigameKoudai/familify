import type { Payment } from "../domain/models/payment";

export interface GetPaymentsParams {
  year?: number;
  month?: number;
}

export const getPayments = async (params: GetPaymentsParams): Promise<Payment[]> => {
  const response = await fetch(`/api/payments?${new URLSearchParams(Object.fromEntries(Object.entries(params).map(([key, value]) => [key, String(value)]))).toString()}`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: "GET",
  });

  if (!response.ok) {
    const message = await safeParseErrorMessage(response);
    throw new Error(message ?? "Failed to fetch payments data.");
  }
  const data = await response.json();
  return data;
};

async function safeParseErrorMessage(response: Response) {
  try {
    const data = await response.json();
    if (data && typeof data === "object" && "message" in data) {
      return String(data.message);
    }
  } catch {
    // ignore parse errors
  }
  return null;
}
