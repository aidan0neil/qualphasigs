declare module "ical-expander" {
  /** Minimal typings for the subset of ical-expander this app uses. */
  export interface IcalTime {
    year: number;
    month: number;
    day: number;
    isDate: boolean;
    toJSDate(): Date;
  }

  export interface IcalEvent {
    summary?: string;
    description?: string;
    location?: string;
    uid: string;
    startDate: IcalTime;
    endDate: IcalTime | null;
  }

  export interface IcalOccurrence {
    startDate: IcalTime;
    endDate: IcalTime | null;
    item: IcalEvent;
  }

  export interface BetweenResult {
    events: IcalEvent[];
    occurrences: IcalOccurrence[];
  }

  export default class IcalExpander {
    constructor(opts: { ics: string; maxIterations?: number; skipInvalidDates?: boolean });
    between(after?: Date, before?: Date): BetweenResult;
    all(): BetweenResult;
  }
}
