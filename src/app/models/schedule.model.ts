import { Curriculum } from './curriculum.model';
import { ScheduledSubtopic } from './scheduledsubtopic.model';

export class Schedule {
    id: number;
    subtopics: ScheduledSubtopic[];
    curriculum: Curriculum;

    constructor(id: number, subtopics: ScheduledSubtopic[], curriculum: Curriculum) {
        this.id = id;
        this.subtopics = subtopics;
        this.curriculum = curriculum;
    }
}
