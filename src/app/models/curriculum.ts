import { Topic } from './topic';

export class Curriculum {
    id: number;
    name: string;
    version: string;
    creator_id: number;
    dateCreated: Date;
    numberOfWeeks: number;
    topics: Topic[];
}
