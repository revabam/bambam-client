import { SubtopicName } from './subtopicname.model';
import { SubtopicStatus } from './subtopicstatus.model';
import { Batch } from './batch.model';
import { Topic } from './topic.model';

export class SubtopicCurric {
    subtopicId: number;
    subtopicName: string;
    status: string;
    parentTopic: Topic;
    date = {
        endTime : 0,
        startTime : 0,
        day: 0,
        week: 0,
    };
}
