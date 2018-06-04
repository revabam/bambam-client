import { Topic } from './topic.model';

export class Subtopic {
    subtopicId: number;
    subtopicName: string;
    status: string;
    startTime: Date;
    endTime: Date;
    parentTopic: Topic;

    constructor(subtopicId: number, subtopicName: string, startTime: Date, endTime: Date, status: string, parentTopic: Topic) {
        this.subtopicId = subtopicId;
        this.subtopicName = subtopicName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
        this.parentTopic = parentTopic;
    }
}
