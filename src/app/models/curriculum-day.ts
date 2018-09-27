import { SubTopic } from './subtopic';
export class CurriculumDay {
    curriculumDayId?: number;
    curriculumWeekId?: number;
    /**
     * 0 - 6, Sunday - Saturday
     */
    dayNum: number;
    subTopics: SubTopic[];
}
