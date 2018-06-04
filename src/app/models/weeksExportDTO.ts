import { CurriculumSubtopic } from './curriculumSubtopic.model';

export class WeeksExportDTO {

    data: String[][];

    constructor(weeks: Array<CurriculumSubtopic[]>, nameAndVer: String) {
        this.data = [];
        this.data[0] = [];
        let row = 0;
        let week_num = 1;
        this.data[row++][0] = nameAndVer;
        // For each week
        for (const week of weeks) {
            this.data[row] = [];
            this.data[row++][0] = 'Week ' + week_num;
            this.data[row] = [];
            this.addDays(row++);
            this.data[row] = [];

            let max_diff = 0;
            // For each day
            for (let col = 0; col < 5; col++) {
                // Check if subtopic are in day
                let diff = 0;
                for (const subtopic of week) {
                    // If they are in day add to day
                    if (subtopic.curriculumSubtopicDay - 1 === col) {
                        // While there is already a topic in this row/col increment row
                        while (this.data[row + diff][col] != null) {
                            diff++;
                            if (this.data[row + diff] == null) {
                                this.data[row + diff] = [];
                            }
                            if (diff > max_diff) {
                                max_diff = diff;
                            }
                        }
                        this.data[row + diff][col] = subtopic.curriculumSubtopicNameId.name;
                    }
                }
            }
            row = row + max_diff + 2;
            week_num++;
        }
    }

    addDays(row: number) {
        this.data[row][0] = 'Monday';
        this.data[row][1] = 'Tuesday';
        this.data[row][2] = 'Wednesday';
        this.data[row][3] = 'Thursday';
        this.data[row][4] = 'Friday';
    }
}
