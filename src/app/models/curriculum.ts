import { Topic } from './topic';

export class Curriculum {
    id?: number;
    name: string;
    version: number;
    creator_id: number;
    dateCreated: Date;
    numberOfWeeks: number;
    topics: Topic[];
}
