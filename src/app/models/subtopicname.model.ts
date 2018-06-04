import { TopicName } from './topicname.model';
import { SubtopicType } from './subtopictype.model';

export class SubtopicName {
    id: number;
    name: string;
    topic: TopicName;
    type: SubtopicType;
    constructor(id: number, name: string, topic: TopicName, type: SubtopicType) {
        this.id = id;
        this.name = name;
        this.topic = topic;
        this.type = type;
    }
}
