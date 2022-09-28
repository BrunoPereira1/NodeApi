import { Schedule } from "../models/schedule";
import { SchedulesRepository } from "../repositories/schedulesRepository";

interface CreateScheduleRequest {
  customer: string;
  startAt: Date;
  endsAt: Date;
}

type CreateScheduleResponse = Schedule;

export class CreateSchedule {
  constructor(
    private schedulesRepository: SchedulesRepository
  ) {}

  async execute({
    customer,
    startAt,
    endsAt,
  }: CreateScheduleRequest): Promise<CreateScheduleResponse> {
    const overLappingSchedule = await this.schedulesRepository.findOverLappingSchedule(
      startAt,
      endsAt
    );

    if (overLappingSchedule) {
      throw new Error('Another schedule overlaps with this dates')
    }

    const schedule = new Schedule({
      customer,
      startAt,
      endsAt,
    });

    await this.schedulesRepository.create(schedule);

    return schedule;
  }
}
