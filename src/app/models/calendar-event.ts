import { Curriculum } from './curriculum';
import { Topic } from './topic';

export class CalendarEvent {
    id?: number;
    title: string;
    description: string;
    statusId: number;
    startDateTime: Date;
    endDateTime: Date;
    calendarSubtopicId: number;
}

