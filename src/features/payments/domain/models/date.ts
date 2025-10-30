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
};

export function createDate(input: DateResponse): DateModel {
  const validated = Date.parse(input);
  return {
    years: validated.years,
    latest: validated.latest,
    earliest: validated.earliest,
  };
}
