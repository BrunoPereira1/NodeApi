import { setYear, parseISO } from "date-fns";

/**
 * Receives date and returns date with one year ahead
 */
export function getFutureDate(date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1);
}
