import { DaySubTopic } from './day-subtopic';
export class CurriculumDay {
    id?: number;
    /**
     * 0 - 6, Sunday - Saturday
     */
    dayNum: number;
    weekId: number;
    daySubTopics: DaySubTopic[];
}
