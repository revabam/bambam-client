import { BamUser } from './bamuser.model';
import { BatchType } from './batchtype.model';
import { Curriculum } from './curriculum.model';

export class Batch {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    trainer: BamUser;
    trainerID: number;
    curriculum: Curriculum;
    curriculumID: number;
    scheduleID: number;

    constructor (id: number, name: string, startDate: Date, endDate: Date, trainer: BamUser, curriculumID: number, scheduleID: number) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.trainer = trainer;
        this.curriculumID = curriculumID;
        this.scheduleID = scheduleID;
    }
}
