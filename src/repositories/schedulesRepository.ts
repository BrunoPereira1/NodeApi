import { Schedule } from "../models/schedule";

export interface SchedulesRepository {
  create(schedule: Schedule): Promise<void>;
  findOverLappingSchedule(
    startAt: Date,
    endsAt: Date
  ): Promise<Schedule | null>;
}
