import { Batch } from '../../models/batch.model';
import { BamUser } from '../../models/bamuser.model';
import { Schedule } from '../../models/schedule.model';
import { Curriculum } from '../../models/curriculum.model';
import { Subtopic } from '../../models/subtopic.model';
import { Topic } from '../../models/topic.model';
import { forEach } from '@angular/router/src/utils/collection';
import { ScheduledSubtopic } from '../../models/scheduledsubtopic.model';
import { ScheduledDate } from '../../models/scheduleddate.model';
import { Boom } from '../../models/boom.model';

/**
 * @author Craig Koepele | 1803-mar05-java-usf
 * Utility helper class for the spec test component. Generates the
 * necessary expected results for boom component
 */
export class BoomUtil {

    /**
     * @author Craig Koepele | 1803-mar05-java-usf
     * Makes a list of batches. All values are hard coded
     */
    static makeBatches(): Batch[] {
        const newBatches: Batch[] = [];
        let id = 0; // Type: number
        let date = 9000; // Type: number
        let startDate: Date = new Date(date);

        newBatches.push(new Batch(id++, '', startDate, startDate, this.getUserById(1), 0, 0));
        startDate = new Date(++date);

        newBatches.push(new Batch(id++, '', startDate, startDate, this.getUserById(1), 0, 0));
        startDate = new Date(++date);

        newBatches.push(new Batch(id++, '', startDate, startDate, this.getUserById(1), 0, 0));
        startDate = new Date(++date);

        newBatches.push(new Batch(id++, '', startDate, startDate, this.getUserById(1), 0, 0));
        startDate = new Date(++date);

        return newBatches;
      }

    /**
     * @author Craig Koepele | 1803-mar05-java-usf
     * Makes a list of Boom objects. Bases this off the list of batches
     */
    static makeBooms(): Boom[] {
        const batches: Boom[] = [];
        const bamBatches: Batch[] = this.makeBatches();
        for (const i in bamBatches) {
            if (bamBatches.hasOwnProperty(i)) {
                const diffDays = Math.floor((new Date().getTime() -
                    bamBatches[i].startDate.getTime()) / (1000 * 3600 * 24));
                const currentWeek = Math.ceil(diffDays / 7);
                const batch: Boom = new Boom();
                batch.batchName = bamBatches[i].name;
                batch.trainerName = bamBatches[i].trainer.firstName + ' ' + bamBatches[i].trainer.lastName;
                batch.missed = 0;
                batch.completed = 4;
                batch.total = 4;
                batch.week = currentWeek;
                batches.push(batch);
            }
        }
        return batches;
    }

    /**
     * @author Craig Koepele | 1803-mar05-java-usf
     * @param length
     * Returns an object that matches up with the various class fields
     * modified in the barchart function in the boom component.
     */
    static makeBarChart(length: number): any {
        const booms: Boom[] = this.makeBooms();
        const weekLable: any[] = [];
        const missed = 0;
        for (let i = 1; i < length + 1; i++) {
            weekLable.push('Week ' + (i));
        }
        return { barChart: [{ data: this.populateData(weekLable.length, '100.00', booms.length), label: 'Completed',
            fill: true, backgroundColor: '#ff9945'},
            { data: this.populateData(weekLable.length, '0.00', booms.length), label: 'Missed',
            fill: true, backgroundColor: '#b63e4f'}],
            weekLable: weekLable};
    }

    /**
     * @author Craig Koepele | 1803-mar05-java-usf
     * @param length
     * @param value
     * @param elements
     * Helper function for makeBarChart. Generates a list of strings based on the poportions of
     * subtopics completed/missed
     */
    private static populateData(length: number, value: string, elements: number): any[] {
        const data: any[] = [];
        for (let i = 0; i < length; i++) {
            if (i < elements) {
                data.push(value);
            } else {
                data.push('NaN');
            }
        }
        return data;
    }

    /**
     * @author Craig Koepele | 1803-mar05-java-usf
     * @param id
     * Generates a BamUser component with an id value passed in
     */
    static getUserById(id: number): BamUser {
        const user: BamUser = new BamUser(id, '', '', '', '',
            '' , 0, null, '', '', '', '', 0);
        return user;
    }

    /**
     * @author Craig Koepele | 1803-mar05-java-usf
     * @param id
     * Returns a new schedule object with an id that the user passes in
     */
    static getScheduleById(id: number): Schedule {
        return new Schedule(id, this.makeSchSubList(), new Curriculum());
    }

    /**
     * @author Craig Koepele | 1803-mar05-java-usf
     * Helper function to getScheduleById. Generates a SchedueldSbutopic list
     */
    private static makeSchSubList(): ScheduledSubtopic[] {
        let id = 0;
        const schSubs: ScheduledSubtopic[] = [];
        schSubs.push(new ScheduledSubtopic(id++, 0, new ScheduledDate(id++, 1, 1, 10000, 10000)));
        schSubs.push(new ScheduledSubtopic(id++, 0, new ScheduledDate(id++, 2, 2, 20000, 20000)));
        schSubs.push(new ScheduledSubtopic(id++, 0, new ScheduledDate(id++, 3, 3, 30000, 30000)));
        schSubs.push(new ScheduledSubtopic(id++, 0, new ScheduledDate(id++, 4, 4, 40000, 40000)));
        return schSubs;
    }

    /**
     * @author Craig Koepele | 1803-mar05-java-usf
     * @param ids
     * Return a list of subtopics with ids mapped from the passed in
     * list of ids
     */
    static getSubtopicByIds(ids: number[]): Array<Subtopic> {
        const subtopics: Array<Subtopic> = new Array<Subtopic>();
        for (const id in ids) {
            if (ids.hasOwnProperty(id)) {
                subtopics.push(new Subtopic(ids[id], '',
                new Date('04/jan/2018'), new Date('05/jan/2018'), 'Completed', new Topic()));
            }
        }
        return subtopics;
    }

    /**
     * @author Craig Koepele | 1803-mar05-java-usf
     * Return an object that corresponds to the pieChart function in the Boom component
     */
      static makePieLables(): any {
          const booms: Boom[] = this.makeBooms();
          const teachers: any[] = [];
          const complete: string[] = [];
          const missed: string[] = [];
          for (let i = 0; i < booms.length; i++) {
            const totalCompletedAvg = Number((booms[i].completed.valueOf() /
                booms[i].total.valueOf() * 100).toFixed(2));
            const totalMissedAvg = Number((booms[i].missed.valueOf() /
                booms[i].total.valueOf() * 100).toFixed(2));
            teachers.push({
                bName: booms[i].batchName,
                trainer: booms[i].trainerName,
                missed: booms[i].missed,
                completed: booms[i].completed,
                total: booms[i].total,
                week: booms[i].week
            });
            if (totalCompletedAvg >= 90) {
                complete.push(booms[i].batchName + ' ' + totalCompletedAvg + '%');
            } else {
                missed.push(booms[i].batchName + ' ' + totalCompletedAvg + '%');
            }
          }

          return {
            pieChartLabels: [complete, missed],
            pieChartData: [complete.length, missed.length],
            pieChartDatasets: [{ data: [complete.length, missed.length]}],
            batchOverallArray: teachers
          };
      }
}
