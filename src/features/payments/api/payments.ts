import type { Payment } from "../domain/models/payment";

export const getPayments = async (): Promise<Payment[]> => {
  const response = await fetch("/api/payments", {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  if (!response.ok) {
    const message = await safeParseErrorMessage(response);
    throw new Error(message ?? "Failed to fetch payments data.");
  }

  return await response.json();
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
