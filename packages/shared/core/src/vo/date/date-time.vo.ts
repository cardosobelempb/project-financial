import { DateVO } from "./date.vo";
import { TimeVO } from "./time.vo";

export class DateTimeVO {
  private readonly dateVO: DateVO;
  private readonly timeVO: TimeVO;

  constructor(date: string, time: string) {
    this.dateVO = new DateVO(date);
    this.timeVO = new TimeVO(time);
  }

  public getISO(): string {
    const date = this.dateVO.getValue(); // YYYY-MM-DD
    const time = this.timeVO.getValue(); // HH:mm
    return `${date}T${time}:00`; // ISO format: YYYY-MM-DDTHH:mm:00
  }

  public getDate(): Date {
    return new Date(this.getISO());
  }

  public getDateValue(): string | undefined {
    return this.dateVO.getValue();
  }

  public getTimeValue(): string {
    return this.timeVO.getValue();
  }
}
