import { CurriculumDay } from './curriculum-day';
export class CurriculumWeek {
    id?: number;
    weekNum: number;
    curriculumId: number;
    curriculumDays?: CurriculumDay[];
}
