import { Curriculum } from './curriculum';
import { Topic } from './topic';

export class CalendarEvent {
    id?: number;
    title: string;
    description: string;
    status_id: number;
    startDateTime: Date;
    endDateTime: Date;
    calendarSubtopic_id: number;
    user_id: number;
    resizable: Object;
    color: Object;
    actions: Object;
    draggable: boolean;
    curriculum: Curriculum;
    numWeeks: number;
    topics: Topic[];
    version: number;
    dropped: boolean;
}

