import { expect, test } from "vitest";
import { getFutureDate } from "./getFutureDate";

test("add date with one year ahead", () => {
  const year = new Date().getFullYear();

  expect(getFutureDate(`${year}-09-27`).getFullYear()).toEqual(2023);
});
