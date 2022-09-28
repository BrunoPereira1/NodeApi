export interface ScheduleProps {
  customer: string;
  startAt: Date;
  endsAt: Date;
}

export class Schedule {
  private props: ScheduleProps;

  get customer() {
    return this.props.customer;
  }

  get startAt() {
    return this.props.startAt;
  }

  get endsAt() {
    return this.props.endsAt;
  }

  constructor(props: ScheduleProps) {
    const { startAt, endsAt } = props;

    if (startAt <= new Date()) {
      throw new Error("Invalid start date");
    }

    if (endsAt <= startAt) {
      throw new Error("Invalid end date");
    }
    this.props = props;
  }
}
