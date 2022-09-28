import { expect, test } from "vitest";
import { getFutureDate } from "../test/utils/getFutureDate";
import { Schedule } from "./schedule";

test("create a schedule", () => {
  const startAt = getFutureDate("2022-09-28");
  const endsAt = getFutureDate("2022-09-29");

  const schedule = new Schedule({
    customer: "James Bond",
    startAt,
    endsAt,
  });

  expect(schedule).toBeInstanceOf(Schedule);
  expect(schedule.customer).toEqual("James Bond");
});

test("cannot set an end date before start date", () => {
  const startAt = getFutureDate("2022-09-28");
  const endsAt = getFutureDate("2022-09-27");

  expect(() => {
    return new Schedule({
      customer: "James Bond",
      startAt,
      endsAt,
    });
  }).toThrow();
});

test("cannot set a start date before now", () => {
  const startAt = new Date();
  const endsAt = new Date();

  startAt.setDate(startAt.getDate() - 1);
  endsAt.setDate(endsAt.getDate() + 3);

  expect(() => {
    return new Schedule({
      customer: "James Bond",
      startAt,
      endsAt,
    });
  }).toThrow();
});
