import { Curriculum } from './curriculum';
import { Topic } from './topic';
import * as cal_event from 'angular-calendar';

// CalendarEvent is also used for angular material calendar so there is a name conflict
// import as needed to avoid conflict
// interface MyEvent extends cal_event.CalendarEvent {
//     curriculum?: Curriculum;
//     numWeeks?: number;
//     topics?: Topic[];
//     version?: number;
//     dropped?: boolean;
//   }

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

