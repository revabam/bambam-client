import { CurriculumWeek } from './curriculum-week';
import { Topic } from './topic';

export class Curriculum {
    id?: number;
    name: string;
    version: number;
    creatorId: number;
    approvedById?: number;
    /**
     * 1 - draft, 2 - needs approval, 3 - read-only, 4 - master
     */
    status: number;
    dateCreated: Date;
    numberOfWeeks: number;
    topics: Topic[];
    curriculumWeeks: CurriculumWeek[];
}
