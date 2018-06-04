import { Curriculum } from './curriculum.model';
import { SubtopicName } from './subtopicname.model';
import { SubtopicCurric } from './subtopicCurric.model';

export class CurriculumSubtopic {
    curriculumSubtopicId: number;
    curriculumSubtopicNameId: SubtopicName;
    curriculumSubtopicWeek: number;
    curriculumSubtopicDay: number;


    constructor(
        curriculumSubtopicId: number,
        curriculumSubtopicNameId: SubtopicName,
        curriculumSubtopicWeek: number,
        curriculumSubtopicDay: number) {

        this.curriculumSubtopicId = curriculumSubtopicId;
        this.curriculumSubtopicNameId = curriculumSubtopicNameId;
        this.curriculumSubtopicWeek = curriculumSubtopicWeek;
        this.curriculumSubtopicDay = curriculumSubtopicDay;
    }

}
