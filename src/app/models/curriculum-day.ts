import { SubTopic } from './subtopic';
export class CurriculumDay {
    curriculumDayId?: number;
    /**
     * 0 - 6, Sunday - Saturday
     */
    dayNum: number;
    subTopics: SubTopic[];
}
