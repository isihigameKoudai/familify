import { DateModel } from "../domain/models/date";
import type { Payment } from "../domain/models/payment";

export const getAvailableDate = async (): Promise<DateModel> => {
  const response = await fetch(`/api/date`, {
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
