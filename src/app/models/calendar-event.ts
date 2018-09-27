/**
 * calendar event model that can be persisted to the database
 * not to be confused with the CalendarEvent interface that is used to populate the MaterialCalendar
 *
 * @author Marcin Salamon | Spark1806-USF-Java | Steven Kelsey
 */
export class CalendarEvent {
    id?: number;
    title: string;
    description: string;
    statusId: number;
    startDateTime: Date;
    endDateTime: Date;
    subTopicId: number;
    trainerId: number;
    flagged?: number;
}
