import { SubtopicCurric } from './subtopicCurric.model';

export class DaysDTO {
    subtopics: SubtopicCurric[] = [];

    constructor(subtopics: SubtopicCurric[]) {

        this.subtopics = subtopics;
    }
}
