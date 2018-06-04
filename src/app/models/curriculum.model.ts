import { BamUser } from './bamuser.model';

export class Curriculum {
    id: number;
    name: string;
    version: number;
    creatorId: number;
    modifierId: number;
    dateCreated: number;
    weekDuration: number;
    masterVersion: number;
}
