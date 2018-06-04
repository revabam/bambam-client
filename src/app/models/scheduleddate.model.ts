export class ScheduledDate {
    id: number;
    day: number;
    week: number;
    startTime: number;
    endTime: number;

    constructor(id: number, day: number,  week: number, startTime: number, endTime: number) {
        this.id = id;
        this.day = day;
        this.week = week;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
