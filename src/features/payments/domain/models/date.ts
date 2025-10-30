import { z } from "zod";

export const Date = z.object({
  years: z.array(z.number()),
  latest: z.object({
    year: z.number(),
    month: z.number(),
  }),
  earliest: z.object({
    year: z.number(),
    month: z.number(),
  }),
});

type DateResponse = z.infer<typeof Date>;

export interface DateModel extends DateResponse {
  years: number[];
  latest: {
    year: number;
    month: number;
  };
  earliest: {
    year: number;
    month: number;
  };
  isBeforeEarliest(year: number, month: number): boolean;
  isAfterLatest(year: number, month: number): boolean;
  isOutsideRange(year: number, month: number): boolean;
}

export function createDate(input: DateResponse): DateModel {
  const validated = Date.parse(input);
  const isBeforeEarliest = (year: number, month: number) => {
    if (year < validated.earliest.year) {
      return true;
    }
    if (year > validated.earliest.year) {
      return false;
    }
    return month < validated.earliest.month;
  };

  const isAfterLatest = (year: number, month: number) => {
    if (year > validated.latest.year) {
      return true;
    }
    if (year < validated.latest.year) {
      return false;
    }
    return month > validated.latest.month;
  };

  const isOutsideRange = (year: number, month: number) => {
    return isBeforeEarliest(year, month) || isAfterLatest(year, month);
  };

  return {
    years: validated.years,
    latest: validated.latest,
    earliest: validated.earliest,
    isBeforeEarliest,
    isAfterLatest,
    isOutsideRange,
  };
}
