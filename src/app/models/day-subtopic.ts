export class DaySubTopic {
    id?: number;
    dayId: number;
    name: string;
    index: number;
    subTopicId: number;
    parentTopicId: number;
    /**
     * used for boom transfer of status from the event models
     */
    statusId?: number;
}
