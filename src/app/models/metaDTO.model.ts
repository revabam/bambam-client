import {Curriculum} from './curriculum.model';

export class MetaDTO {
curriculum: Curriculum;

    constructor(curriculum: Curriculum) {

        this.curriculum = curriculum;
    }
}
