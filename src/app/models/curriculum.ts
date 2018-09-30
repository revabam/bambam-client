import { CurriculumWeek } from './curriculum-week';
import { Topic } from './topic';

export class Curriculum {
    id?: number;
    name: string;
    version: number;
    creatorId: number;
    approvedById?: number;
    dateCreated: Date;
    numberOfWeeks: number;
    topics: Topic[];
    curriculumWeeks: CurriculumWeek[];
}
