import { describe, expect, it } from "vitest";
import { Schedule } from "../models/schedule";
import { getFutureDate } from "../test/utils/getFutureDate";
import { CreateSchedule } from "./createSchedule";
import { InMemorySchedulesRepository } from "../repositories/in-memory/inMemorySchedulesRepository";

describe("Create Schedule", () => {
  it("should be able to create a schedule", () => {
    const startAt = getFutureDate("2022-09-28");
    const endsAt = getFutureDate("2022-09-29");

    const schedulesRepository = new InMemorySchedulesRepository();
    const createSchedule = new CreateSchedule(schedulesRepository);

    expect(
      createSchedule.execute({
        customer: "James Bond",
        startAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Schedule);
  });

  it("should not be able to create a schedule with overlapping dates", async () => {
    const startAt = getFutureDate("2022-09-28");
    const endsAt = getFutureDate("2022-10-02");

    const schedulesRepository = new InMemorySchedulesRepository();
    const createSchedule = new CreateSchedule(schedulesRepository);

    await createSchedule.execute({
      customer: "James Bond",
      startAt,
      endsAt,
    });

    expect(createSchedule.execute({
      customer: "James Bond",
      startAt: getFutureDate("2022-10-01"),
      endsAt: getFutureDate("2022-10-05")
    })).rejects.toBeInstanceOf(Error);

    expect(createSchedule.execute({
      customer: "James Bond",
      startAt: getFutureDate("2022-09-29"),
      endsAt: getFutureDate("2022-09-30")
    })).rejects.toBeInstanceOf(Error);
  });
});
