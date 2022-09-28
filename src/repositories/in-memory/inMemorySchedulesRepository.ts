import { areIntervalsOverlapping } from "date-fns";
import { Schedule } from "../../models/schedule";
import { SchedulesRepository } from "../schedulesRepository";

export class InMemorySchedulesRepository implements SchedulesRepository {
  public items: Schedule[] = [];

  async create(schedule: Schedule): Promise<void> {
    this.items.push(schedule);
  }

  async findOverLappingSchedule(
    startAt: Date,
    endsAt: Date
  ): Promise<Schedule | null> {
    const overLappingSchedule = this.items.find((schedule) => {
      return areIntervalsOverlapping(
        { start: startAt, end: endsAt },
        { start: schedule.startAt, end: schedule.endsAt },
        { inclusive: true }
      );
    });

    if (!overLappingSchedule) {
        return null;
    }

    return overLappingSchedule;
  }
}
