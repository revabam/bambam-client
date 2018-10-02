import { CurriculumDay } from './curriculum-day';
export class CurriculumWeek {
    curriculumWeekId?: number;
    curriculumId?: number;
    weekNum: number;
    curriculumDay?: CurriculumDay[];
    curriculumDays?: CurriculumDay[];
}
