import { DaysDTO } from './daysDTO.model';

export class WeeksDTO {
days: DaysDTO[];

    constructor(days: DaysDTO[]) {

        this.days = days;
    }
}
