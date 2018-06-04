import { TopicName } from './topicname.model';
import { Batch } from './batch.model';

export class TopicWeek {
    id: number;
    topic: TopicName;
    batch: Batch;
    weekNumber: number;

    constructor(id: number, topic: TopicName, batch: Batch, weekNumber: number) {
        this.id = id;
        this.topic = topic;
        this.batch = batch;
        this.weekNumber = weekNumber;
    }
}
