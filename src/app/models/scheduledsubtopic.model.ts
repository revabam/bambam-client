import { ScheduledDate } from './scheduleddate.model';
import { Schedule } from './schedule.model';

export class ScheduledSubtopic {
    id: number;
    subtopicId: number;
    date: ScheduledDate;
    parentSchedule: Schedule;

    constructor(id: number, subtopicID: number, date: ScheduledDate) {
        this.id = id;
        this.subtopicId = subtopicID;
        this.date = date;
    }
}
