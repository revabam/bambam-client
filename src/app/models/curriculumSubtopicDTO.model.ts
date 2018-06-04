import { MetaDTO } from './metaDTO.model';
import { WeeksDTO } from './weeksDTO.model';

export class CurriculumSubtopicDTO {
    meta: MetaDTO;
    weeks: WeeksDTO[];

    constructor(
        meta: MetaDTO,
        weeks: WeeksDTO[]) {

        this.meta = meta;
        this.weeks = weeks;
    }
}
