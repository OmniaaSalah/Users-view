export interface RecurringEvent {
    title?: string;
    color?: any;
    start?:Date;
    end?: Date
    rrule?: {
      freq: any;
      byweekday?: any;
      dtstart?: Date
      until?: Date
    };
  }