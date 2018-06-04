import { Batch } from './batch.model';

export class BamUser {
    userId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    pwd: string;
    role: number;
    batch: Batch;
    phone: string;
    phone2: string;
    skype: string;
    pwd2: string;
    assignForceID: number;

    constructor(userId: number,
        firstName: string,
        middleName: string,
        lastName: string,
        email: string,
        pwd: string,
        role: number,
        batch: Batch,
        phone: string,
        phone2: string,
        skype: string,
        pwd2: string,
        assignForceID: number) {
            this.userId = userId;
            this.firstName = firstName;
            this.middleName = middleName;
            this.lastName = lastName;
            this.email = email;
            this.pwd = pwd;
            this.role = role;
            this.batch = batch;
            this.phone = phone;
            this.phone2 = phone2;
            this.skype = skype;
            this.pwd2 = pwd2;
            this.assignForceID = assignForceID;
    }
}
